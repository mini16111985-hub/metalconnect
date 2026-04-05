import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminCompaniesClient from "./AdminCompaniesClient";

export default async function AdminCompaniesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mc_admin_session")?.value;

  if (session !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminCompaniesClient />;
}