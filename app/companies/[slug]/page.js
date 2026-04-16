import { supabase } from "../../../lib/supabase";

export default async function CompanyDetailPage({ params }) {
  const { slug } = await params;

  const { data: company, error } = await supabase
    .from("companies_pending")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Approved")
    .single();

  if (error || !company) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Company not found
            </h1>
            <p className="mt-4 text-slate-600">
              This company profile is not available.
            </p>

            <a
              href="/companies"
              className="mt-6 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
            >
              Back to directory
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Company Profile
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <div className="mb-6 flex h-16 items-center">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-14 object-contain"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-lg font-semibold text-blue-800">
                  {company.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {company.name}
            </h1>

            <div className="mt-3 text-sm text-slate-500">
              {company.country || "—"}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-slate-950">
                About the company
              </h2>
              <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-600">
                {company.description || "No company description available."}
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/companies"
                className="inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Back to directory
              </a>
            </div>
          </article>

          <div className="space-y-8">
            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Company details
              </h2>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Country
                  </div>
                  <div className="mt-2 font-medium text-slate-900">
                    {company.country || "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Website
                  </div>
                  <div className="mt-2 font-medium text-slate-900 break-words">
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
                </div>

                <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </div>
                  <div className="mt-2 font-medium text-slate-900 break-words">
                    {company.email || "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Buyer action
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Interested in this supplier? Submit your RFQ through MetalConnect
                and compare offers from Croatian manufacturers in one structured flow.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/submit-rfq"
                  className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Submit RFQ →
                </a>

                <a
                  href="/rfq"
                  className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
                >
                  Browse RFQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}