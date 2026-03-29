import AdminRFQsClient from "./AdminRFQsClient";

export default async function AdminRFQsPage({ searchParams }) {
  const params = await searchParams;
  const key = params?.key;

  if (key !== process.env.ADMIN_ACCESS_KEY) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold">Access denied</h1>
            <p className="mt-4 text-slate-600">
              This admin page is protected.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return <AdminRFQsClient />;
}