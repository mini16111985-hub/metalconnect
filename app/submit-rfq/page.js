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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100";
  const labelClassName = "text-sm font-semibold text-slate-800";

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
    setIsSubmitting(true);

    const slug = createSlug();
    const buyerToken = createBuyerToken();
    const title = buildTitle();

    let fileUrl = null;
    let fileName = null;
    let filePath = null;

    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
      const baseName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const safeFileName = `rfq/${Date.now()}-${baseName || "file"}.${extension}`;

      const fileBuffer = await file.arrayBuffer();
      const fileBlob = new Blob([fileBuffer], {
        type: file.type || "application/octet-stream",
      });

      const { error: uploadError } = await supabase.storage
        .from("rfq-files")
        .upload(safeFileName, fileBlob, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || "application/octet-stream",
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setUploadError(uploadError.message || "File upload failed.");
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("rfq-files")
        .getPublicUrl(safeFileName);

      fileUrl = publicUrlData?.publicUrl || null;
      fileName = file.name;
      filePath = safeFileName;
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
        file_path: filePath,
        status: "Pending review",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Insert RFQ error:", error);
      setUploadError(error.message);
      setIsSubmitting(false);
      return;
    }

    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: form.email,
        subject: `RFQ received – ${title}`,
        text: `Hello,

Your RFQ has been submitted successfully through MetalConnect.

RFQ:
${title}

Status:
Pending review

We will notify you when your request is reviewed or when new offers arrive.

— MetalConnect`,
      }),
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto flex max-w-3xl px-6 py-20 md:py-28">
          <div className="w-full rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              Submission received
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              RFQ submitted successfully
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Your request has been submitted and is currently pending review.
              Once approved, it can become visible to relevant suppliers on MetalConnect.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/rfq"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Back to RFQ board
              </a>

              <a
                href="/buyers"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                Buyer flow
              </a>
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
          Buyer RFQ Form
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Create a new RFQ
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Submit your request for quotation and connect with suitable
              manufacturing partners through MetalConnect.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Before you submit
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>• include clear service and material information</li>
              <li>• describe quantity and delivery expectations</li>
              <li>• attach a drawing if available</li>
              <li>• use a valid business email for updates</li>
            </ul>

            <a
              href="/buyers"
              className="mt-5 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
            >
              Learn more for buyers
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Buyer details
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
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="name@company.com"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Country</label>
                    <input
                      type="text"
                      name="country"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. Germany"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Project details
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClassName}>Requested service</label>
                    <input
                      type="text"
                      name="service"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. CNC milling"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Material</label>
                    <input
                      type="text"
                      name="material"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. Aluminium"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. 150 pcs"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Deadline</label>
                    <input
                      type="text"
                      name="deadline"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="e.g. 30 days"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelClassName}>Project description</label>
                  <textarea
                    name="description"
                    rows="7"
                    required
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Describe the project, requirements, tolerances, finishing, delivery needs..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Attachment
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Upload a drawing or technical file if available. Supported
                  formats: PDF, STP, STEP, DXF.
                </p>

                <div className="mt-6">
                  <label className={labelClassName}>
                    Attach drawing (optional)
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.stp,.step,.dxf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className={`${inputClassName} file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-900 hover:file:bg-blue-100`}
                  />

                  {file && (
                    <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
                      Selected file: <span className="font-medium">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  What happens next?
                </h2>

                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li>1. Your RFQ is submitted to MetalConnect.</li>
                  <li>2. The request is reviewed before publication.</li>
                  <li>3. Approved RFQs become visible to suppliers.</li>
                  <li>4. You receive updates by email when new offers arrive.</li>
                </ol>
              </div>

              {uploadError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Error: {uploadError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-blue-900 px-5 py-4 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting RFQ..." : "Submit RFQ →"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}