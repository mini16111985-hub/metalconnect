"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

function SubmitOfferForm() {
  const searchParams = useSearchParams();
  const rfqSlug = searchParams.get("rfq");

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [authChecked, setAuthChecked] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    quantity: "",
    pricePerUnit: "",
    finishingCost: "",
    transportCost: "",
    deliveryTime: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100";
  const labelClassName = "text-sm font-semibold text-slate-800";

  useEffect(() => {
    async function loadSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const nextUrl = `/submit-offer${rfqSlug ? `?rfq=${encodeURIComponent(rfqSlug)}` : ""}`;
        window.location.href = `/supplier/login?next=${encodeURIComponent(nextUrl)}`;
        return;
      }

      setAuthUser(user);
      setForm((prev) => ({
        ...prev,
        email: user.email || "",
      }));
      setAuthChecked(true);
    }

    loadSession();
  }, [supabase, rfqSlug]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const parseMoney = (value) => {
    if (!value) return 0;
    const normalized = String(value).replace(",", ".").trim();
    const parsed = Number(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const total =
    Number(form.quantity || 0) * parseMoney(form.pricePerUnit) +
    parseMoney(form.finishingCost) +
    parseMoney(form.transportCost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    if (!rfqSlug) {
      setErrorMessage("Missing RFQ.");
      setIsSubmitting(false);
      return;
    }

    if (!authUser) {
      setErrorMessage("Supplier session not found.");
      setIsSubmitting(false);
      return;
    }

    const { data: rfqData, error: rfqError } = await supabase
      .from("rfqs")
      .select("id, slug, title, buyer_email, buyer_token")
      .eq("slug", rfqSlug)
      .single();

    if (rfqError || !rfqData) {
      console.error("Fetch RFQ error:", rfqError);
      setErrorMessage("RFQ not found.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("offers").insert([
      {
        rfq_id: Number(rfqData.id),
        rfq_slug: rfqData.slug,
        supplier_user_id: authUser.id,
        company_name: form.companyName,
        contact_person: form.contactPerson,
        email: authUser.email || form.email,
        quantity: form.quantity,
        price_per_unit: parseMoney(form.pricePerUnit),
        finishing_cost: parseMoney(form.finishingCost),
        transport_cost: parseMoney(form.transportCost),
        delivery_time: form.deliveryTime,
        total: Number(total.toFixed(2)),
        message: form.message,
      },
    ]);

    if (insertError) {
      console.error("Insert offer error:", insertError);
      setErrorMessage(insertError.message);
      setIsSubmitting(false);
      return;
    }

    const buyerLink = `https://metalconnect-gamma.vercel.app/buyer-review?id=${rfqData.id}&token=${encodeURIComponent(rfqData.buyer_token)}`;

    const emailResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: rfqData.buyer_email,
        subject: `New offer received – ${rfqData.title}`,
        text: `Hello,

You have received a new supplier offer through MetalConnect.

RFQ:
${rfqData.title}

Supplier:
${form.companyName}

Contact person:
${form.contactPerson}

Supplier email:
${authUser.email || form.email}

Quantity:
${form.quantity}

Price per unit:
${parseMoney(form.pricePerUnit).toFixed(2)} €

Finishing cost:
${parseMoney(form.finishingCost).toFixed(2)} €

Transport cost:
${parseMoney(form.transportCost).toFixed(2)} €

Delivery time:
${form.deliveryTime}

Total:
${total.toFixed(2)} €

Message:
${form.message}

Buyer review link:
${buyerLink}

— MetalConnect`,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok || !emailResult.success) {
      console.error("Send email error:", emailResult);
      setErrorMessage("Offer saved, but email notification failed.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleLogout = async () => {
    await fetch("/api/supplier-logout", {
      method: "POST",
    });

    window.location.href = "/supplier/login";
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Supplier Offer Form
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Checking supplier session...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect verifies your supplier login.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto flex max-w-3xl px-6 py-20 md:py-28">
          <div className="w-full rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              Offer submitted
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Your offer was sent successfully
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Your quotation has been submitted through MetalConnect and the buyer
              has been notified by email.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Back to RFQ board
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Supplier Offer Form
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Submit an offer
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Respond to this RFQ with your pricing, delivery time, and message
              through MetalConnect.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Supplier session
            </div>

            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">Logged in as:</span>{" "}
                {authUser?.email || "—"}
              </div>

              <div>
                <span className="font-semibold text-slate-800">RFQ slug:</span>{" "}
                {rfqSlug || "Missing"}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/rfq"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Back to RFQs
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Supplier details
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClassName}>Company name</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Contact person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={authUser?.email || form.email}
                      readOnly
                      className={`${inputClassName} bg-slate-50`}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Delivery time</label>
                    <input
                      type="text"
                      name="deliveryTime"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. 21 days"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Message to buyer
                </h2>

                <div className="mt-6">
                  <label className={labelClassName}>Message</label>
                  <textarea
                    name="message"
                    rows="7"
                    required
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Add any notes, assumptions, delivery details, production remarks, or commercial comments..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Pricing breakdown
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className={labelClassName}>Quantity (pcs)</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. 150"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Price per unit (€)</label>
                    <input
                      type="text"
                      name="pricePerUnit"
                      placeholder="e.g. 1.75"
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Finishing cost (€)</label>
                    <input
                      type="text"
                      name="finishingCost"
                      placeholder="e.g. 80.00"
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Transport cost (€)</label>
                    <input
                      type="text"
                      name="transportCost"
                      placeholder="e.g. 125.00"
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4">
                    <div className="text-sm font-medium uppercase tracking-wide text-blue-800">
                      Total
                    </div>
                    <div className="mt-2 text-2xl font-bold text-slate-950">
                      {total.toFixed(2)} €
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Before you submit
                </h2>

                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• use clear pricing and realistic delivery terms</li>
                  <li>• check quantity and total before sending</li>
                  <li>• include relevant notes in your message</li>
                  <li>• the buyer will be notified by email</li>
                </ul>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Error: {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-blue-900 px-5 py-4 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting offer..." : "Submit offer →"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default function SubmitOfferPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Supplier Offer Form
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Loading offer form...
              </h1>
              <p className="mt-4 text-slate-600">
                Please wait while MetalConnect prepares the supplier form.
              </p>
            </div>
          </section>
        </main>
      }
    >
      <SubmitOfferForm />
    </Suspense>
  );
}