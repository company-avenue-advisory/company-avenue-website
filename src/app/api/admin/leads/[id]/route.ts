import { NextRequest, NextResponse } from "next/server";
import { ObjectId, type Document, type WithId } from "mongodb";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { listEmployees, employeeName, type Session } from "@/lib/auth";
import { toLead } from "@/lib/leads-db";
import { isLeadStatus, newTaskList, type LeadTask } from "@/lib/leads";
import { notifyAssignment } from "@/lib/telegram";

/* Every mutation on a lead funnels through here so the permission rule lives
   in exactly one place:

     • admin    — may do anything, including (re)assigning
     • employee — may only touch leads assigned to them, and may never assign

   Actions: assign | status | toggleTask | addTask | addNote                */

export const dynamic = "force-dynamic";

type Body = {
  action?: string;
  assignedTo?: string | null;
  status?: string;
  taskId?: string;
  done?: boolean;
  label?: string;
  text?: string;
};

function canEdit(session: Session, doc: WithId<Document>): boolean {
  return session.role === "admin" || doc.assignedTo === session.id;
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Unknown lead." }, { status: 400 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const _id = new ObjectId(id);

  try {
    const db = await getDb();
    const col = db.collection("consultations");
    const doc = await col.findOne({ _id });
    if (!doc) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    if (!canEdit(session, doc)) {
      return NextResponse.json({ error: "This lead is not assigned to you." }, { status: 403 });
    }

    const now = new Date();
    const actor = session.name;

    switch (body.action) {
      /* ── Assign / unassign — admin only ───────────────────────────── */
      case "assign": {
        if (session.role !== "admin") {
          return NextResponse.json({ error: "Only an admin can assign leads." }, { status: 403 });
        }
        const target = body.assignedTo || null;
        if (target && !listEmployees().some((e) => e.id === target)) {
          return NextResponse.json({ error: "Unknown employee." }, { status: 400 });
        }

        if (!target) {
          await col.updateOne(
            { _id },
            {
              $set: { assignedTo: null, assignedAt: null, status: "new", updatedAt: now },
              $push: {
                notes: { text: "Unassigned", by: actor, at: now },
              } as Document,
            }
          );
          break;
        }

        // Keep an existing checklist on reassignment — the ticks so far are
        // real work; only a lead that never had one gets a fresh list.
        const tasks: LeadTask[] =
          Array.isArray(doc.tasks) && doc.tasks.length > 0 ? doc.tasks : newTaskList();

        await col.updateOne(
          { _id },
          {
            $set: {
              assignedTo: target,
              assignedBy: session.id,
              assignedAt: now,
              status: doc.status === "completed" ? "completed" : "assigned",
              tasks,
              updatedAt: now,
            },
            $push: {
              notes: {
                text: `Assigned to ${employeeName(target)}`,
                by: actor,
                at: now,
              },
            } as Document,
          }
        );

        // Best-effort WhatsApp ping to the employee. Never block the response.
        await notifyAssignment(
          {
            name: doc.name ?? "",
            phone: doc.phone ?? "",
            email: doc.email ?? "",
            service: doc.service ?? "",
            message: doc.message ?? "",
          },
          target,
          employeeName(target)
        );
        break;
      }

      /* ── Status change ────────────────────────────────────────────── */
      case "status": {
        if (!isLeadStatus(body.status)) {
          return NextResponse.json({ error: "Unknown status." }, { status: 400 });
        }
        await col.updateOne(
          { _id },
          {
            $set: {
              status: body.status,
              completedAt: body.status === "completed" ? now : null,
              updatedAt: now,
            },
            $push: {
              notes: { text: `Status → ${body.status}`, by: actor, at: now },
            } as Document,
          }
        );
        break;
      }

      /* ── Tick / untick a checklist item ───────────────────────────── */
      case "toggleTask": {
        const tasks: LeadTask[] = Array.isArray(doc.tasks) ? doc.tasks : [];
        const idx = tasks.findIndex((t) => t.id === body.taskId);
        if (idx === -1) {
          return NextResponse.json({ error: "Unknown task." }, { status: 400 });
        }
        const done = body.done ?? !tasks[idx].done;
        tasks[idx] = { ...tasks[idx], done, doneAt: done ? now.toISOString() : null };

        // Ticking the first box means work has started — reflect that without
        // making the employee also change the status by hand.
        const touched = tasks.some((t) => t.done);
        const status =
          doc.status === "completed" || doc.status === "dropped"
            ? doc.status
            : touched
              ? "in_progress"
              : doc.assignedTo
                ? "assigned"
                : "new";

        await col.updateOne({ _id }, { $set: { tasks, status, updatedAt: now } });
        break;
      }

      /* ── Add a custom checklist item ──────────────────────────────── */
      case "addTask": {
        const label = (body.label ?? "").trim().slice(0, 120);
        if (!label) {
          return NextResponse.json({ error: "Task cannot be empty." }, { status: 400 });
        }
        const task: LeadTask = {
          id: `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          label,
          done: false,
          doneAt: null,
        };
        await col.updateOne(
          { _id },
          { $push: { tasks: task } as Document, $set: { updatedAt: now } }
        );
        break;
      }

      /* ── Add a note ───────────────────────────────────────────────── */
      case "addNote": {
        const text = (body.text ?? "").trim().slice(0, 1000);
        if (!text) {
          return NextResponse.json({ error: "Note cannot be empty." }, { status: 400 });
        }
        await col.updateOne(
          { _id },
          {
            $push: { notes: { text, by: actor, at: now } } as Document,
            $set: { updatedAt: now },
          }
        );
        break;
      }

      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    const updated = await col.findOne({ _id });
    return NextResponse.json({ ok: true, lead: updated ? toLead(updated) : null });
  } catch (err) {
    console.error("[admin/leads/:id] update failed:", err);
    return NextResponse.json({ error: "Could not save the change." }, { status: 502 });
  }
}
