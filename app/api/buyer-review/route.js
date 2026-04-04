import { createClient } from "@supabase/supabase-js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    const token = searchParams.get("token");

    if (!Number.isInteger(id) || id <= 0 || !token) {
      return Response.json(
        { success: false, error: "Invalid buyer link." },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return Response.json(
        { success: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL." },
        { status: 500 }
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return Response.json(
        { success: false, error: "Missing SUPABASE_SERVICE_ROLE_KEY." },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: rfq, error: rfqError } = await supabase
      .from("rfqs")
      .select(
        "id, title, description, company_name, contact_person, quantity, material, country, deadline, file_url, status, buyer_token"
      )
      .eq("id", id)
      .eq("buyer_token", token)
      .single();

    if (rfqError || !rfq) {
      return Response.json(
        { success: false, error: "This buyer link is invalid or expired." },
        { status: 404 }
      );
    }

    const { data: offers, error: offersError } = await supabase
      .from("offers")
      .select(
        "id, company_name, contact_person, email, quantity, price_per_unit, finishing_cost, transport_cost, delivery_time, total, message, created_at"
      )
      .eq("rfq_id", id)
      .order("created_at", { ascending: true });

    if (offersError) {
      return Response.json(
        { success: false, error: offersError.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      rfq,
      offers: offers || [],
    });
  } catch (error) {
    console.error("Buyer review API error:", error);
    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}