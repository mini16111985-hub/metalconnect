export default function Home() {
  const articles = [
    {
      title: "Croatia as a Manufacturing Partner for European Companies",
      excerpt:
        "How Croatian metal manufacturers can become reliable nearshoring partners for EU buyers.",
    },
    {
      title: "CNC Capabilities in Croatia: What International Buyers Should Expect",
      excerpt:
        "An overview of common machining capabilities, production strengths, and collaboration expectations.",
    },
    {
      title: "How to Prepare a Proper RFQ for Metal Manufacturing",
      excerpt:
        "A practical guide for buyers who want faster quotes and fewer production misunderstandings.",
    },
  ];

  const categories = [
    "CNC Milling",
    "CNC Turning",
    "5-Axis Machining",
    "Laser Cutting",
    "Welding",
    "Sheet Metal Fabrication",
    "Toolmaking",
    "Surface Treatment",
  ];

  const companies = [
    {
      name: "Sample Precision d.o.o.",
      city: "Zagreb",
      services: "CNC Milling, CNC Turning",
      materials: "Steel, Stainless Steel, Aluminum",
    },
    {
      name: "Adriatic Metal Works",
      city: "Rijeka",
      services: "Welding, Sheet Metal Fabrication",
      materials: "Steel, Aluminum",
    },
    {
      name: "North Axis CNC",
      city: "Varaždin",
      services: "5-Axis Machining, Prototyping",
      materials: "Aluminum, Engineering Plastics",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-2xl font-bold tracking-tight">MetalConnect</div>
            <div className="text-sm text-slate-600">
              Connecting Croatian manufacturers with European buyers
            </div>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#directory" className="hover:text-slate-600">Directory</a>
            <a href="#articles" className="hover:text-slate-600">Articles</a>
            <a href="#buyers" className="hover:text-slate-600">For Buyers</a>
            <a href="#manufacturers" className="hover:text-slate-600">For Manufacturers</a>
            <a href="#advertise" className="hover:text-slate-600">Advertise</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
              Industrial portal • Croatia → EU
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Discover Croatian metal manufacturers in one place.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              MetalConnect is a digital platform for showcasing Croatian metalworking companies,
              publishing industrial insights, and building future connections with buyers across Europe.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#directory"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm"
              >
                Explore Directory
              </a>
              <a
                href="#buyers"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900"
              >
                For Buyers
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-500">Launch focus</div>
              <div className="mt-2 text-2xl font-bold">Croatian manufacturing directory</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Start with a strong Croatian supplier base, industrial articles, and a simple buyer-request flow.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold">300+</div>
                <div className="mt-2 text-sm text-slate-600">Target companies in the first phase</div>
              </div>
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-3xl font-bold">5</div>
                <div className="mt-2 text-sm text-slate-600">Launch articles already prepared</div>
              </div>
            </div>
          </div>
        </section>

        <section id="directory" className="border-y bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Manufacturer Directory</h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  A structured overview of Croatian metalworking companies with capabilities, materials, and production focus.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
                Starter demo with sample profiles
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {companies.map((company) => (
                <article key={company.name} className="rounded-3xl border bg-slate-50 p-6 shadow-sm">
                  <div className="text-xl font-semibold">{company.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{company.city}, Croatia</div>
                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Services</div>
                    <div className="mt-2 text-sm leading-6 text-slate-700">{company.services}</div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Materials</div>
                    <div className="mt-2 text-sm leading-6 text-slate-700">{company.materials}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Latest Industry Articles</h2>
            <p className="mt-3 text-slate-600">
              Educational and market-focused content designed to build trust with both manufacturers and European buyers.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="rounded-3xl border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold leading-7">{article.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                <div className="mt-6 text-sm font-medium">Read article →</div>
              </article>
            ))}
          </div>
        </section>

        <section id="buyers" className="bg-slate-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">For European Buyers</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                Discover Croatian suppliers with flexible production, EU logistics advantages, and strong metalworking expertise.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">Planned next step</div>
              <div className="mt-3 text-2xl font-bold">Buyer Request Form</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                In phase one, requests can be collected through a simple form and manually matched with relevant Croatian manufacturers.
              </p>
            </div>
          </div>
        </section>

        <section id="manufacturers" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">For Manufacturers</h2>
              <p className="mt-4 text-slate-600">
                Join the MetalConnect directory and improve your visibility with buyers, engineers, and procurement teams looking for Croatian manufacturing partners.
              </p>
            </div>
            <div id="advertise" className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Advertising Opportunities</h2>
              <p className="mt-4 text-slate-600">
                Future monetization will focus on tool shops, machinery suppliers, CAM software, and industrial equipment partners targeting the Croatian metal industry.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
          © 2026 MetalConnect. Independent industrial platform connecting Croatian manufacturers with European buyers.
        </div>
      </footer>
    </div>
  );
}
