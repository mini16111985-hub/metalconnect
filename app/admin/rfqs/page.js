import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminRFQsClient from "./AdminRFQsClient";

export default async function AdminRFQsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mc_admin_session")?.value;

  if (session !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminRFQsClient />;
}