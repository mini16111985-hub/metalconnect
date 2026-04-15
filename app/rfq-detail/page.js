"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function RFQDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [rfq, setRfq] = useState(null);
  const [offerCount, setOfferCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRfqDetail = async () => {
      try {
        if (!slug) {
          setErrorMessage("Missing RFQ slug.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/rfq-detail?slug=${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          setErrorMessage(result.error || "Failed to load RFQ.");
          setLoading(false);
          return;
        }

        setRfq(result.rfq || null);
        setOfferCount(result.offerCount || 0);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message || "Unknown error.");
        setLoading(false);
      }
    };

    fetchRfqDetail();
  }, [slug]);

  const getRfqTitle = (rfq) => {
    if (!rfq) return "RFQ";

    if (rfq.title && rfq.title.trim() !== "") {
      return rfq.title;
    }

    const service = rfq.service || "Manufacturing";
    const material = rfq.material || "Project";

    return `${service} – ${material} RFQ`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            RFQ Detail
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Loading RFQ...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect loads the RFQ details.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
            RFQ Error
          </div>

          <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-red-700">
              RFQ could not be loaded
            </h1>
            <p className="mt-4 text-slate-600">{errorMessage}</p>

            <a
              href="/rfq"
              className="mt-6 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
            >
              Back to RFQ board
            </a>
          </div>
        </section>
      </main>
    );
  }

  if (!rfq) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              RFQ not found
            </h1>
            <p className="mt-4 text-slate-600">
              The requested RFQ could not be found.
            </p>

            <a
              href="/rfq"
              className="mt-6 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
            >
              Back to RFQ board
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          RFQ Detail
        </div>

        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-green-700">
                {rfq.status || "Approved"}
              </div>

              <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900">
                Offers received: {offerCount}
              </div>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {getRfqTitle(rfq)}
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              {rfq.country || "—"}
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Supplier action
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Review the RFQ details, check the attachment if available, and
              submit your offer through the structured supplier form.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`/submit-offer?rfq=${encodeURIComponent(rfq.slug)}`}
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Submit offer →
              </a>

              <a
                href="/rfq"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Back to RFQs
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Project details
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.service || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Material
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.material || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Quantity
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.quantity || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Deadline
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.deadline || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.status || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Buyer company
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.company_name || "—"}
                </div>
              </div>
            </div>

            {rfq.contact_person && (
              <div className="mt-6 rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contact person
                </div>
                <div className="mt-2 font-medium text-slate-900">
                  {rfq.contact_person}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Description
              </h2>

              <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-600">
                {rfq.description || "No description available."}
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Attachment
              </h2>

              {rfq.attachment_url ? (
                <>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Download the attached drawing or technical file to review
                    the RFQ in more detail.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={rfq.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                    >
                      Download drawing
                    </a>
                  </div>

                  {rfq.file_name && (
                    <p className="mt-4 text-sm text-slate-500">
                      File: {rfq.file_name}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  No attachment is available for this RFQ.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/rfq"
            className="inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
          >
            Back to RFQ board
          </a>

          <a
            href={`/submit-offer?rfq=${encodeURIComponent(rfq.slug)}`}
            className="inline-block rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Submit offer →
          </a>
        </div>
      </section>
    </main>
  );
}

export default function RFQDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              RFQ Detail
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Loading RFQ...
              </h1>
              <p className="mt-4 text-slate-600">
                Please wait while MetalConnect prepares the RFQ detail page.
              </p>
            </div>
          </section>
        </main>
      }
    >
      <RFQDetailContent />
    </Suspense>
  );
}