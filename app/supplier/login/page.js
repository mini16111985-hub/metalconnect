"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "../../../lib/supabase-browser";

function SupplierLoginContent() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const searchParams = useSearchParams();

  const next = searchParams.get("next") || "/rfq";
  const error = searchParams.get("error");

  const [checkingSession, setCheckingSession] = useState(true);
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

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        window.location.href = next;
        return;
      }

      setCheckingSession(false);
    }

    checkSession();
  }, [supabase, next]);

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

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Supplier access
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Checking supplier session...
            </h1>
            <p className="mt-4 text-slate-600">
              Please wait while MetalConnect verifies your login state.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Supplier access
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Supplier login
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Enter your email and we will send you a secure magic link so you can
              continue to the supplier flow.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              After login you will continue to:{" "}
              <span className="font-medium text-slate-700">{next}</span>
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  placeholder="supplier@company.com"
                />
              </div>

              {message && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-900 px-5 py-3 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending link..." : "Send magic link"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SupplierLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Supplier access
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Loading supplier login...
              </h1>
              <p className="mt-4 text-slate-600">
                Please wait while MetalConnect prepares the login page.
              </p>
            </div>
          </section>
        </main>
      }
    >
      <SupplierLoginContent />
    </Suspense>
  );
}