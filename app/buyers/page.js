export default function BuyersPage() {
  const steps = [
    {
      title: "1. Create your RFQ",
      text: "Describe your project, quantity, material, and deadline. Attach PDF, STP, STEP, or DXF drawings.",
    },
    {
      title: "2. Receive offers",
      text: "Manufacturers submit offers directly for your RFQ. You receive email notification and a private link to review them.",
    },
    {
      title: "3. Compare suppliers",
      text: "Compare pricing, delivery details, and supplier messages in one clear buyer view.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          For Buyers
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Find reliable Croatian manufacturing partners
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Submit your RFQ, attach drawings, and receive supplier offers in one
              place. MetalConnect helps European buyers connect with vetted Croatian
              manufacturers.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Buyer flow
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Start with your RFQ, let suppliers respond, and review all offers
              through a private buyer link designed for easy comparison.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Submit RFQ →
              </a>

              <a
                href="/companies"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Browse companies
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