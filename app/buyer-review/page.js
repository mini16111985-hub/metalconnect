"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function formatMoney(value) {
  const num = Number(value || 0);
  return `${num.toFixed(2)} €`;
}

function BuyerReviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rfq, setRfq] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        if (!id || !token) {
          setErrorMessage("Missing RFQ id or token.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `/api/buyer-review?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
          setErrorMessage(result.error || "Failed to load buyer review.");
          setLoading(false);
          return;
        }

        setRfq(result.rfq);
        setOffers(result.offers || []);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message || "Unknown error.");
        setLoading(false);
      }
    }

    loadData();
  }, [id, token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold">Loading buyer dashboard...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-red-700">Access error</h1>
            <p className="mt-3 whitespace-pre-wrap text-slate-600">{errorMessage}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Buyer dashboard
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold md:text-4xl">{rfq?.title}</h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Here you can review all supplier offers received for your RFQ.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Status</div>
              <div className="mt-2 font-semibold">{rfq?.status || "—"}</div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Country</div>
              <div className="mt-2 font-semibold">{rfq?.country || "—"}</div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Material</div>
              <div className="mt-2 font-semibold">{rfq?.material || "—"}</div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Offers received</div>
              <div className="mt-2 font-semibold">{offers.length}</div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">RFQ details</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-slate-500">Company</div>
                <div className="font-medium">{rfq?.company_name || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Contact person</div>
                <div className="font-medium">{rfq?.contact_person || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Quantity</div>
                <div className="font-medium">{rfq?.quantity || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Deadline</div>
                <div className="font-medium">{rfq?.deadline || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Attached file</div>
                <div className="font-medium">
                  {rfq?.attachment_url ? (
                    <a
                      href={rfq.attachment_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open attachment
                    </a>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-500">Description</div>
              <div className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4">
                {rfq?.description || "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Supplier offers</h2>

          {offers.length === 0 ? (
            <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-slate-600">No offers have been submitted yet.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {offers.map((offer, index) => (
                <article
                  key={offer.id}
                  className="rounded-3xl border bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Offer #{index + 1}
                      </div>

                      <h3 className="mt-2 text-2xl font-semibold">
                        {offer.company_name || "Supplier"}
                      </h3>

                      <div className="mt-3 space-y-1 text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-800">Contact person:</span>{" "}
                          {offer.contact_person || "—"}
                        </p>
                        <p>
                          <span className="font-medium text-slate-800">Contact email:</span>{" "}
                          {offer.email || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                      <div className="text-xs uppercase tracking-wide text-slate-300">
                        Total
                      </div>
                      <div className="mt-1 text-xl font-semibold">
                        {formatMoney(offer.total)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-5">
                    <div className="rounded-2xl border p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Quantity
                      </div>
                      <div className="mt-2 font-semibold">{offer.quantity || "—"}</div>
                    </div>

                    <div className="rounded-2xl border p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Unit price
                      </div>
                      <div className="mt-2 font-semibold">
                        {formatMoney(offer.price_per_unit)}
                      </div>
                    </div>

                    <div className="rounded-2xl border p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Finishing
                      </div>
                      <div className="mt-2 font-semibold">
                        {formatMoney(offer.finishing_cost)}
                      </div>
                    </div>

                    <div className="rounded-2xl border p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Transport
                      </div>
                      <div className="mt-2 font-semibold">
                        {formatMoney(offer.transport_cost)}
                      </div>
                    </div>

                    <div className="rounded-2xl border p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Delivery
                      </div>
                      <div className="mt-2 font-semibold">
                        {offer.delivery_time || "—"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-slate-500">Message</div>
                    <div className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4">
                      {offer.message || "—"}
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-slate-500">
                    Submitted:{" "}
                    {offer.created_at
                      ? new Date(offer.created_at).toLocaleString("hr-HR")
                      : "—"}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function BuyerReviewPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h1 className="text-2xl font-semibold">Loading buyer dashboard...</h1>
            </div>
          </section>
        </main>
      }
    >
      <BuyerReviewContent />
    </Suspense>
  );
} 