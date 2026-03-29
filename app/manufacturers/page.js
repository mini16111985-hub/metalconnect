export default function ManufacturersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          For Manufacturers
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Discover new RFQs and win manufacturing work
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          Browse approved RFQs, review attached drawings, submit your offers,
          and present your company to European buyers through MetalConnect.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/rfq"
            className="inline-block rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white"
          >
            Browse RFQs →
          </a>

          <a
            href="/companies"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            View company directory
          </a>

          <a
            href="/submit-company"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            Add your company
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">1. Browse RFQs</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Review approved buyer requests with service, material, quantity,
              deadline, and drawing attachment.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">2. Submit your offer</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Enter your pricing breakdown, quantity, and message. Your offer is
              sent directly to the buyer through the platform.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">3. Add your company</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Submit your company profile and request to be listed in the supplier
              directory so buyers can discover your manufacturing capabilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}