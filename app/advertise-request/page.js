"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdvertiseRequestPage() {
  const [form, setForm] = useState({
    packageName: "",
    companyName: "",
    contactName: "",
    email: "",
    website: "",
    preferredStart: "",
    campaignNote: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const packageOptions = [
    "Featured Directory",
    "Homepage Featured Slot",
    "Sponsored Banner",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.from("ad_requests").insert([
      {
        package_name: form.packageName,
        company_name: form.companyName,
        contact_name: form.contactName,
        email: form.email,
        website: form.website || null,
        preferred_start: form.preferredStart || null,
        campaign_note: form.campaignNote || null,
      },
    ]);

    if (error) {
      console.error("Ad request insert error:", error);
      setErrorMessage(error.message || "Failed to submit request.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Request received
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Advertising request submitted
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Thank you. We have received your advertising inquiry and will get
              back to you with availability and next steps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/advertise"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Back to advertising →
              </a>

              <a
                href="/contact"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Contact page
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div>
            <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Advertising request
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Request advertising on MetalConnect
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Tell us which package you are interested in and share a few basic
              details about your company and campaign. We will review your request
              and reply with next steps.
            </p>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Before you submit
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Choose the package that best fits your visibility goal
                </li>
                <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Add your company website if available
                </li>
                <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Briefly explain what you want to promote
                </li>
                <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  We review each request before confirming placement
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Request form
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-800">
                  Package
                </label>
                <select
                  name="packageName"
                  required
                  value={form.packageName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
                >
                  <option value="">Select a package</option>
                  {packageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Company name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={form.companyName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Contact person
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={form.contactName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Preferred start
                </label>
                <input
                  type="text"
                  name="preferredStart"
                  value={form.preferredStart}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="e.g. Next month / Mid June / Flexible"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Campaign note
                </label>
                <textarea
                  name="campaignNote"
                  rows="5"
                  value={form.campaignNote}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Tell us what you want to promote, who it is for, and any relevant placement notes..."
                />
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit advertising request →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}