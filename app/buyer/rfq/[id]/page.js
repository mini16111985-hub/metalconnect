export const dynamic = "force-dynamic";

export default async function BuyerRFQPage({ params, searchParams }) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const rawId = resolvedParams?.id;
  const rawToken = resolvedSearchParams?.token;

  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  return (
    <main className="min-h-screen bg-white text-black p-10">
      <h1 className="text-3xl font-bold">Buyer route works ✅</h1>

      <div className="mt-6 space-y-3">
        <p>
          <strong>ID:</strong> {id || "missing"}
        </p>
        <p>
          <strong>Token:</strong> {token || "missing"}
        </p>
      </div>
    </main>
  );
}