export const metadata = {
  title: "Contact | MetalConnect",
  description: "Contact MetalConnect for general inquiries, support, and advertising requests.",
};

export default function ContactPage() {
  const contactTypes = [
    "General business inquiry",
    "Advertising request",
    "RFQ-related question",
    "Company listing question",
    "Technical/support issue",
  ];

  const advertisingChecklist = [
    "Company name",
    "Website or landing page",
    "Preferred advertising package",
    "Short description of what you want to promote",
    "Preferred campaign start period",
    "Reply email and contact person",
  ];

  const generalChecklist = [
    "Brief description of your request",
    "Your company name",
    "Relevant RFQ or company page link if applicable",
    "Your preferred reply email",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Contact
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Contact MetalConnect
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              For business inquiries, support, company listing questions, or
              advertising requests, contact us directly and we will get back to
              you as soon as possible.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Best way to reach us
            </div>

            <div className="mt-6 text-slate-700">
              <div className="text-sm text-slate-500">Main contact email</div>
              <a
                href="mailto:metalconnect.hr@gmail.com"
                className="mt-2 inline-block text-lg font-semibold text-slate-950 underline"
              >
                metalconnect.hr@gmail.com
              </a>
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Common inquiry types
              </div>

              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {contactTypes.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3"
                  >
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
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                General inquiries
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                What to include in a general message
              </h2>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                {generalChecklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Advertising inquiries
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                What to include for advertising requests
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                If you are interested in a featured listing, homepage slot, or
                sponsored banner, include the details below so we can reply
                faster with availability and next steps.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                {advertisingChecklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-blue-200 bg-white px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:metalconnect.hr@gmail.com?subject=Advertising%20Inquiry%20%E2%80%93%20MetalConnect"
                  className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Start advertising inquiry →
                </a>

                <a
                  href="/advertise"
                  className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
                >
                  View advertising packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Support note
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            A focused B2B platform for industrial cooperation
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-600">
            MetalConnect is an industrial sourcing platform built to connect
            European buyers with Croatian manufacturers. We aim to respond to
            relevant business, supplier, and advertising inquiries as soon as
            possible and keep communication clear and practical.
          </p>
        </div>
      </section>
    </main>
  );
}