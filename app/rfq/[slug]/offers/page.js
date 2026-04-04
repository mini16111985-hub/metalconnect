"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

export default function RFQOffersPage() {
  const params = useParams();
  const slug = params.slug;

  const [sortBy, setSortBy] = useState("lowest");
  const [allOffers, setAllOffers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("offers") || "[]");
    setAllOffers(stored);
  }, []);

  const filteredOffers = useMemo(() => {
    const result = allOffers.filter((offer) => offer.rfq === slug);

    if (sortBy === "lowest") {
      return [...result].sort((a, b) => Number(a.total) - Number(b.total));
    }

    if (sortBy === "highest") {
      return [...result].sort((a, b) => Number(b.total) - Number(a.total));
    }

    if (sortBy === "newest") {
      return [...result].sort((a, b) => b.id - a.id);
    }

    if (sortBy === "oldest") {
      return [...result].sort((a, b) => a.id - b.id);
    }

    return result;
  }, [allOffers, slug, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          RFQ Offers
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Offers for {slug}
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Review submitted supplier offers for this RFQ.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Total offers:{" "}
            <span className="font-semibold">{filteredOffers.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sortBy"
              className="text-sm font-medium text-slate-700"
            >
              Sort by
            </label>

            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-500"
            >
              <option value="lowest">Lowest price</option>
              <option value="highest">Highest price</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {filteredOffers.length === 0 && (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-slate-600">No offers yet.</p>
            </div>
          )}

          {filteredOffers.map((offer, index) => (
            <article
              key={offer.id}
              className="rounded-3xl border bg-white p-8 shadow-sm"
            >
              {sortBy === "lowest" && index === 0 && (
                <div className="mb-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                  Best price
                </div>
              )}

              <h2 className="text-2xl font-semibold">{offer.company}</h2>

              <p className="mt-2 text-sm text-slate-500">{offer.email}</p>

              <div className="mt-6 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
                <div>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {offer.quantity} pcs
                </div>

                <div>
                  <span className="font-semibold">Price per unit:</span>{" "}
                  {offer.pricePerUnit} €
                </div>

                <div>
                  <span className="font-semibold">Material cost:</span>{" "}
                  {offer.materialCost} €
                </div>

                <div>
                  <span className="font-semibold">Finishing cost:</span>{" "}
                  {offer.finishingCost} €
                </div>

                <div>
                  <span className="font-semibold">Transport cost:</span>{" "}
                  {offer.transportCost} €
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-100 px-4 py-3 text-lg font-semibold">
                Total: {offer.total} €
              </div>

              {offer.message && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Message
                  </h3>

                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {offer.message}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={`/rfq-detail?slug=${encodeURIComponent(slug)}`}
            className="inline-block rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            Back to RFQ detail
          </a>
        </div>
      </section>
    </main>
  );
}