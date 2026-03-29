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
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md rounded-3xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Request submitted ✅</h1>
          <p className="mt-3 text-slate-600">
            Your company will be reviewed before being published in the directory.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Logo, machine photos, and gallery images can be expanded later if needed.
          </p>

          <a
            href="/manufacturers"
            className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to manufacturers
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Company Submission
        </div>

        <h1 className="text-3xl font-bold">Add your company</h1>

        <p className="mt-3 text-slate-600">
          Submit your company profile to be listed in the MetalConnect supplier directory.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
          <strong className="text-slate-900">Note:</strong> Logo upload is optional.
          Additional machine photos, gallery images, and visual materials can be added later.
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-sm font-medium">Company name</label>
            <input
              name="name"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Website</label>
            <input
              name="website"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="https://yourcompany.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="info@yourcompany.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Country</label>
            <input
              name="country"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Croatia"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Company logo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows="5"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="What do you manufacture? Machines, materials, certifications, capabilities..."
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Error: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            {uploading ? "Submitting..." : "Submit company →"}
          </button>
        </form>
      </section>
    </main>
  );
}