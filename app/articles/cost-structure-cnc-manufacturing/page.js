export const metadata = {
  title: "The Real Cost Structure of CNC Manufacturing | MetalConnect",
  description:
    "A closer look at the real factors behind CNC production costs, from setup and tooling to material and finishing.",
};

export default function CostStructureCNCManufacturingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <a
          href="/articles"
          className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600"
        >
          Back to Articles
        </a>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          The Real Cost Structure of CNC Manufacturing
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          CNC pricing is often misunderstood by buyers who focus only on the piece price.
          In reality, CNC manufacturing cost is a combination of setup effort, material,
          machine time, tooling, finishing, and production complexity.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Setup is often a major cost driver</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Before the first chip is even cut, the supplier may need to review drawings,
              program the machine, prepare fixtures, load tools, and run first-part checks.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              That setup effort is spread across the batch size. This is why small quantities
              are often much more expensive per piece than medium or larger runs.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Material cost is only one part of the picture</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Buyers often compare machining offers by looking at material type alone.
              However, the real material cost depends on stock size, waste ratio, cut-off loss,
              alloy availability, and how efficiently the raw material can be nested or machined.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Machine time and complexity matter</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A simple 2-axis turning job is not priced like a complex 5-axis milling part.
              Geometry, tolerances, tool access, repositioning, and cycle stability all affect
              machine time.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              The more complex the part, the more likely it is that the supplier must invest
              in higher-skilled programming and longer processing time.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Tooling and wear are real cost elements</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Cutting tools are consumables. Harder materials, tight tolerances, deep cavities,
              or difficult geometries increase tool wear and tool replacement frequency.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              On demanding jobs, tooling can become a meaningful cost factor, especially in
              smaller batches.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Inspection and quality control add time</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Tight tolerances and documented inspection requirements raise the cost of production.
              Measurement routines, first article inspection, reporting, and quality records
              all require time and skill.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Finishing, packaging, and logistics are often underestimated</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Deburring, coating, anodizing, heat treatment, marking, protective packaging,
              and shipping are not secondary details — they often explain why two offers that
              look similar at first glance end up with different totals.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">What buyers should compare</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
              <li>setup assumptions</li>
              <li>material included or excluded</li>
              <li>machining scope</li>
              <li>inspection level</li>
              <li>finishing and transport</li>
              <li>delivery timeline</li>
              <li>repeat-order pricing potential</li>
            </ul>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="mt-4 leading-7 text-slate-600">
              CNC manufacturing cost is not just about hourly rate or raw material. Buyers who
              understand the structure behind the quotation can compare suppliers more realistically
              and make better sourcing decisions.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}