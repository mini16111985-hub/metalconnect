"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function formatMoney(value) {
  const num = Number(value || 0);
  return `${num.toFixed(2)} €`;
}

function getStatusBadgeClass(status) {
  if (status === "Accepted") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Rejected") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-yellow-200 bg-yellow-50 text-yellow-700";
}

function BuyerReviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [rfq, setRfq] = useState(null);
  const [offers, setOffers] = useState([]);

  const loadData = useCallback(async () => {
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
  }, [id, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOfferStatus = async (offerId, status) => {
    try {
      setActionLoadingId(offerId);
      setErrorMessage("");

      const response = await fetch("/api/buyer-review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
          offerId,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || "Failed to update offer status.");
        setActionLoadingId(null);
        return;
      }

      await loadData();
      setActionLoadingId(null);
    } catch (error) {
      setErrorMessage(error.message || "Unknown error.");
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Buyer dashboard
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Loading buyer dashboard...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect loads the RFQ and supplier offers.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (errorMessage && !rfq) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-6 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
            Access error
          </div>

          <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-red-700">
              Buyer dashboard unavailable
            </h1>
            <p className="mt-4 whitespace-pre-wrap text-slate-600">{errorMessage}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Buyer dashboard
        </div>

        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {rfq?.title || "Buyer review"}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Review supplier offers for this RFQ, compare pricing and delivery
              information, and choose the most suitable offer.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Review summary
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              You can accept one offer or reject offers directly from this private
              buyer view. Accepted and rejected statuses are visible here after update.
            </p>

            {rfq?.attachment_url && (
              <a
                href={rfq.attachment_url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Open attachment
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </div>
            <div className="mt-2 font-semibold text-slate-950">
              {rfq?.status || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Country
            </div>
            <div className="mt-2 font-semibold text-slate-950">
              {rfq?.country || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Material
            </div>
            <div className="mt-2 font-semibold text-slate-950">
              {rfq?.material || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Offers received
            </div>
            <div className="mt-2 font-semibold text-slate-950">
              {offers.length}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">RFQ details</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </div>
              <div className="mt-2 font-medium text-slate-900">
                {rfq?.company_name || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact person
              </div>
              <div className="mt-2 font-medium text-slate-900">
                {rfq?.contact_person || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quantity
              </div>
              <div className="mt-2 font-medium text-slate-900">
                {rfq?.quantity || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Deadline
              </div>
              <div className="mt-2 font-medium text-slate-900">
                {rfq?.deadline || "—"}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-slate-500">Description</div>
            <div className="mt-2 whitespace-pre-wrap rounded-2xl border border-blue-50 bg-slate-50 p-4 text-slate-600">
              {rfq?.description || "—"}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Error: {errorMessage}
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Supplier offers
          </h2>

          {offers.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <p className="text-slate-600">No offers have been submitted yet.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {offers.map((offer, index) => (
                <article
                  key={offer.id}
                  className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Offer #{index + 1}
                      </div>

                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                        {offer.company_name || "Supplier"}
                      </h3>

                      <div className="mt-3 space-y-1 text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-800">
                            Contact person:
                          </span>{" "}
                          {offer.contact_person || "—"}
                        </p>
                        <p>
                          <span className="font-medium text-slate-800">
                            Contact email:
                          </span>{" "}
                          {offer.email || "—"}
                        </p>
                      </div>

                      <div
                        className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusBadgeClass(
                          offer.status || "Pending"
                        )}`}
                      >
                        {offer.status || "Pending"}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-blue-900 px-5 py-4 text-white">
                      <div className="text-xs uppercase tracking-wide text-blue-100">
                        Total
                      </div>
                      <div className="mt-1 text-2xl font-semibold">
                        {formatMoney(offer.total)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-5">
                    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Quantity
                      </div>
                      <div className="mt-2 font-semibold text-slate-950">
                        {offer.quantity || "—"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Unit price
                      </div>
                      <div className="mt-2 font-semibold text-slate-950">
                        {formatMoney(offer.price_per_unit)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Finishing
                      </div>
                      <div className="mt-2 font-semibold text-slate-950">
                        {formatMoney(offer.finishing_cost)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Transport
                      </div>
                      <div className="mt-2 font-semibold text-slate-950">
                        {formatMoney(offer.transport_cost)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        Delivery
                      </div>
                      <div className="mt-2 font-semibold text-slate-950">
                        {offer.delivery_time || "—"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-500">Message</div>
                    <div className="mt-2 whitespace-pre-wrap rounded-2xl border border-blue-50 bg-slate-50 p-4 text-slate-600">
                      {offer.message || "—"}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleOfferStatus(offer.id, "Accepted")}
                      disabled={actionLoadingId === offer.id || offer.status === "Accepted"}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        offer.status === "Accepted"
                          ? "cursor-not-allowed bg-green-100 text-green-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {actionLoadingId === offer.id
                        ? "Updating..."
                        : offer.status === "Accepted"
                        ? "Accepted"
                        : "Accept"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOfferStatus(offer.id, "Rejected")}
                      disabled={actionLoadingId === offer.id || offer.status === "Rejected"}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        offer.status === "Rejected"
                          ? "cursor-not-allowed bg-red-100 text-red-700"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {actionLoadingId === offer.id
                        ? "Updating..."
                        : offer.status === "Rejected"
                        ? "Rejected"
                        : "Reject"}
                    </button>
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
          <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Buyer dashboard
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Loading buyer dashboard...
              </h1>
              <p className="mt-4 text-slate-600">
                Please wait while MetalConnect prepares the buyer review page.
              </p>
            </div>
          </section>
        </main>
      }
    >
      <BuyerReviewContent />
    </Suspense>
  );
}