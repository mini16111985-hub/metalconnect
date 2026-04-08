export const metadata = {
  title: "Common Mistakes When Outsourcing Metal Parts | MetalConnect",
  description:
    "The most frequent mistakes buyers make when outsourcing machined and fabricated parts — and how to avoid them.",
};

export default function MistakesOutsourcingMetalPartsPage() {
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
          Common Mistakes When Outsourcing Metal Parts
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          Outsourcing metal parts can reduce lead times, improve flexibility, and expand supplier
          options. But many sourcing problems begin long before production starts — usually in the
          request, evaluation, or communication phase.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 1: sending incomplete documentation</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Missing drawings, unclear revisions, incomplete tolerances, and vague notes create
              confusion immediately. Suppliers are then forced to guess, ask follow-up questions,
              or add risk margin into pricing.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 2: comparing only the lowest price</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The cheapest offer is not always the best offer. Differences in scope, inspection,
              packaging, finishing, or transport can make one quote look cheaper while actually
              including less.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Good sourcing decisions compare total offer quality, not just headline price.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 3: choosing a supplier without checking fit</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Not every supplier is the right match for every job. Some are stronger in prototypes,
              some in serial production, some in machining, and some in fabricated assemblies.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Supplier capability fit matters as much as price.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 4: unclear delivery expectations</h2>
            <p className="mt-4 leading-7 text-slate-600">
              If urgency, batch schedule, Incoterms expectations, or logistics constraints are not
              stated early, misunderstandings appear later in the process.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Delivery requirements should be part of the RFQ, not a later correction.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 5: ignoring communication quality</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A supplier’s responsiveness, clarity, and consistency often predict how the project
              will run later. Slow or vague communication at quotation stage is usually not a good sign.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mistake 6: not clarifying finishing and inspection scope</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Surface treatment, deburring expectations, inspection reports, certificates, and
              packaging details should be clarified before order confirmation. If not, disputes
              can appear even when the machining itself is correct.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">A better outsourcing approach</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
              <li>prepare a complete RFQ</li>
              <li>check supplier capability fit</li>
              <li>compare total offer scope, not just price</li>
              <li>clarify delivery and quality requirements early</li>
              <li>use communication quality as part of supplier evaluation</li>
            </ul>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Most outsourcing mistakes are preventable. Better preparation and better supplier
              evaluation lead to smoother production, stronger partnerships, and fewer costly surprises.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}