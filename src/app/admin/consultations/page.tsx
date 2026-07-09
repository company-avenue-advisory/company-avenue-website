"use client";
import { useEffect, useState } from "react";

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string | null;
};

export default function AdminConsultationsPage() {
  const [rows, setRows] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/consultations")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load submissions.");
        return res.json();
      })
      .then((data) => setRows(data.consultations ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const fmtDate = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Consultation Requests</h1>
            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Loading…" : `${rows.length} submission${rows.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && !loading && rows.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500">
            No submissions yet.
          </div>
        )}

        {rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="align-top hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {fmtDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{r.name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <a href={`mailto:${r.email}`} className="block hover:text-primary hover:underline">
                        {r.email}
                      </a>
                      <a href={`tel:${r.phone}`} className="block hover:text-primary hover:underline">
                        {r.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.service}</td>
                    <td className="max-w-md px-4 py-3 text-slate-600">{r.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
