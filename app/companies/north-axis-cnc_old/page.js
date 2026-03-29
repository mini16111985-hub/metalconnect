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
              src="/companies/north-axis-cnc/logo.png"
              alt="North Axis CNC logo"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              North Axis CNC
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Varaždin, Croatia
            </p>

            <p className="mt-8 text-lg leading-8 text-slate-700">
              North Axis CNC is a Croatian precision machining company focused on
              advanced CNC milling, 5-axis machining, and prototype production for
              industrial customers requiring complex, high-accuracy components.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <img
            src="/companies/north-axis-cnc/machine.jpg"
            alt="North Axis CNC production"
            className="h-[320px] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Capabilities</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• 5-Axis Machining</li>
              <li>• CNC Milling</li>
              <li>• Prototype Production</li>
              <li>• Precision Components</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Materials</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• Aluminum</li>
              <li>• Stainless Steel</li>
              <li>• Engineering Plastics</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Machines</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• DMG Mori DMU 65</li>
              <li>• Haas UMC-500</li>
              <li>• Mitutoyo CMM</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Working Envelope</h2>
            <ul className="mt-4 space-y-2 text-base leading-7 text-slate-700">
              <li>• 5-axis machining: up to 650 × 520 × 475 mm</li>
              <li>• Milling parts: up to 1000 mm length</li>
              <li>• High-precision small components</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Production Focus</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The company focuses on prototypes, precision machined parts, and
            technically demanding projects where multi-axis machining, repeatability,
            and surface quality are critical.
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
