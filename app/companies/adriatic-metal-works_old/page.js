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
              src="/companies/adriatic-metal-works/logo.png"
              alt="Adriatic Metal Works logo"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Adriatic Metal Works
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Rijeka, Croatia
            </p>

            <p className="mt-8 text-lg leading-8 text-slate-700">
              Adriatic Metal Works is a Croatian metal fabrication company focused on
              welded constructions, sheet metal processing, and custom industrial
              steel components for business clients.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <img
            src="/companies/adriatic-metal-works/machine.jpg"
            alt="Adriatic Metal Works production"
            className="h-[320px] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Capabilities</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Welding</li>
              <li>• Sheet Metal Fabrication</li>
              <li>• Custom Steel Structures</li>
              <li>• Industrial Metal Assemblies</li>
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
              <li>• CNC Press Brake</li>
              <li>• MIG/MAG Welding Stations</li>
              <li>• Sheet Metal Guillotine</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Working Envelope</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Bending length: up to 3000 mm</li>
              <li>• Sheet thickness: up to 12 mm</li>
              <li>• Welded structures: custom dimensions</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Production Focus</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The company focuses on welded fabrications, sheet metal projects,
            and made-to-order industrial components for clients who require
            flexibility, solid workmanship, and dependable delivery.
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
