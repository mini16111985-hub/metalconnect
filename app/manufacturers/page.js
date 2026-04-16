export default function ManufacturersPage() {
  const steps = [
    {
      title: "1. Browse RFQs",
      text: "Review approved buyer requests with service, material, quantity, deadline, and drawing attachment.",
    },
    {
      title: "2. Submit your offer",
      text: "Enter your pricing breakdown, quantity, delivery terms, and message. Your offer is sent directly to the buyer.",
    },
    {
      title: "3. Add your company",
      text: "Submit your company profile and request to be listed in the supplier directory so buyers can discover your capabilities.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          For Manufacturers
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Discover new RFQs and win manufacturing work
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Browse approved RFQs, review attached drawings, submit your offers,
              and present your company to European buyers through MetalConnect.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Manufacturer flow
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use MetalConnect to discover opportunities, respond with structured
              offers, and increase your visibility in front of European buyers.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Browse RFQs →
              </a>

              <a
                href="/submit-company"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Add your company
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-950">{step.title}</h2>
              <p className="mt-4 text-slate-600 leading-7">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}