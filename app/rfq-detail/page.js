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
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h1 className="text-3xl font-bold">Loading RFQ...</h1>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-red-700">RFQ error</h1>
            <p className="mt-3 text-slate-600">{errorMessage}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!rfq) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h1 className="text-3xl font-bold">RFQ not found</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          RFQ Detail
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {getRfqTitle(rfq)}
        </h1>

        <p className="mt-3 text-lg text-slate-600">{rfq.country}</p>

        <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
          Offers received: {offerCount}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Project Details</h2>

            <div className="mt-4 space-y-2 text-base text-slate-700">
              <div>
                <span className="font-semibold">Service:</span> {rfq.service}
              </div>
              <div>
                <span className="font-semibold">Material:</span> {rfq.material}
              </div>
              <div>
                <span className="font-semibold">Quantity:</span> {rfq.quantity}
              </div>
              <div>
                <span className="font-semibold">Deadline:</span> {rfq.deadline}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {rfq.status}
              </div>

              {rfq.company_name && (
                <div>
                  <span className="font-semibold">Company:</span> {rfq.company_name}
                </div>
              )}

              {rfq.contact_person && (
                <div>
                  <span className="font-semibold">Contact person:</span> {rfq.contact_person}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Description</h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {rfq.description}
            </p>

            {rfq.attachment_url && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Attachment
                </h3>

                <a
                  href={rfq.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-100"
                >
                  📎 Download drawing
                </a>

                {rfq.file_name && (
                  <p className="mt-2 text-sm text-slate-500">
                    File: {rfq.file_name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/rfq"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            Back to RFQ list
          </a>

          <a
            href={`/submit-offer?rfq=${encodeURIComponent(rfq.slug)}`}
            className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
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
          <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <h1 className="text-3xl font-bold">Loading RFQ...</h1>
          </section>
        </main>
      }
    >
      <RFQDetailContent />
    </Suspense>
  );
}