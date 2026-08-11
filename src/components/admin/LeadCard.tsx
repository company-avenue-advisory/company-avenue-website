"use client";
import { useState } from "react";
import {
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  Plus,
  Check,
  CircleSlash,
  Loader2,
} from "lucide-react";
import {
  STATUS_LABELS,
  STATUS_STYLES,
  formatDate,
  timeAgo,
  waLink,
  type Lead,
} from "@/lib/leads";
import type { AppUser } from "@/lib/auth";

export function StatusBadge({ status }: { status: Lead["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

type Props = {
  lead: Lead;
  /** Admins get the assign dropdown and can act on any lead. */
  isAdmin: boolean;
  employees: AppUser[];
  busy: boolean;
  onMutate: (id: string, body: Record<string, unknown>) => Promise<boolean>;
  defaultOpen?: boolean;
};

export function LeadCard({ lead, isAdmin, employees, busy, onMutate, defaultOpen }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [note, setNote] = useState("");
  const [newTask, setNewTask] = useState("");

  const doneCount = lead.tasks.filter((t) => t.done).length;
  const total = lead.tasks.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const greeting =
    `Hello ${lead.name}, this is Company Avenue Advisory regarding your ` +
    `enquiry about ${lead.service}. When is a good time to talk?`;

  const addNote = async () => {
    if (!note.trim()) return;
    if (await onMutate(lead.id, { action: "addNote", text: note })) setNote("");
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    if (await onMutate(lead.id, { action: "addTask", label: newTask })) setNewTask("");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ── Summary row ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start gap-3 p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-0.5 shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900">{lead.name}</span>
            <StatusBadge status={lead.status} />
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />}
          </div>
          <p className="mt-0.5 text-sm text-slate-600">{lead.service}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span title={formatDate(lead.createdAt)}>{timeAgo(lead.createdAt)}</span>
            <span className="text-slate-300">•</span>
            <a href={`tel:${lead.phone}`} className="hover:text-primary hover:underline">
              {lead.phone}
            </a>
            {total > 0 && (
              <>
                <span className="text-slate-300">•</span>
                <span className={doneCount === total ? "text-emerald-600" : ""}>
                  {doneCount}/{total} tasks
                </span>
              </>
            )}
            {isAdmin && (
              <>
                <span className="text-slate-300">•</span>
                <span className={lead.assignedToName ? "text-slate-700" : "text-amber-600"}>
                  {lead.assignedToName ?? "Unassigned"}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Quick contact — the point is to reach the lead in seconds */}
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={waLink(lead.phone, greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Call</span>
          </a>
        </div>

        {/* Admin-only: hand the lead to someone */}
        {isAdmin && (
          <select
            value={lead.assignedTo ?? ""}
            disabled={busy}
            onChange={(e) =>
              onMutate(lead.id, { action: "assign", assignedTo: e.target.value || null })
            }
            className="w-full shrink-0 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 sm:w-44"
          >
            <option value="">— Assign to —</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ── Details ─────────────────────────────────────────────── */}
      {open && (
        <div className="border-t border-slate-100 bg-slate-50/60 p-4">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Left: enquiry */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Enquiry
              </h4>
              <p className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                {lead.message || "—"}
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-primary hover:underline"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {lead.email}
                </a>
                <p className="text-xs text-slate-400">Received {formatDate(lead.createdAt)}</p>
              </div>

              {/* Status controls */}
              <div className="mt-4 flex flex-wrap gap-2">
                {lead.status !== "completed" && (
                  <button
                    disabled={busy}
                    onClick={() => onMutate(lead.id, { action: "status", status: "completed" })}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark completed
                  </button>
                )}
                {lead.status === "completed" && (
                  <button
                    disabled={busy}
                    onClick={() => onMutate(lead.id, { action: "status", status: "in_progress" })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                  >
                    Reopen
                  </button>
                )}
                {lead.status !== "dropped" && (
                  <button
                    disabled={busy}
                    onClick={() => onMutate(lead.id, { action: "status", status: "dropped" })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <CircleSlash className="h-3.5 w-3.5" />
                    Not interested
                  </button>
                )}
              </div>
            </div>

            {/* Right: checklist + notes */}
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Follow-up checklist
                </h4>
                <span className="text-xs font-medium text-slate-500">{pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <ul className="mt-3 space-y-1.5">
                {lead.tasks.length === 0 && (
                  <li className="text-xs text-slate-400">
                    No checklist yet — it appears once the lead is assigned.
                  </li>
                )}
                {lead.tasks.map((t) => (
                  <li key={t.id}>
                    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white">
                      <input
                        type="checkbox"
                        checked={t.done}
                        disabled={busy}
                        onChange={(e) =>
                          onMutate(lead.id, {
                            action: "toggleTask",
                            taskId: t.id,
                            done: e.target.checked,
                          })
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                      />
                      <span
                        className={`text-sm ${t.done ? "text-slate-400 line-through" : "text-slate-700"}`}
                      >
                        {t.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex gap-1.5">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="Add a task…"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={addTask}
                  disabled={busy || !newTask.trim()}
                  className="shrink-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Notes / activity */}
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes &amp; activity
              </h4>
              <div className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1">
                {lead.notes.length === 0 && (
                  <p className="text-xs text-slate-400">Nothing logged yet.</p>
                )}
                {[...lead.notes].reverse().map((n, i) => (
                  <div
                    key={`${n.at}-${i}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                  >
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {n.by} • {formatDate(n.at)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-1.5">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNote()}
                  placeholder="Log a call, add a note…"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={addNote}
                  disabled={busy || !note.trim()}
                  className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-800 disabled:opacity-40"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
