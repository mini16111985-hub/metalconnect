export const metadata = {
  title: "Contact | MetalConnect",
  description: "Get in touch with MetalConnect.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Contact
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact MetalConnect
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          For general questions, support, or business inquiries, contact us using the email below.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Email</h2>

            <div className="mt-6 text-slate-700">
              <div className="text-sm text-slate-500">Main contact</div>
              <a
                href="mailto:metalconnect.hr@gmail.com"
                className="mt-1 inline-block font-medium text-slate-900 underline"
              >
                metalconnect.hr@gmail.com
              </a>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">What to include</h2>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>Brief description of your request</li>
              <li>Your company name</li>
              <li>Relevant RFQ or company page link if applicable</li>
              <li>Your preferred reply email</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Support note</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            MetalConnect is an industrial sourcing platform connecting European buyers with Croatian manufacturers.
            We aim to respond to relevant inquiries as soon as possible.
          </p>
        </div>
      </section>
    </main>
  );
}