"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RFQPage() {
  const [allRfqs, setAllRfqs] = useState([]);
  const [offersCountMap, setOffersCountMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfqsAndOffers = async () => {
      const { data: rfqData, error: rfqError } = await supabase
        .from("rfqs")
        .select("*")
        .eq("status", "Approved")
        .order("created_at", { ascending: false });

      if (rfqError) {
        console.error("Fetch RFQs error:", rfqError);
        setLoading(false);
        return;
      }

      setAllRfqs(rfqData || []);

      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("rfq_slug");

      if (offersError) {
        console.error("Fetch offers error:", offersError);
      } else {
        const countMap = {};

        for (const offer of offersData || []) {
          countMap[offer.rfq_slug] = (countMap[offer.rfq_slug] || 0) + 1;
        }

        setOffersCountMap(countMap);
      }

      setLoading(false);
    };

    fetchRfqsAndOffers();
  }, []);

  const getRfqTitle = (rfq) => {
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
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            RFQ Board
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Loading RFQs...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect loads approved buyer requests.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          RFQ Board
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Open Requests for Quotation
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Browse active buyer requests and discover new manufacturing
              opportunities from approved RFQs on MetalConnect.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              For buyers
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Need quotations from Croatian manufacturers? Submit your RFQ with
              drawings and project details, and let MetalConnect handle the flow.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Submit RFQ →
              </a>

              <a
                href="/buyers"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Buyer flow
              </a>
            </div>
          </div>
        </div>

        {allRfqs.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              No RFQs available yet
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              There are currently no approved RFQs on the board. Buyers can
              submit a new request and our team will review it before publishing.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Submit RFQ →
              </a>

              <a
                href="/buyers"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Learn more for buyers
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {allRfqs.map((rfq) => (
              <article
                key={rfq.slug}
                className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-green-700">
                    {rfq.status}
                  </div>

                  <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900">
                    Offers received: {offersCountMap[rfq.slug] || 0}
                  </div>
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                  {getRfqTitle(rfq)}
                </h2>

                <div className="mt-2 text-sm text-slate-500">
                  {rfq.country || "—"}
                </div>

                <div className="mt-6 grid gap-2 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold">Service:</span>{" "}
                    {rfq.service || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Material:</span>{" "}
                    {rfq.material || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {rfq.quantity || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Deadline:</span>{" "}
                    {rfq.deadline || "—"}
                  </div>
                </div>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  {rfq.description || "No description available."}
                </p>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <a
                    href={`/rfq-detail?slug=${encodeURIComponent(rfq.slug)}`}
                    className="rounded-2xl bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                  >
                    View details
                  </a>

                  <a
                    href={`/submit-offer?rfq=${encodeURIComponent(rfq.slug)}`}
                    className="text-sm font-medium text-blue-900"
                  >
                    Submit offer →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}