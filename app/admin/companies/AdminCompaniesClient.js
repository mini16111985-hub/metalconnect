"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminCompaniesClient() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCompanies = async () => {
    const response = await fetch("/api/admin-companies", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error fetching companies:", result);
      setErrorMessage(result.error || "Failed to load company submissions.");
      setCompanies([]);
      setLoading(false);
      return;
    }

    setCompanies(result.companies || []);
    setErrorMessage("");
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const updateStatus = async (company, newStatus) => {
    setUpdatingId(company.id);
    setErrorMessage("");

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
      setErrorMessage(result.error || "Failed to update company status.");
      setUpdatingId(null);
      return;
    }

    if (newStatus === "Approved" && company.email) {
      const companyLink = `https://metalconnect-gamma.vercel.app/companies/${company.slug}`;

      try {
        await fetch("/api/send-email", {
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
      } catch (error) {
        console.error("Company approval email error:", error);
      }
    }

    await fetchCompanies();
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

  const stats = useMemo(() => {
    const total = companies.length;
    const approved = companies.filter((company) => company.status === "Approved").length;
    const rejected = companies.filter((company) => company.status === "Rejected").length;
    const pending = companies.filter((company) => company.status === "Pending review").length;

    return { total, approved, rejected, pending };
  }, [companies]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Admin Panel
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Loading company submissions...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect loads submitted manufacturer profiles.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Admin Panel
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Manage company submissions
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Review submitted manufacturer profiles and control which companies
              are approved.
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-950">
              {stats.total}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pending
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-950">
              {stats.pending}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Approved
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-950">
              {stats.approved}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Rejected
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-950">
              {stats.rejected}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-10 space-y-6">
          {companies.length === 0 ? (
            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
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
                  className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-4xl">
                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusBadge(
                          company.status
                        )}`}
                      >
                        {company.status}
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold text-slate-950">
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
                              className="text-blue-900 underline"
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
                            ? new Date(company.created_at).toLocaleString("hr-HR")
                            : "—"}
                        </div>
                      </div>

                      <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-blue-50 bg-slate-50 p-4 text-slate-600">
                        {company.description || "No description provided."}
                      </div>
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
                        {updatingId === company.id
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
                        {updatingId === company.id
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