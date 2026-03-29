export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Company Profile
        </div>

        <div className="grid gap-10 md:grid-cols-[160px_1fr] md:items-start">
          <div className="rounded-3xl border bg-white p-4 shadow-sm">
            <img
              src="/companies/sample-precision/logo.png"
              alt="Sample Precision logo"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Sample Precision d.o.o.
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Zagreb, Croatia
            </p>

            <p className="mt-8 text-lg leading-8 text-slate-700">
              Sample Precision is a Croatian manufacturing company focused on
              precision CNC machining, custom metal components, and small-batch
              production for industrial clients.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <img
            src="/companies/sample-precision/machine.jpg"
            alt="Sample Precision production"
            className="h-[320px] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Capabilities</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• CNC Milling</li>
              <li>• CNC Turning</li>
              <li>• Precision Machining</li>
              <li>• Small-Batch Production</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Materials</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Steel</li>
              <li>• Stainless Steel</li>
              <li>• Aluminum</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Machines</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Haas VF-4</li>
              <li>• DMG Mori DMU 50</li>
              <li>• Okuma Genos L300</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Working Envelope</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Milling: 1270 × 508 × 635 mm</li>
              <li>• 5-axis parts: up to 500 mm</li>
              <li>• Turning diameter: up to 300 mm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Production Focus</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The company focuses on prototype and custom component production,
            supporting industrial customers who require flexibility, reliable
            machining quality, and shorter lead times.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/companies"
            className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Back to directory
          </a>
        </div>
      </section>
    </main>
  );
}
