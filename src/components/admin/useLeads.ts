"use client";
import { useCallback, useEffect, useState } from "react";
import type { Lead } from "@/lib/leads";
import type { AppUser } from "@/lib/auth";

type Me = { id: string; name: string; role: string };

/** Loads the role-scoped lead list and funnels every mutation through
 *  PATCH /api/admin/leads/:id, swapping in the server's copy of the lead so
 *  the UI can never drift from the database. */
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [employees, setEmployees] = useState<AppUser[]>([]);
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not load leads.");
      setLeads(data.leads ?? []);
      setEmployees(data.employees ?? []);
      setMe(data.me ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const mutate = useCallback(
    async (id: string, body: Record<string, unknown>): Promise<boolean> => {
      setBusyId(id);
      setError(null);
      try {
        const res = await fetch(`/api/admin/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Could not save the change.");
        if (data.lead) {
          setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        }
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not save the change.");
        return false;
      } finally {
        setBusyId(null);
      }
    },
    []
  );

  return { leads, employees, me, loading, busyId, error, setError, reload: load, mutate };
}
