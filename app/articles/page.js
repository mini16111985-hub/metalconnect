export default function ArticlesPage() {
  const articles = [
    {
      title: "Croatia as a Manufacturing Partner for European Companies",
      description:
        "How Croatian manufacturers are becoming attractive nearshoring partners for European industrial buyers.",
      slug: "croatia-manufacturing-partner",
    },
    {
      title: "CNC Capabilities in Croatia: What International Buyers Should Expect",
      description:
        "An overview of production flexibility, technical capabilities, and what buyers can expect from Croatian CNC suppliers.",
      slug: "cnc-capabilities-croatia",
    },
    {
      title: "How to Prepare a Proper RFQ for Metal Manufacturing",
      description:
        "A practical guide to preparing better manufacturing requests and getting more accurate quotations.",
      slug: "proper-rfq-metal-manufacturing",
    },
    {
      title: "The Real Cost Structure of CNC Manufacturing",
      description:
        "A closer look at the real factors behind CNC production costs, from setup and tooling to material and finishing.",
      slug: "cost-structure-cnc-manufacturing",
    },
    {
      title: "Common Mistakes When Outsourcing Metal Parts",
      description:
        "The most frequent mistakes buyers make when outsourcing machined and fabricated parts — and how to avoid them.",
      slug: "mistakes-outsourcing-metal-parts",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Industry Articles
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Insights, guidance, and market context for industrial cooperation.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              MetalConnect publishes practical and original content related to CNC
              machining, metal manufacturing, nearshoring, and industrial sourcing
              in Croatia.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Why read these articles
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These articles are written to help buyers and manufacturers better
              understand sourcing, RFQ preparation, production expectations, and
              industrial cooperation in Croatia.
            </p>

            <a
              href="/rfq"
              className="mt-5 inline-block rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              Explore RFQs →
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-800">
                MetalConnect article
              </div>

              <h2 className="mt-5 text-2xl font-semibold leading-8 text-slate-950">
                {article.title}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {article.description}
              </p>

              <a
                href={`/articles/${article.slug}`}
                className="mt-6 inline-block text-sm font-medium text-blue-900"
              >
                Read article →
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}