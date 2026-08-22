"use client";
import { useMemo, useState } from "react";
import { Search, Inbox, AlertTriangle } from "lucide-react";
import { AdminShell, StatTile } from "@/components/admin/AdminShell";
import { LeadCard } from "@/components/admin/LeadCard";
import { useLeads } from "@/components/admin/useLeads";
import { LEAD_STATUSES, STATUS_LABELS, type LeadStatus } from "@/lib/leads";

/** Admin console — every lead, plus the one control employees don't have:
 *  assigning work. */
export default function AdminLeadsPage() {
  const { leads, employees, me, loading, busyId, error, reload, mutate } = useLeads();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [owner, setOwner] = useState<string>("all"); // "all" | "unassigned" | emp id

  const stats = useMemo(
    () => ({
      total: leads.length,
      unassigned: leads.filter((l) => !l.assignedTo && l.status !== "dropped").length,
      inProgress: leads.filter((l) => l.status === "assigned" || l.status === "in_progress")
        .length,
      completed: leads.filter((l) => l.status === "completed").length,
      // The number that matters: sitting unassigned for over 2 hours.
      stale: leads.filter(
        (l) =>
          !l.assignedTo &&
          l.status === "new" &&
          l.createdAt &&
          Date.now() - new Date(l.createdAt).getTime() > 2 * 60 * 60 * 1000
      ).length,
    }),
    [leads]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (owner === "unassigned" && l.assignedTo) return false;
      if (owner !== "all" && owner !== "unassigned" && l.assignedTo !== owner) return false;
      if (!needle) return true;
      return [l.name, l.email, l.phone, l.service, l.message]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [leads, q, status, owner]);

  return (
    <AdminShell
      title="Lead Console"
      subtitle={loading ? "Loading…" : `${leads.length} total leads`}
      user={me}
      onRefresh={reload}
      refreshing={loading}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile label="Total leads" value={stats.total} />
        <StatTile label="Unassigned" value={stats.unassigned} tone="amber" />
        <StatTile label="In progress" value={stats.inProgress} tone="indigo" />
        <StatTile label="Completed" value={stats.completed} tone="emerald" />
        <StatTile label="Going cold (2h+)" value={stats.stale} tone="red" />
      </div>

      {stats.stale > 0 && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>{stats.stale}</strong> lead{stats.stale === 1 ? " has" : "s have"} been waiting
            over 2 hours with nobody assigned.{" "}
            <button
              onClick={() => {
                setOwner("unassigned");
                setStatus("new");
              }}
              className="font-semibold underline underline-offset-2"
            >
              Show them
            </button>
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, service…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus | "all")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">Everyone</option>
          <option value="unassigned">Unassigned</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        {(q || status !== "all" || owner !== "all") && (
          <button
            onClick={() => {
              setQ("");
              setStatus("all");
              setOwner("all");
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* List */}
      <div className="mt-4 space-y-3 pb-12">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500">
            Loading leads…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-16 text-center">
            <Inbox className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">
              {leads.length === 0 ? "No leads yet." : "No leads match these filters."}
            </p>
          </div>
        )}

        {filtered.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            isAdmin
            employees={employees}
            busy={busyId === lead.id}
            onMutate={mutate}
          />
        ))}
      </div>
    </AdminShell>
  );
}
