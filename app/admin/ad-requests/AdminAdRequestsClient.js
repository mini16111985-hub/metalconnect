"use client";

import { useEffect, useMemo, useState } from "react";

const statusOptions = ["new", "contacted", "paid", "active", "expired", "rejected"];

function getStatusBadge(status) {
  if (status === "active") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "paid") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "contacted") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "expired") {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }

  if (status === "rejected") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-yellow-200 bg-yellow-50 text-yellow-700";
}

export default function AdminAdRequestsClient() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    const response = await fetch("/api/admin-ad-requests", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error fetching ad requests:", result);
      setRequests([]);
      setLoading(false);
      return;
    }

    setRequests(result.requests || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    const response = await fetch("/api/admin-ad-requests", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Status update error:", result);
      setUpdatingId(null);
      return;
    }

    await fetchRequests();
    setUpdatingId(null);
  };

  const stats = useMemo(() => {
    return {
      total: requests.length,
      newCount: requests.filter((r) => r.status === "new").length,
      contacted: requests.filter((r) => r.status === "contacted").length,
      active: requests.filter((r) => r.status === "active").length,
    };
  }, [requests]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h1 className="text-3xl font-bold">Loading advertising requests...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Admin Panel
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Manage advertising requests
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Review incoming advertising inquiries, track their status, and keep the
          first monetization workflow organized.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total
            </div>
            <div className="mt-3 text-3xl font-bold text-slate-950">{stats.total}</div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              New
            </div>
            <div className="mt-3 text-3xl font-bold text-slate-950">{stats.newCount}</div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contacted
            </div>
            <div className="mt-3 text-3xl font-bold text-slate-950">{stats.contacted}</div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Active
            </div>
            <div className="mt-3 text-3xl font-bold text-slate-950">{stats.active}</div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {requests.length === 0 ? (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-slate-600">No advertising requests found.</p>
            </div>
          ) : (
            requests.map((requestItem) => (
              <article
                key={requestItem.id}
                className="rounded-3xl border bg-white p-8 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-4xl">
                    <div
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusBadge(
                        requestItem.status
                      )}`}
                    >
                      {requestItem.status}
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                      {requestItem.company_name || "Unknown company"}
                    </h2>

                    <div className="mt-2 text-sm text-slate-500">
                      Package: {requestItem.package_name || "—"}
                    </div>

                    <div className="mt-6 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
                      <div>
                        <span className="font-semibold">Contact person:</span>{" "}
                        {requestItem.contact_name || "—"}
                      </div>

                      <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {requestItem.email || "—"}
                      </div>

                      <div>
                        <span className="font-semibold">Website:</span>{" "}
                        {requestItem.website ? (
                          <a
                            href={requestItem.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-900 underline"
                          >
                            {requestItem.website}
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>

                      <div>
                        <span className="font-semibold">Preferred start:</span>{" "}
                        {requestItem.preferred_start || "—"}
                      </div>

                      <div>
                        <span className="font-semibold">Created:</span>{" "}
                        {requestItem.created_at
                          ? new Date(requestItem.created_at).toLocaleString("hr-HR")
                          : "—"}
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-semibold text-slate-900">
                        Campaign note
                      </div>
                      <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                        {requestItem.campaign_note || "No campaign note provided."}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-[220px]">
                    <label className="text-sm font-medium text-slate-800">
                      Update status
                    </label>

                    <select
                      value={requestItem.status || "new"}
                      onChange={(e) => updateStatus(requestItem.id, e.target.value)}
                      disabled={updatingId === requestItem.id}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingId === requestItem.id && (
                      <p className="mt-3 text-sm text-slate-500">Updating status...</p>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}