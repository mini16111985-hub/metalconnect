"use client";

import { useEffect, useState } from "react";

export default function AdminCompaniesClient() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCompanies = async () => {
    const response = await fetch("/api/admin-companies", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error fetching companies:", result);
      setCompanies([]);
      setLoading(false);
      return;
    }

    setCompanies(result.companies || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const updateStatus = async (company, newStatus) => {
    setUpdatingId(company.id);

    const response = await fetch("/api/admin-companies", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: company.id,
        status: newStatus,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Update error:", result);
      setUpdatingId(null);
      return;
    }

    if (newStatus === "Approved" && company.email) {
      const companyLink = `https://metalconnect-gamma.vercel.app/companies/${company.slug}`;

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: company.email,
          subject: `Your company profile has been approved – ${company.name}`,
          text: `Hello,

Your company profile has been approved and is now visible in the MetalConnect supplier directory.

Company:
${company.name}

View your profile here:
${companyLink}

Thank you for joining MetalConnect.

— MetalConnect`,
        }),
      });

      const emailResult = await emailResponse.json();
      console.log("COMPANY APPROVAL EMAIL RESULT:", emailResult);
    }

    await fetchCompanies();
    setUpdatingId(null);
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
          <h1 className="text-3xl font-bold">Loading companies...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Admin Panel
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Manage company submissions
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Review submitted manufacturer profiles and control which companies are approved.
        </p>

        <div className="mt-10 space-y-6">
          {companies.length === 0 ? (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-slate-600">No company submissions found.</p>
            </div>
          ) : (
            companies.map((company) => {
              const isApproved = company.status === "Approved";
              const isRejected = company.status === "Rejected";
              const isPending = company.status === "Pending review";

              return (
                <article
                  key={company.id}
                  className="rounded-3xl border bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusBadge(
                          company.status
                        )}`}
                      >
                        {company.status}
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold">
                        {company.name || "Unnamed company"}
                      </h2>

                      <div className="mt-2 text-sm text-slate-500">
                        {company.country || "—"}
                      </div>

                      <div className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                        <div>
                          <span className="font-semibold">Website:</span>{" "}
                          {company.website ? (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-900 underline"
                            >
                              {company.website}
                            </a>
                          ) : (
                            "—"
                          )}
                        </div>

                        <div>
                          <span className="font-semibold">Email:</span>{" "}
                          {company.email || "—"}
                        </div>

                        <div>
                          <span className="font-semibold">Created:</span>{" "}
                          {company.created_at
                            ? new Date(company.created_at).toLocaleString()
                            : "—"}
                        </div>
                      </div>

                      <p className="mt-6 text-base leading-7 text-slate-600">
                        {company.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex min-w-[220px] flex-col gap-3">
                      <button
                        onClick={() => updateStatus(company, "Approved")}
                        disabled={isApproved || updatingId === company.id}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isApproved
                            ? "cursor-not-allowed bg-green-100 text-green-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {updatingId === company.id && !isRejected
                          ? "Updating..."
                          : isApproved
                          ? "Approved"
                          : "Approve"}
                      </button>

                      <button
                        onClick={() => updateStatus(company, "Rejected")}
                        disabled={isRejected || updatingId === company.id}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          isRejected
                            ? "cursor-not-allowed bg-red-100 text-red-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {updatingId === company.id && !isApproved
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