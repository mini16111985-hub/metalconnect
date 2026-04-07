export const metadata = {
  title: "Privacy Policy | MetalConnect",
  description: "Privacy Policy for MetalConnect.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Privacy Policy
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          This Privacy Policy explains how MetalConnect collects, uses, and protects personal data when using the platform.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">1. Who we are</h2>
            <p className="mt-4 leading-7 text-slate-600">
              MetalConnect is an industrial sourcing platform connecting European buyers with Croatian manufacturers.
              For privacy-related questions, you can contact us at{" "}
              <a
                href="mailto:metalconnect.hr@gmail.com"
                className="font-medium text-slate-900 underline"
              >
                metalconnect.hr@gmail.com
              </a>.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">2. What data we collect</h2>
            <div className="mt-4 space-y-3 leading-7 text-slate-600">
              <p>We may collect the following information:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>company name and contact person details</li>
                <li>email address and business contact information</li>
                <li>RFQ details, offer details, and related attachments</li>
                <li>company submission details and logos</li>
                <li>technical and usage information necessary for platform operation</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">3. How we use data</h2>
            <div className="mt-4 space-y-3 leading-7 text-slate-600">
              <p>We use personal and business data to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>process company submissions, RFQs, and supplier offers</li>
                <li>enable communication between buyers, suppliers, and platform administrators</li>
                <li>review and approve company and RFQ submissions</li>
                <li>send transactional platform emails and notifications</li>
                <li>improve platform functionality, reliability, and security</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">4. Legal basis</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We process data where necessary to provide the platform, respond to user requests, operate the service,
              and communicate regarding RFQs, offers, and company submissions. In some cases, processing may also be
              based on legitimate interest or user consent, depending on the interaction.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">5. Data sharing</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We do not sell personal data. Information may be shared only where necessary for operating the platform,
              including with infrastructure and service providers such as hosting, database, storage, and email delivery services.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">6. Data retention</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We keep personal and business data only for as long as necessary to operate the platform, maintain records,
              resolve disputes, meet legal obligations, and protect the service from misuse.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">7. Security</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We take reasonable technical and organizational measures to protect data against unauthorized access, loss,
              misuse, or disclosure. However, no online service can guarantee absolute security.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">8. Your rights</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Depending on applicable law, you may have the right to request access to your data, correction, deletion,
              restriction of processing, or objection to certain uses. Requests can be sent to{" "}
              <a
                href="mailto:metalconnect.hr@gmail.com"
                className="font-medium text-slate-900 underline"
              >
                metalconnect.hr@gmail.com
              </a>.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">9. Changes to this policy</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We may update this Privacy Policy from time to time. The latest version will always be published on this page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}