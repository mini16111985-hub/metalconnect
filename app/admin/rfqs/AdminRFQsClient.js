"use client";

import { useEffect, useState } from "react";

export default function AdminRFQsClient() {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchRfqs = async () => {
    const response = await fetch("/api/admin-rfqs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error fetching RFQs:", result);
      setRfqs([]);
      setLoading(false);
      return;
    }

    setRfqs(result.rfqs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRfqs();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);

    const response = await fetch("/api/admin-rfqs", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Update error:", result);
    }

    await fetchRfqs();
    setUpdatingId(null);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/admin-logout", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Logout error:", result);
        setLoggingOut(false);
        return;
      }

      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (status === "Rejected") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-yellow-200 bg-yellow-50 text-yellow-700";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-3xl font-bold">Loading admin RFQs...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
              Admin Panel
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Manage RFQs
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Review incoming requests and control which RFQs become visible on the public board.
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <div className="mt-10 space-y-6">
          {rfqs.length === 0 ? (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-slate-600">No RFQs found.</p>
            </div>
          ) : (
            rfqs.map((rfq) => {
              const isApproved = rfq.status === "Approved";
              const isRejected = rfq.status === "Rejected";
              const isPending = rfq.status === "Pending review";

              return (
                <article
                  key={rfq.id}
                  className="rounded-3xl border bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusBadge(
                          rfq.status
                        )}`}
                      >
                        {rfq.status}
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold">
                        {rfq.title || `${rfq.service} – ${rfq.material} RFQ`}
                      </h2>

                      <div className="mt-2 text-sm text-slate-500">
                        {rfq.country}
                      </div>

                      <div className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                        <div>
                          <span className="font-semibold">Company:</span>{" "}
                          {rfq.company_name || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Contact:</span>{" "}
                          {rfq.contact_person || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Email:</span>{" "}
                          {rfq.buyer_email || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Service:</span>{" "}
                          {rfq.service || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Material:</span>{" "}
                          {rfq.material || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Quantity:</span>{" "}
                          {rfq.quantity || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Deadline:</span>{" "}
                          {rfq.deadline || "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Created:</span>{" "}
                          {rfq.created_at
                            ? new Date(rfq.created_at).toLocaleString()
                            : "—"}
                        </div>
                      </div>

                      <p className="mt-6 text-base leading-7 text-slate-600">
                        {rfq.description}
                      </p>

                      {rfq.file_url && (
                        <a
                          href={rfq.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-100"
                        >
                          📎 Download drawing
                        </a>
                      )}
                    </div>

                    <div className="flex min-w-[220px] flex-col gap-3">
                      <button
                        onClick={() => updateStatus(rfq.id, "Approved")}
                        disabled={isApproved || updatingId === rfq.id}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isApproved
                            ? "cursor-not-allowed bg-green-100 text-green-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {updatingId === rfq.id && !isRejected
                          ? "Updating..."
                          : isApproved
                          ? "Approved"
                          : "Approve"}
                      </button>

                      <button
                        onClick={() => updateStatus(rfq.id, "Rejected")}
                        disabled={isRejected || updatingId === rfq.id}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isRejected
                            ? "cursor-not-allowed bg-red-100 text-red-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {updatingId === rfq.id && !isApproved
                          ? "Updating..."
                          : isRejected
                          ? "Rejected"
                          : "Reject"}
                      </button>

                      {isPending && (
                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                          Waiting for review
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}