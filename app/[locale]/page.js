import { getDictionary } from "../../lib/i18n/getDictionary";
import { isValidLocale } from "../../lib/i18n/config";
import { notFound } from "next/navigation";

export default async function LocalizedHomePage({ params }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.9fr] md:items-start">
          <div>
            <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              {dict.home.badge}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              {dict.home.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {dict.home.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
              >
                {dict.home.ctaPrimary}
              </a>

              <a
                href="/rfq"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                {dict.home.ctaSecondary}
              </a>

              <a
                href="/companies"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                {dict.home.ctaTertiary}
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {dict.home.stats.map((stat) => (
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
                {dict.home.buyerCard.badge}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                {dict.home.buyerCard.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {dict.home.buyerCard.text}
              </p>

              <a
                href="/buyers"
                className="mt-6 inline-block rounded-2xl bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                {dict.home.buyerCard.cta}
              </a>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {dict.home.manufacturerCard.badge}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                {dict.home.manufacturerCard.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {dict.home.manufacturerCard.text}
              </p>

              <a
                href="/manufacturers"
                className="mt-6 inline-block rounded-2xl border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                {dict.home.manufacturerCard.cta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}