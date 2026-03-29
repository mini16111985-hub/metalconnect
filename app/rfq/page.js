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
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h1 className="text-3xl font-bold">Loading RFQs...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          RFQ Board
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Open Requests for Quotation
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          Browse active buyer requests and discover new manufacturing opportunities.
        </p>

        {allRfqs.length === 0 ? (
          <div className="mt-12 rounded-3xl border bg-white p-10 shadow-sm text-center">
            <h2 className="text-2xl font-semibold">No RFQs available yet</h2>

            <p className="mt-4 mx-auto max-w-2xl text-base leading-7 text-slate-600">
              There are currently no approved RFQs on the board. Buyers can submit a
              new request and our team will review it before publishing.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/submit-rfq"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Submit RFQ →
              </a>

              <a
                href="/buyers"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
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
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-green-700">
                  {rfq.status}
                </div>

                <h2 className="text-2xl font-semibold">
                  {getRfqTitle(rfq)}
                </h2>

                <div className="mt-2 text-sm text-slate-500">{rfq.country}</div>

                <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  Offers received: {offersCountMap[rfq.slug] || 0}
                </div>

                <div className="mt-6 space-y-2 text-sm text-slate-700">
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
                </div>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  {rfq.description}
                </p>

                {rfq.file_url && (
                  <a
                    href={rfq.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    📎 Download drawing
                  </a>
                )}

                <a
                  href={`/rfq/${rfq.slug}`}
                  className="mt-8 inline-block rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                >
                  View details
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}