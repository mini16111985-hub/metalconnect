"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

function SubmitOfferForm() {
  const searchParams = useSearchParams();
  const rfqId = searchParams.get("rfqId");

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    price: "",
    deliveryTime: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!rfqId) {
      setErrorMessage("Missing RFQ ID.");
      return;
    }

    const { data: rfqData, error: rfqError } = await supabase
      .from("rfqs")
      .select("id, title, buyer_email, buyer_token")
      .eq("id", rfqId)
      .single();

    if (rfqError || !rfqData) {
      console.error("Fetch RFQ error:", rfqError);
      setErrorMessage("RFQ not found.");
      return;
    }

    const { error: insertError } = await supabase.from("offers").insert([
      {
        rfq_id: rfqData.id,
        company_name: form.companyName,
        contact_person: form.contactPerson,
        email: form.email,
        price: form.price,
        delivery_time: form.deliveryTime,
        message: form.message,
      },
    ]);

    if (insertError) {
      console.error("Insert offer error:", insertError);
      setErrorMessage(insertError.message);
      return;
    }

    const buyerLink = `https://metalconnect-dz31hiny4-nikolas-projects-7ba7ab27.vercel.app/buyer/rfq/${rfqData.id}?token=${rfqData.buyer_token}`;

    await fetch("/api/send-rfq-email", {
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

Price:
${form.price}

Delivery time:
${form.deliveryTime}

Message:
${form.message}

Buyer review link:
${buyerLink}

— MetalConnect`,
      }),
    });

    setSubmitted(true);
  };

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

        <p className="mt-3 text-sm text-slate-500">
          RFQ ID: <span className="font-medium">{rfqId || "Missing"}</span>
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
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="text"
                name="price"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. 2.450 EUR"
              />
            </div>
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