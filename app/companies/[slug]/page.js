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
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold">Company not found</h1>
            <p className="mt-4 text-slate-600">
              This company profile is not available.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Company Profile
        </div>

        <article className="rounded-3xl border bg-white p-10 shadow-sm">
          <div className="mb-6 flex h-14 items-center">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={company.name}
                className="h-12 object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-lg font-semibold text-slate-600">
                {company.name?.charAt(0)?.toUpperCase() || "C"}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            {company.name}
          </h1>

          <div className="mt-3 text-sm text-slate-500">
            {company.country || "—"}
          </div>

          <div className="mt-8 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <div>
              <span className="font-semibold">Website:</span>{" "}
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
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
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">About the company</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {company.description || "No company description available."}
            </p>
          </div>

          <div className="mt-10">
            <a
              href="/companies"
              className="inline-block rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Back to directory
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}