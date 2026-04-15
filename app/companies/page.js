"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from("companies_pending")
        .select("*")
        .eq("status", "Approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching companies:", error);
      } else {
        setCompanies(data || []);
      }

      setLoading(false);
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Manufacturer Directory
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Loading companies...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect loads approved manufacturers.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Manufacturer Directory
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Croatian metalworking companies
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Discover approved manufacturers and explore their capabilities,
              materials, and production focus.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Join the directory
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you a Croatian manufacturer? Submit your company profile to
              become visible to European buyers on MetalConnect.
            </p>

            <a
              href="/submit-company"
              className="mt-5 inline-block rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              Add your company →
            </a>
          </div>
        </div>

        {companies.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              No companies listed yet
            </h2>

            <p className="mt-4 text-slate-600">
              Be the first to add your company to the MetalConnect directory.
            </p>

            <a
              href="/submit-company"
              className="mt-6 inline-block rounded-2xl bg-blue-900 px-5 py-3 text-white transition hover:bg-blue-800"
            >
              Add your company →
            </a>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {companies.map((company) => (
              <article
                key={company.id}
                className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <a href={`/companies/${company.slug}`} className="block">
                  <div className="mb-4 flex h-12 items-center">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="h-10 object-contain"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-800">
                        {company.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold text-slate-950">
                    {company.name}
                  </h2>

                  <div className="mt-2 text-sm text-slate-500">
                    {company.country || "—"}
                  </div>

                  <p className="mt-4 line-clamp-5 text-base leading-7 text-slate-600">
                    {company.description || "No description available."}
                  </p>
                </a>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <a
                    href={`/companies/${company.slug}`}
                    className="text-sm font-medium text-blue-900"
                  >
                    View profile →
                  </a>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-700 underline"
                    >
                      Website
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}