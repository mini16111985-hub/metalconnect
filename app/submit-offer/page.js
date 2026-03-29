"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SubmitOfferPage() {
  const searchParams = useSearchParams();
  const rfqSlug = searchParams.get("rfq");

  const [form, setForm] = useState({
    company: "",
    email: "",
    quantity: "",
    pricePerUnit: "",
    materialCost: "",
    finishingCost: "",
    transportCost: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const parseMoney = (value) => {
    if (!value) return 0;
    const normalized = String(value).replace(",", ".").trim();
    const parsed = Number(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const total =
    Number(form.quantity || 0) * parseMoney(form.pricePerUnit) +
    parseMoney(form.materialCost) +
    parseMoney(form.finishingCost) +
    parseMoney(form.transportCost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { data: rfqData, error: rfqError } = await supabase
      .from("rfqs")
      .select("title, buyer_email, buyer_token")
      .eq("slug", rfqSlug)
      .single();

    if (rfqError || !rfqData) {
      console.error("Fetch RFQ error:", rfqError);
      setErrorMessage("RFQ not found.");
      return;
    }

    const { error: insertError } = await supabase.from("offers").insert([
      {
        rfq_slug: rfqSlug,
        company: form.company,
        email: form.email,
        quantity: form.quantity,
        price_per_unit: parseMoney(form.pricePerUnit),
        material_cost: parseMoney(form.materialCost),
        finishing_cost: parseMoney(form.finishingCost),
        transport_cost: parseMoney(form.transportCost),
        total: Number(total.toFixed(2)),
        message: form.message,
      },
    ]);

    if (insertError) {
      console.error("Insert offer error:", insertError);
      setErrorMessage(insertError.message);
      return;
    }

    const rfqTitle = rfqData.title || rfqSlug;
    const privateLink = `http://localhost:3000/buyer/rfq/${rfqSlug}/offers?token=${rfqData.buyer_token}`;

    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: rfqData.buyer_email,
        subject: `New offer for your RFQ – ${rfqTitle}`,
        text: `Hello,

You have received a new supplier offer through MetalConnect.

RFQ:
${rfqTitle}

Supplier:
${form.company}

Offer summary:
- Quantity: ${form.quantity} pcs
- Price per unit: ${parseMoney(form.pricePerUnit).toFixed(2)} €
- Material cost: ${parseMoney(form.materialCost).toFixed(2)} €
- Finishing cost: ${parseMoney(form.finishingCost).toFixed(2)} €
- Transport cost: ${parseMoney(form.transportCost).toFixed(2)} €
- Total: ${total.toFixed(2)} €

View and compare offers here:
${privateLink}

This is your private buyer link. Please do not share it publicly.

— MetalConnect`,
      }),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Offer sent ✅</h1>
          <p className="mt-3 text-slate-600">
            Your offer has been submitted successfully.
          </p>

          <a
            href="/rfq"
            className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to RFQs
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h1 className="text-3xl font-bold">Submit Offer</h1>

        <p className="mt-2 text-slate-600">
          RFQ: <span className="font-medium">{rfqSlug}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-sm font-medium">Company name</label>
            <input
              type="text"
              name="company"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
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
              <label className="text-sm">Material cost (€)</label>
              <input
                type="text"
                name="materialCost"
                placeholder="npr. 2,54"
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
              rows="4"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
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