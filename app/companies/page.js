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
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-3xl font-bold">Loading companies...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Manufacturer Directory
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Croatian metalworking companies
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          Discover approved manufacturers and explore their capabilities,
          materials, and production focus.
        </p>

        {companies.length === 0 ? (
          <div className="mt-12 rounded-3xl border bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">
              No companies listed yet
            </h2>

            <p className="mt-4 text-slate-600">
              Be the first to add your company to the MetalConnect directory.
            </p>

            <a
              href="/submit-company"
              className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-white"
            >
              Add your company →
            </a>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {companies.map((company) => (
              <article
                key={company.id}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-md"
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-sm font-semibold text-slate-600">
                        {company.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold">
                    {company.name}
                  </h2>

                  <div className="mt-2 text-sm text-slate-500">
                    {company.country || "—"}
                  </div>

                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {company.description || "No description available."}
                  </p>
                </a>

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-slate-900 underline"
                  >
                    Visit website
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}