import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

async function checkAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mc_admin_session")?.value;
  return session === "authenticated";
}

export async function GET() {
  const isAdmin = await checkAdminSession();

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const supabase = getAdminSupabase();

    const { data, error } = await supabase
      .from("ad_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, requests: data || [] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const isAdmin = await checkAdminSession();

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status." },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "new",
      "contacted",
      "paid",
      "active",
      "expired",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status." },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    const { error } = await supabase
      .from("ad_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error." },
      { status: 500 }
    );
  }
}