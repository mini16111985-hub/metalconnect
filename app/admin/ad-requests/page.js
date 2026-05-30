import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminAdRequestsClient from "./AdminAdRequestsClient";

export default async function AdminAdRequestsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mc_admin_session")?.value;

  if (session !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminAdRequestsClient />;
}