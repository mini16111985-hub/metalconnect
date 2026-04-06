import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

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

    const supabase = getSupabaseAdmin();

    const { data: rfq, error: rfqError } = await supabase
      .from("rfqs")
      .select(
        "id, title, description, company_name, contact_person, quantity, material, country, deadline, file_name, file_url, file_path, status, buyer_token"
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

    let attachmentUrl = null;

    if (rfq.file_path) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from("rfq-files")
        .createSignedUrl(rfq.file_path, 60 * 60);

      if (signedError) {
        console.error("Buyer review signed URL error:", signedError);
      } else {
        attachmentUrl = signedData?.signedUrl || null;
      }
    }

    if (!attachmentUrl && rfq.file_url) {
      attachmentUrl = rfq.file_url;
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
      rfq: {
        ...rfq,
        attachment_url: attachmentUrl,
      },
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