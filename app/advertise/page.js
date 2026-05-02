export default function AdvertisePage() {
  const packages = [
    {
      name: "Featured Directory",
      price: "49 €",
      period: "/ 30 days",
      badge: "Starter visibility",
      description:
        "Ideal for Croatian manufacturers who want stronger visibility inside the MetalConnect supplier directory.",
      features: [
        "Featured placement in the company directory",
        "Higher visual visibility than standard listings",
        "Featured badge on your placement",
        "Company logo, short description, and profile link",
        "30-day campaign duration",
      ],
      cta: "Request this package →",
    },
    {
      name: "Homepage Featured Slot",
      price: "89 €",
      period: "/ 30 days",
      badge: "Most balanced",
      description:
        "A strong option for companies that want to appear directly on the homepage and attract attention from both buyers and manufacturers.",
      features: [
        "Featured slot on the MetalConnect homepage",
        "Logo, short description, and direct website/profile link",
        "Higher visibility for first-time visitors",
        "Suitable for manufacturers and industrial partners",
        "30-day campaign duration",
      ],
      cta: "Request this package →",
      highlighted: true,
    },
    {
      name: "Sponsored Banner",
      price: "149 €",
      period: "/ 30 days",
      badge: "Premium placement",
      description:
        "Designed for software vendors, tooling suppliers, industrial services, events, and other B2B brands targeting the metalworking sector.",
      features: [
        "Sponsored banner or premium promotional placement",
        "Best visibility option available in the first advertising phase",
        "Direct external link to your website or landing page",
        "Suitable for industry-focused promotional campaigns",
        "30-day campaign duration",
      ],
      cta: "Request this package →",
    },
  ];

  const audience = [
    "Croatian manufacturers and subcontractors",
    "European industrial buyers exploring sourcing options",
    "CNC workshops and fabrication companies",
    "Tooling, software, and industrial equipment providers",
    "B2B service providers relevant to manufacturing",
  ];

  const rules = [
    "All sponsored and featured placements are clearly marked.",
    "Advertising requests are reviewed before publication.",
    "MetalConnect reserves the right to reject irrelevant or low-quality ads.",
    "Campaigns start after confirmation, payment, and delivery of materials.",
    "Prices are shown per 30-day placement period.",
    "VAT may apply depending on billing status and location.",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Advertising opportunities
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Reach a focused audience in the Croatian metalworking industry.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Promote your company, service, software, event, or industrial brand
              through targeted B2B visibility on MetalConnect. We offer simple
              sponsored placements built for manufacturers and industrial buyers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/advertise-request"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
              >
                Request advertising →
              </a>

              <a
                href="/advertise-request"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Email us directly
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Why advertise here
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              MetalConnect is built around industrial sourcing, RFQs, supplier
              discovery, and manufacturing visibility. That makes it a focused
              environment for B2B companies that want to reach the right audience,
              without broad consumer noise.
            </p>

            <div className="mt-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Audience includes
              </div>

              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {audience.map((item) => (
                  <li key={item} className="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Advertising packages
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Simple sponsored placements for an industry-focused audience
            </h2>

            <p className="mt-4 text-slate-600">
              Start with a clear package, send us your materials, and we will
              confirm placement details with you directly.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`rounded-3xl border p-8 shadow-sm ${
                  pkg.highlighted
                    ? "border-blue-200 bg-gradient-to-b from-blue-50 to-white"
                    : "border-blue-100 bg-white"
                }`}
              >
                <div className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {pkg.badge}
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-slate-950">
                  {pkg.name}
                </h3>

                <div className="mt-4 flex items-end gap-2">
                  <div className="text-4xl font-bold tracking-tight text-blue-950">
                    {pkg.price}
                  </div>
                  <div className="pb-1 text-sm text-slate-500">{pkg.period}</div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {pkg.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/advertise-request?package=${encodeURIComponent(pkg.name)}`}
                  className={`mt-8 inline-block rounded-2xl px-5 py-3 text-sm font-medium transition ${
                    pkg.highlighted
                      ? "bg-blue-900 text-white hover:bg-blue-800"
                      : "border border-blue-200 bg-white text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  {pkg.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Process
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              How advertising works
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  1. Request
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Choose a package and contact us with your company details and
                  preferred placement.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  2. Confirm
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  We review relevance, confirm availability, and agree on timeline,
                  materials, and final details.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  3. Publish
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Once payment and materials are confirmed, your sponsored placement
                  goes live for the agreed period.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Rules and notes
            </div>

            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              {rules.map((rule) => (
                <li
                  key={rule}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {rule}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                Ready to start?
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Send us your company name, website, preferred package, and a short
                description of what you want to promote.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/advertise-request"
                  className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Request advertising →
                </a>

                <a
                  href="/advertise-request"
                  className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
                >
                  Contact by email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}