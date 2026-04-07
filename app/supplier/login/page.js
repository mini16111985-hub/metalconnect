"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "../../../lib/supabase-browser";

export default function SupplierLoginPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const searchParams = useSearchParams();

  const next = searchParams.get("next") || "/rfq";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    error === "missing_code"
      ? "Login link is missing required data."
      : error === "auth_callback_failed"
      ? "Magic link login failed. Please try again."
      : ""
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setErrorMessage(error.message || "Magic link login failed.");
        setLoading(false);
        return;
      }

      setMessage("Magic link sent. Check your email.");
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message || "Unknown error.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-md px-6 py-16 md:py-24">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Supplier access
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Supplier login</h1>

          <p className="mt-3 text-slate-600">
            Enter your email and we will send you a secure magic link.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            After login you will continue to:{" "}
            <span className="font-medium">{next}</span>
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
                placeholder="supplier@company.com"
              />
            </div>

            {message && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white"
            >
              {loading ? "Sending link..." : "Send magic link"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}