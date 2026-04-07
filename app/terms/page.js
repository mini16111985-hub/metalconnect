export const metadata = {
  title: "Terms of Use | MetalConnect",
  description: "Terms of Use for MetalConnect.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Terms of Use
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Terms of Use
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          These Terms of Use govern access to and use of the MetalConnect platform.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">1. About the platform</h2>
            <p className="mt-4 leading-7 text-slate-600">
              MetalConnect is an industrial sourcing platform intended to connect buyers and Croatian manufacturers.
              The platform may include RFQ submission, company listings, supplier offers, and administrative review workflows.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">2. Acceptance of terms</h2>
            <p className="mt-4 leading-7 text-slate-600">
              By accessing or using MetalConnect, you agree to these Terms of Use. If you do not agree, you should not use the platform.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">3. User responsibilities</h2>
            <div className="mt-4 space-y-3 leading-7 text-slate-600">
              <p>Users agree to provide accurate and lawful information when using the platform.</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>do not submit false, misleading, or unlawful content</li>
                <li>do not upload harmful, infringing, or unauthorized files</li>
                <li>do not attempt to interfere with platform security or availability</li>
                <li>do not impersonate other persons or businesses</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">4. RFQs, offers, and company submissions</h2>
            <p className="mt-4 leading-7 text-slate-600">
              MetalConnect may review, approve, reject, or remove RFQs, company submissions, or other content at its discretion.
              Submission through the platform does not guarantee publication, response, business opportunity, or transaction completion.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">5. No guarantee of transaction</h2>
            <p className="mt-4 leading-7 text-slate-600">
              MetalConnect provides a platform for connection and communication, but is not a party to contracts, negotiations,
              pricing agreements, manufacturing arrangements, delivery obligations, or payment disputes between users.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">6. Content and intellectual property</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Users remain responsible for the content they submit, including company information, RFQs, offers, attachments, logos,
              and other materials. By submitting content, users confirm they have the necessary rights to do so.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">7. Availability and changes</h2>
            <p className="mt-4 leading-7 text-slate-600">
              MetalConnect may modify, suspend, or discontinue any part of the platform at any time, with or without notice.
              We do not guarantee uninterrupted availability or error-free operation.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">8. Limitation of liability</h2>
            <p className="mt-4 leading-7 text-slate-600">
              To the maximum extent permitted by law, MetalConnect shall not be liable for indirect, incidental, special,
              consequential, or business-related damages arising from use of the platform, submitted content, or third-party interactions.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">9. Termination or restriction</h2>
            <p className="mt-4 leading-7 text-slate-600">
              We may suspend, restrict, or terminate access to the platform where necessary to protect the service,
              comply with legal obligations, or respond to misuse.
            </p>
          </section>

          <section className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">10. Contact</h2>
            <p className="mt-4 leading-7 text-slate-600">
              For questions regarding these Terms of Use, contact{" "}
              <a
                href="mailto:metalconnect.hr@gmail.com"
                className="font-medium text-slate-900 underline"
              >
                metalconnect.hr@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}