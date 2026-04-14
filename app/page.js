"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  const highlights = [
    {
      title: "RFQ marketplace",
      text: "Buyers can submit RFQs with drawings and receive supplier offers through one platform.",
    },
    {
      title: "Croatian supplier directory",
      text: "Discover Croatian manufacturers by capability, material, and production focus.",
    },
    {
      title: "Private buyer review",
      text: "Buyers receive email notifications and compare offers in a private view.",
    },
  ];

  const stats = [
    { value: "B2B", label: "focused manufacturing platform" },
    { value: "EU ↔ HR", label: "buyer-supplier connection" },
    { value: "RFQ", label: "from request to offer" },
  ];

  useEffect(() => {
    const fetchFeaturedCompanies = async () => {
      const { data, error } = await supabase
        .from("companies_pending")
        .select("*")
        .eq("status", "Approved")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching featured companies:", error);
      } else {
        setFeaturedCompanies(data || []);
      }

      setCompaniesLoading(false);
    };

    fetchFeaturedCompanies();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative w-full overflow-hidden border-b border-blue-200 bg-slate-950">
        <div className="relative h-[210px] md:h-[260px] lg:h-[310px]">
          <img
            src="/metalconnect-hero.png"
            alt="MetalConnect industrial sourcing banner"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 65%" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/15 via-transparent to-slate-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.9fr] md:items-start">
          <div>
            <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Industrial sourcing platform • Croatia → Europe
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Connect European buyers with Croatian metal manufacturers.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              MetalConnect helps buyers submit RFQs, compare supplier offers,
              and discover Croatian manufacturing companies in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
              >
                Submit RFQ →
              </a>

              <a
                href="/rfq"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Browse RFQs
              </a>

              <a
                href="/companies"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Explore companies
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm"
                >
                  <div className="text-2xl font-bold text-blue-950">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                For Buyers
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                Send one RFQ, receive multiple offers.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Submit project details, attach drawings, and receive supplier offers
                without contacting each manufacturer one by one.
              </p>

              <a
                href="/buyers"
                className="mt-6 inline-block rounded-2xl bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Buyer flow →
              </a>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                For Manufacturers
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                Discover relevant RFQs and submit offers.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Browse approved RFQs, review attached drawings, and send structured
                offers directly through the platform.
              </p>

              <a
                href="/manufacturers"
                className="mt-6 inline-block rounded-2xl border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Manufacturer flow →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Platform highlights
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Built for industrial sourcing
            </h2>

            <p className="mt-4 text-slate-600">
              MetalConnect is designed for practical manufacturing workflows:
              RFQs, drawings, offers, supplier discovery, and buyer comparison in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-blue-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Featured companies
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Approved manufacturers on MetalConnect
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              Explore selected approved companies from the MetalConnect supplier directory.
            </p>
          </div>

          <a
            href="/companies"
            className="hidden rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50 md:inline-block"
          >
            View all companies
          </a>
        </div>

        {companiesLoading ? (
          <div className="mt-10 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <p className="text-slate-600">Loading featured companies...</p>
          </div>
        ) : featuredCompanies.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <p className="text-slate-600">
              No approved companies are featured yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredCompanies.map((company) => (
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

                  <h3 className="text-2xl font-semibold text-slate-950">
                    {company.name}
                  </h3>

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
                    className="mt-4 inline-block text-sm font-medium text-blue-900 underline"
                  >
                    Visit website
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 md:hidden">
          <a
            href="/companies"
            className="inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
          >
            View all companies
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-blue-900 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 px-8 py-10 text-white shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to use MetalConnect?
              </h2>
              <p className="mt-4 max-w-2xl text-blue-100">
                Buyers can submit a new RFQ. Manufacturers can browse approved requests
                and explore Croatian suppliers in the directory.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-blue-950 transition hover:bg-blue-50"
              >
                Create RFQ
              </a>

              <a
                href="/rfq"
                className="rounded-2xl border border-blue-300/40 bg-blue-900/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800/60"
              >
                View RFQs
              </a>

              <a
                href="/companies"
                className="rounded-2xl border border-blue-300/40 bg-blue-900/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800/60"
              >
                Supplier directory
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}