"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SubmitRFQPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    country: "",
    service: "",
    material: "",
    quantity: "",
    deadline: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createSlug = () => {
    return `rfq-${Date.now()}`;
  };

  const createBuyerToken = () => {
    return `mc-private-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  const buildTitle = () => {
    const service = form.service || "Manufacturing";
    const material = form.material || "Project";
    return `${service} – ${material} RFQ`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    const slug = createSlug();
    const buyerToken = createBuyerToken();
    const title = buildTitle();

    let fileUrl = null;
    let fileName = null;

    if (file) {
      const safeFileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("rfq-files")
        .upload(safeFileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setUploadError(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("rfq-files")
        .getPublicUrl(safeFileName);

      fileUrl = publicUrlData.publicUrl;
      fileName = file.name;
    }

    const { error } = await supabase.from("rfqs").insert([
      {
        slug,
        title,
        company_name: form.companyName,
        contact_person: form.contactPerson,
        buyer_email: form.email,
        buyer_token: buyerToken,
        country: form.country,
        service: form.service,
        material: form.material,
        quantity: form.quantity,
        deadline: form.deadline,
        description: form.description,
        file_url: fileUrl,
        file_name: fileName,
        status: "Pending review",
      },
    ]);

    if (error) {
      console.error("Insert RFQ error:", error);
      setUploadError(error.message);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">RFQ submitted ✅</h1>
          <p className="mt-3 text-slate-600">
            Your request has been submitted successfully and is pending review.
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
          Buyer RFQ Form
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Create a new RFQ
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Submit your request for quotation and connect with suitable manufacturing partners.
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
              <label className="text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Requested service</label>
              <input
                type="text"
                name="service"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. CNC Milling"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Material</label>
              <input
                type="text"
                name="material"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. Aluminum"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="text"
                name="quantity"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. 150 pcs"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deadline</label>
              <input
                type="text"
                name="deadline"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. 30 days"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Project description</label>
            <textarea
              name="description"
              rows="6"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Describe the project, requirements, tolerances, finishing, delivery needs..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Attach drawing (PDF, STP, STEP, DXF)
            </label>

            <input
              type="file"
              accept=".pdf,.stp,.step,.dxf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          {uploadError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Error: {uploadError}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white font-medium"
          >
            Submit RFQ →
          </button>
        </form>
      </section>
    </main>
  );
}