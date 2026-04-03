import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function formatMoney(value) {
  const num = Number(value || 0);
  return `${num.toFixed(2)} €`;
}

function ErrorCard({ title, message }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-red-700">{title}</h1>
          <p className="mt-3 whitespace-pre-wrap text-slate-600">{message}</p>
        </div>
      </section>
    </main>
  );
}

export default async function BuyerRFQPage({ params, searchParams }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const resolvedSearchParams = await Promise.resolve(searchParams);

    const rawId = resolvedParams?.id;
    const rawToken = resolvedSearchParams?.token;

    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return (
        <ErrorCard
          title="Missing env"
          message="NEXT_PUBLIC_SUPABASE_URL is not set in Vercel."
        />
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return (
        <ErrorCard
          title="Missing env"
          message="SUPABASE_SERVICE_ROLE_KEY is not set in Vercel."
        />
      );
    }

    if (!id || !token) {
      return (
        <ErrorCard
          title="Invalid buyer link"
          message="This page requires a valid RFQ id and private buyer token."
        />
      );
    }

    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return (
        <ErrorCard
          title="Invalid RFQ id"
          message="The RFQ id in the buyer link is not valid."
        />
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: rfq, error: rfqError } = await supabase
      .from("rfqs")
      .select(
        "id, title, description, company_name, contact_person, quantity, material, country, deadline, file_url, status, buyer_token"
      )
      .eq("id", numericId)
      .eq("buyer_token", token)
      .single();

    if (rfqError || !rfq) {
      return (
        <ErrorCard
          title="Access denied"
          message={`This buyer link is invalid or expired.\n\n${rfqError?.message || ""}`}
        />
      );
    }

    const { data: offers, error: offersError } = await supabase
      .from("offers")
      .select(
        "id, company_name, contact_person, email, quantity, price_per_unit, finishing_cost, transport_cost, delivery_time, total, message, created_at"
      )
      .eq("rfq_id", numericId)
      .order("created_at", { ascending: true });

    if (offersError) {
      return (
        <ErrorCard
          title="Offers load failed"
          message={offersError.message}
        />
      );
    }

    const offerList = offers || [];

    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Buyer dashboard
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold md:text-4xl">{rfq.title}</h1>

            <p className="mt-3 max-w-3xl text-slate-600">
              Here you can review all supplier offers received for your RFQ.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Status
                </div>
                <div className="mt-2 font-semibold">{rfq.status || "—"}</div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Country
                </div>
                <div className="mt-2 font-semibold">{rfq.country || "—"}</div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Material
                </div>
                <div className="mt-2 font-semibold">{rfq.material || "—"}</div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Offers received
                </div>
                <div className="mt-2 font-semibold">{offerList.length}</div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">RFQ details</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-slate-500">Company</div>
                  <div className="font-medium">{rfq.company_name || "—"}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Contact person</div>
                  <div className="font-medium">{rfq.contact_person || "—"}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Quantity</div>
                  <div className="font-medium">{rfq.quantity || "—"}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Deadline</div>
                  <div className="font-medium">{rfq.deadline || "—"}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Attached file</div>
                  <div className="font-medium">
                    {rfq.file_url ? (
                      <a
                        href={rfq.file_url}
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
                  {rfq.description || "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold">Supplier offers</h2>

            {offerList.length === 0 ? (
              <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
                <p className="text-slate-600">
                  No offers have been submitted yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {offerList.map((offer, index) => (
                  <article
                    key={offer.id}
                    className="rounded-3xl border bg-white p-8 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Offer #{index + 1}
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold">
                          {offer.company_name || "Supplier"}
                        </h3>
                        <p className="mt-1 text-slate-600">
                          {offer.contact_person || "—"} • {offer.email || "—"}
                        </p>
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
                        <div className="mt-2 font-semibold">
                          {offer.quantity || "—"}
                        </div>
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
  } catch (error) {
    return (
      <ErrorCard
        title="Buyer page crashed"
        message={error?.message || "Unknown server error."}
      />
    );
  }
}