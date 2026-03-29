export default function BuyersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          For Buyers
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Find reliable Croatian manufacturing partners
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          Submit your RFQ, attach drawings, and receive supplier offers in one place.
          MetalConnect helps European buyers connect with vetted Croatian manufacturers.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/submit-rfq"
            className="inline-block rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white"
          >
            Submit RFQ →
          </a>

          <a
            href="/companies"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            Browse companies
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">1. Create your RFQ</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Describe your project, quantity, material, and deadline. Attach PDF,
              STP, STEP, or DXF drawings.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">2. Receive offers</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Manufacturers submit offers directly for your RFQ. You receive email
              notification and a private link to review them.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">3. Compare suppliers</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Sort offers by price and review the best option for your project in one
              clear buyer view.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}