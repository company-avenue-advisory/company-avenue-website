"use client";
import { useState } from "react";
import { LogOut, RefreshCw } from "lucide-react";

/** Shared chrome for both consoles: title bar, who's signed in, refresh,
 *  sign out. Kept deliberately plain — this is an internal tool. */
export function AdminShell({
  title,
  subtitle,
  user,
  onRefresh,
  refreshing,
  children,
}: {
  title: string;
  subtitle?: string;
  user: { name: string; role: string } | null;
  onRefresh: () => void;
  refreshing?: boolean;
  children: React.ReactNode;
}) {
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
            {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <span className="hidden items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3 sm:flex">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {user.name}
                  <span className="ml-1 text-slate-400">
                    {user.role === "admin" ? "Admin" : "Employee"}
                  </span>
                </span>
              </span>
            )}

            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}

export function StatTile({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: number | string;
  tone?: "slate" | "amber" | "indigo" | "emerald" | "red";
}) {
  const tones: Record<string, string> = {
    slate: "text-slate-900",
    amber: "text-amber-600",
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    red: "text-red-600",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className={`text-2xl font-bold tabular-nums ${tones[tone]}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}
