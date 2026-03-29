export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          About MetalConnect
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Building stronger connections between Croatian manufacturers and European buyers.
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-700">
          <p>
            MetalConnect is an independent digital platform focused on connecting
            manufacturers in Croatia with industrial partners across Europe.
          </p>

          <p>
            The goal of the platform is to increase visibility for Croatian metal
            processing companies and help European buyers discover reliable
            manufacturing partners.
          </p>

          <p>
            Croatia has a long tradition in metalworking, mechanical engineering,
            and industrial production. Across the country, hundreds of small and
            medium-sized companies provide specialized services such as CNC
            machining, welding, laser cutting, and custom metal fabrication.
          </p>

          <p>
            Despite their technical expertise and production capabilities, many of
            these companies remain relatively unknown outside their local markets.
          </p>

          <p>MetalConnect aims to bridge that gap.</p>

          <p>
            By building a structured directory of metalworking companies and
            publishing educational industry content, the platform helps improve
            transparency and accessibility within the manufacturing sector.
          </p>

          <p>The platform focuses on three key areas:</p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Industry visibility</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Providing a structured overview of Croatian manufacturing capabilities.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Knowledge sharing</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Publishing articles and insights related to metal manufacturing,
                outsourcing, and production processes.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Industrial connections</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Helping companies find new business opportunities and cooperation partners.
              </p>
            </div>
          </div>

          <p>
            MetalConnect is designed to grow alongside the industry it represents,
            gradually expanding its network of manufacturers and strengthening
            connections between Croatian suppliers and European buyers.
          </p>
        </div>
      </section>
    </main>
  );
}
