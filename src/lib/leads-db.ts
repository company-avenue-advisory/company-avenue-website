/* Server-only mapping between `consultations` documents and the Lead shape
   the admin console consumes. Never import from a "use client" file — it
   pulls in the mongodb driver. */
import type { Document, WithId } from "mongodb";
import { employeeName } from "@/lib/auth";
import { isLeadStatus, type Lead, type LeadStatus } from "@/lib/leads";

/** Older rows predate the lead-management fields, so every one of them is
 *  defaulted here rather than assumed to exist. */
export function toLead(d: WithId<Document>): Lead {
  const assignedTo = typeof d.assignedTo === "string" ? d.assignedTo : null;
  const status: LeadStatus = isLeadStatus(d.status) ? d.status : "new";

  return {
    id: String(d._id),
    name: d.name ?? "",
    email: d.email ?? "",
    phone: d.phone ?? "",
    service: d.service ?? "",
    message: d.message ?? "",
    status,
    assignedTo,
    assignedToName: assignedTo ? employeeName(assignedTo) : null,
    assignedAt: d.assignedAt ? new Date(d.assignedAt).toISOString() : null,
    completedAt: d.completedAt ? new Date(d.completedAt).toISOString() : null,
    tasks: Array.isArray(d.tasks)
      ? d.tasks.map((t: Document) => ({
          id: String(t.id),
          label: String(t.label ?? ""),
          done: !!t.done,
          doneAt: t.doneAt ? new Date(t.doneAt).toISOString() : null,
        }))
      : [],
    notes: Array.isArray(d.notes)
      ? d.notes.map((n: Document) => ({
          text: String(n.text ?? ""),
          by: String(n.by ?? ""),
          at: n.at ? new Date(n.at).toISOString() : new Date(0).toISOString(),
        }))
      : [],
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
  };
}
