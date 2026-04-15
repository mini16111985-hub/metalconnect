"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SubmitCompanyPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    email: "",
    country: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100";
  const labelClassName = "text-sm font-semibold text-slate-800";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setLogoFile(file);
  };

  const slugify = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    let logoUrl = null;
    const companySlug = slugify(form.name);

    if (logoFile) {
      const fileExt = logoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${companySlug}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("company-logos")
        .upload(fileName, logoFile);

      if (uploadError) {
        console.error(uploadError);
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("company-logos")
        .getPublicUrl(fileName);

      logoUrl = publicUrlData?.publicUrl || null;
    }

    const { error: insertError } = await supabase.from("companies_pending").insert([
      {
        name: form.name,
        slug: companySlug,
        description: form.description,
        website: form.website,
        email: form.email,
        country: form.country,
        logo_url: logoUrl,
        status: "Pending review",
      },
    ]);

    if (insertError) {
      console.error(insertError);
      setError(insertError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
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
              Company profile submitted
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Your company will be reviewed before being published in the
              MetalConnect supplier directory.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Logo, machine photos, and gallery images can be expanded later if needed.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/companies"
                className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Back to directory
              </a>

              <a
                href="/manufacturers"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
              >
                For manufacturers
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
          Company Submission
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Add your company
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Submit your company profile to be listed in the MetalConnect
              supplier directory and become visible to European buyers.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Before you submit
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>• use your official company name</li>
              <li>• add a short and clear business description</li>
              <li>• include your website and business email</li>
              <li>• logo upload is optional</li>
            </ul>

            <a
              href="/manufacturers"
              className="mt-5 inline-block rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
            >
              Learn more for manufacturers
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Company details
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className={labelClassName}>Company name</label>
                    <input
                      name="name"
                      required
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Website</label>
                    <input
                      name="website"
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Business email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="info@yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Country</label>
                    <input
                      name="country"
                      onChange={handleChange}
                      className={inputClassName}
                      placeholder="Croatia"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelClassName}>Description</label>
                  <textarea
                    name="description"
                    rows="7"
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="What do you manufacture? Machines, materials, certifications, capabilities..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Company logo
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Logo upload is optional. Additional machine photos, gallery images,
                  and visual materials can be expanded later.
                </p>

                <div className="mt-6">
                  <label className={labelClassName}>Upload logo (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`${inputClassName} file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-900 hover:file:bg-blue-100`}
                  />

                  {logoFile && (
                    <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
                      Selected file: <span className="font-medium">{logoFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  What happens next?
                </h2>

                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li>1. Your company profile is submitted to MetalConnect.</li>
                  <li>2. The submission is reviewed before publication.</li>
                  <li>3. Approved companies appear in the public directory.</li>
                  <li>4. Buyers can discover your profile through the platform.</li>
                </ol>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Error: {error}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-2xl bg-blue-900 px-5 py-4 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Submitting company..." : "Submit company →"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}