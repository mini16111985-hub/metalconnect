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
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Industry Articles
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Insights, guidance, and market context for industrial cooperation.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          MetalConnect publishes practical and original content related to CNC machining,
          metal manufacturing, nearshoring, and industrial sourcing in Croatia.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-3xl border bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold leading-8">
                {article.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {article.description}
              </p>
              <a
                href={`/articles/${article.slug}`}
                className="mt-6 inline-block text-sm font-medium text-slate-900"
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
