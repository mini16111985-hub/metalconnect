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

    if (!rfqSlug) {
      setErrorMessage("Missing RFQ.");
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
      return;
    }

    const { error: insertError } = await supabase.from("offers").insert([
      {
        rfq_id: Number(rfqData.id),
        rfq_slug: rfqData.slug,
        company_name: form.companyName,
        contact_person: form.contactPerson,
        email: form.email,
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
${form.email}

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
      return;
    }

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
          <h1 className="text-3xl font-bold">Checking supplier session...</h1>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Offer submitted ✅</h1>
          <p className="mt-3 text-slate-600">
            Your offer has been submitted successfully.
          </p>

          <a
            href="/rfq"
            className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to RFQ board
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Supplier Offer Form
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Submit an offer
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Respond to this RFQ with your pricing, delivery time, and message.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <p>
            Logged in as: <span className="font-medium">{authUser?.email || "—"}</span>
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          RFQ: <span className="font-medium">{rfqSlug || "Missing"}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company name</label>
              <input
                type="text"
                name="companyName"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact person</label>
              <input
                type="text"
                name="contactPerson"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                readOnly
                className="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Delivery time</label>
              <input
                type="text"
                name="deliveryTime"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. 21 days"
              />
            </div>
          </div>

          <div className="rounded-2xl border p-6 space-y-4">
            <h2 className="font-semibold">Pricing breakdown</h2>

            <div>
              <label className="text-sm">Quantity (pcs)</label>
              <input
                type="number"
                name="quantity"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Price per unit (€)</label>
              <input
                type="text"
                name="pricePerUnit"
                placeholder="npr. 1,75"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Finishing cost (€)</label>
              <input
                type="text"
                name="finishingCost"
                placeholder="npr. 0,80"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Transport cost (€)</label>
              <input
                type="text"
                name="transportCost"
                placeholder="npr. 125,00"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-2"
              />
            </div>

            <div className="pt-2 border-t">
              <span className="font-semibold text-lg">
                Total: {total.toFixed(2)} €
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="6"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Add any notes, assumptions, or delivery details..."
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Error: {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white font-medium"
          >
            Submit offer →
          </button>
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
            <h1 className="text-3xl font-bold">Loading offer form...</h1>
          </section>
        </main>
      }
    >
      <SubmitOfferForm />
    </Suspense>
  );
}