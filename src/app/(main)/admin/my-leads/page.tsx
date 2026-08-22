"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, Inbox } from "lucide-react";
import { AdminShell, StatTile } from "@/components/admin/AdminShell";
import { LeadCard } from "@/components/admin/LeadCard";
import { useLeads } from "@/components/admin/useLeads";

type Tab = "open" | "completed" | "all";

/** Employee console — only the leads the admin handed to this person.
 *  Open work is expanded by default so the checklist is one glance away. */
export default function MyLeadsPage() {
  const { leads, me, loading, busyId, error, reload, mutate } = useLeads();
  const [tab, setTab] = useState<Tab>("open");

  const stats = useMemo(
    () => ({
      open: leads.filter((l) => l.status === "assigned" || l.status === "in_progress").length,
      completed: leads.filter((l) => l.status === "completed").length,
      tasksLeft: leads
        .filter((l) => l.status !== "completed" && l.status !== "dropped")
        .reduce((n, l) => n + l.tasks.filter((t) => !t.done).length, 0),
    }),
    [leads]
  );

  const visible = useMemo(() => {
    if (tab === "all") return leads;
    if (tab === "completed") return leads.filter((l) => l.status === "completed");
    return leads.filter((l) => l.status !== "completed" && l.status !== "dropped");
  }, [leads, tab]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "open", label: "To do", count: stats.open },
    { id: "completed", label: "Completed", count: stats.completed },
    { id: "all", label: "All", count: leads.length },
  ];

  return (
    <AdminShell
      title="My Leads"
      subtitle={me ? `Assigned to ${me.name}` : undefined}
      user={me}
      onRefresh={reload}
      refreshing={loading}
    >
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="To follow up" value={stats.open} tone="indigo" />
        <StatTile label="Tasks pending" value={stats.tasksLeft} tone="amber" />
        <StatTile label="Completed" value={stats.completed} tone="emerald" />
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-primary text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
            <span className={`ml-1.5 text-xs ${tab === t.id ? "text-white/70" : "text-slate-400"}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-3 pb-12">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500">
            Loading your leads…
          </div>
        )}

        {!loading && visible.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-16 text-center">
            {tab === "open" && leads.length > 0 ? (
              <>
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                <p className="mt-3 text-sm text-slate-600">
                  All caught up — nothing pending right now.
                </p>
              </>
            ) : (
              <>
                <Inbox className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-3 text-sm text-slate-500">
                  No leads here yet. The admin will assign them to you.
                </p>
              </>
            )}
          </div>
        )}

        {visible.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            isAdmin={false}
            employees={[]}
            busy={busyId === lead.id}
            onMutate={mutate}
            defaultOpen={tab === "open" && lead.status !== "completed"}
          />
        ))}
      </div>
    </AdminShell>
  );
}
