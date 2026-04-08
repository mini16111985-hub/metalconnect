export const metadata = {
  title: "How to Prepare a Proper RFQ for Metal Manufacturing | MetalConnect",
  description:
    "A practical guide to preparing better manufacturing requests and getting more accurate quotations.",
};

export default function ProperRFQMetalManufacturingPage() {
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
          How to Prepare a Proper RFQ for Metal Manufacturing
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          A well-prepared RFQ is one of the fastest ways to receive more accurate,
          comparable, and useful supplier offers. In metal manufacturing, vague
          requests often lead to unclear pricing, longer response times, and
          unnecessary back-and-forth communication.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Start with clear part information</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Every RFQ should explain what is being produced, in what quantity,
              and for which application. A supplier should immediately understand
              whether the request is about CNC machining, fabrication, welding,
              sheet metal work, or a mixed process.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              The more clearly the supplier understands the part family and production
              context, the more realistic the quotation will be.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Include technical documentation</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Good RFQs should include drawings, 3D files, dimensions, tolerances,
              material requirements, and any relevant standards. If possible,
              attach PDF drawings and manufacturing files such as STEP, STP, or DXF.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Missing or incomplete technical documentation is one of the main reasons
              suppliers either delay their response or price extra risk into the offer.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Be precise about quantity and repeat potential</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Quantity strongly affects cost. A one-off prototype, a batch of 50 pieces,
              and a recurring serial order will not be priced in the same way.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              If there is follow-up potential, mention it. Suppliers often price differently
              when they know the first batch may lead to repeat work.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">State delivery expectations clearly</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Suppliers should know when the parts are needed, whether delivery is urgent,
              and whether packaging, transport, or special handling is required.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Delivery expectations help suppliers plan capacity and avoid giving
              unrealistic timelines.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mention finishing and quality requirements</h2>
            <p className="mt-4 leading-7 text-slate-600">
              If parts need coating, anodizing, heat treatment, deburring, surface finishing,
              inspection reports, or certificates, this should be stated from the beginning.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              These details directly affect pricing, lead time, and the type of supplier
              best suited for the job.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">A practical RFQ checklist</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
              <li>clear part or project description</li>
              <li>material specification</li>
              <li>quantity and batch size</li>
              <li>drawings or 3D files</li>
              <li>tolerances and inspection needs</li>
              <li>surface finishing or post-processing details</li>
              <li>delivery deadline</li>
              <li>contact person and business email</li>
            </ul>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A proper RFQ saves time for both buyer and supplier. Better input almost always
              leads to better offers. For buyers looking to source metal parts efficiently,
              clarity is not a formality — it is a commercial advantage.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}