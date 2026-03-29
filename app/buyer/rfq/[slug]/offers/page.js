"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

export default function BuyerRFQOffersPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug;
  const token = searchParams.get("token");

  const [sortBy, setSortBy] = useState("lowest");
  const [rfq, setRfq] = useState(null);
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rfqData, error: rfqError } = await supabase
        .from("rfqs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (rfqError || !rfqData) {
        console.error("Fetch RFQ error:", rfqError);
        setLoading(false);
        return;
      }

      setRfq(rfqData);

      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("*")
        .eq("rfq_slug", slug)
        .order("created_at", { ascending: false });

      if (offersError) {
        console.error("Fetch offers error:", offersError);
      } else {
        setAllOffers(offersData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  const bestPriceTotal = useMemo(() => {
    if (allOffers.length === 0) return null;
    return Math.min(...allOffers.map((offer) => Number(offer.total)));
  }, [allOffers]);

  const filteredOffers = useMemo(() => {
    const result = [...allOffers];

    if (sortBy === "lowest") {
      return result.sort((a, b) => Number(a.total) - Number(b.total));
    }

    if (sortBy === "highest") {
      return result.sort((a, b) => Number(b.total) - Number(a.total));
    }

    if (sortBy === "newest") {
      return result.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (sortBy === "oldest") {
      return result.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return result;
  }, [allOffers, sortBy]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h1 className="text-3xl font-bold">Loading offers...</h1>
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

  if (token !== rfq.buyer_token) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold">Private page</h1>
            <p className="mt-4 text-slate-600">
              You do not have permission to view these offers.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Buyer Private Offers
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Offers for {rfq.title || rfq.slug}
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Private buyer view for submitted supplier offers.
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

          {filteredOffers.map((offer) => {
            const isBestPrice = Number(offer.total) === bestPriceTotal;

            return (
              <article
                key={offer.id}
                className="rounded-3xl border bg-white p-8 shadow-sm"
              >
                {isBestPrice && (
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
                    {offer.price_per_unit} €
                  </div>

                  <div>
                    <span className="font-semibold">Material cost:</span>{" "}
                    {offer.material_cost} €
                  </div>

                  <div>
                    <span className="font-semibold">Finishing cost:</span>{" "}
                    {offer.finishing_cost} €
                  </div>

                  <div>
                    <span className="font-semibold">Transport cost:</span>{" "}
                    {offer.transport_cost} €
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
            );
          })}
        </div>
      </section>
    </main>
  );
}