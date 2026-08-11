/* ─────────────────────────────────────────────────────────────
   Shared lead types + helpers for the admin console.

   A "lead" is a document in the existing `consultations` collection.
   The lead-management fields (assignedTo, tasks, notes, …) are added
   lazily: older rows simply have none, and the readers below default
   them, so nothing needs migrating.

   Types only — no DB import — so this is safe for client components.
───────────────────────────────────────────────────────────── */

export const LEAD_STATUSES = [
  "new",
  "assigned",
  "in_progress",
  "completed",
  "dropped",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  assigned: "Assigned",
  in_progress: "In progress",
  completed: "Completed",
  dropped: "Dropped",
};

export const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-amber-100 text-amber-800 ring-amber-200",
  assigned: "bg-blue-100 text-blue-800 ring-blue-200",
  in_progress: "bg-indigo-100 text-indigo-800 ring-indigo-200",
  completed: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  dropped: "bg-slate-100 text-slate-600 ring-slate-200",
};

export type LeadTask = {
  id: string;
  label: string;
  done: boolean;
  doneAt: string | null;
};

export type LeadNote = {
  text: string;
  by: string;
  at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: LeadStatus;
  assignedTo: string | null;
  assignedToName: string | null;
  assignedAt: string | null;
  completedAt: string | null;
  tasks: LeadTask[];
  notes: LeadNote[];
  createdAt: string | null;
};

/** The follow-up checklist an employee gets the moment a lead is assigned.
 *  Employees can add their own items on top of these. */
export const DEFAULT_TASKS = [
  "Call the lead",
  "Understand requirement",
  "Share quotation",
  "Collect documents",
  "Close / convert",
];

export function newTaskList(labels: string[] = DEFAULT_TASKS): LeadTask[] {
  return labels.map((label, i) => ({
    id: `t${i + 1}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    done: false,
    doneAt: null,
  }));
}

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && (LEAD_STATUSES as readonly string[]).includes(v);
}

/** Digits-only phone, prefixed with India's country code when it looks like a
 *  bare 10-digit mobile — used for wa.me links and API sends. */
export function normalisePhone(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}

export function waLink(phone: string, text?: string): string {
  const num = normalisePhone(phone);
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${num}${q}`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** "2h ago" style age — the number that actually tells you a lead is going cold. */
export function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days < 30 ? `${days}d ago` : `${Math.floor(days / 30)}mo ago`;
}
