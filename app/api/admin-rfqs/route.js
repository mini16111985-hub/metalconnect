import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mc_admin_session")?.value;
  return session === "authenticated";
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function GET() {
  try {
    const authorized = await isAuthorized();

    if (!authorized) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("rfqs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin RFQs fetch error:", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true, rfqs: data || [] });
  } catch (error) {
    console.error("GET /api/admin-rfqs error:", error);
    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const authorized = await isAuthorized();

    if (!authorized) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return Response.json(
        { success: false, error: "Missing id or status." },
        { status: 400 }
      );
    }

    const allowedStatuses = ["Pending review", "Approved", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { success: false, error: "Invalid status." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("rfqs")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Admin RFQ update error:", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/admin-rfqs error:", error);
    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}