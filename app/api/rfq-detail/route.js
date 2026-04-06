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
    const slug = searchParams.get("slug");

    if (!slug) {
      return Response.json(
        { success: false, error: "Missing RFQ slug." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: rfq, error: rfqError } = await supabase
      .from("rfqs")
      .select(`
        id,
        slug,
        title,
        description,
        company_name,
        contact_person,
        quantity,
        material,
        country,
        deadline,
        service,
        status,
        file_name,
        file_url,
        file_path
      `)
      .eq("slug", slug)
      .eq("status", "Approved")
      .single();

    if (rfqError || !rfq) {
      return Response.json(
        { success: false, error: "RFQ not found." },
        { status: 404 }
      );
    }

    let attachmentUrl = null;

    if (rfq.file_path) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from("rfq-files")
        .createSignedUrl(rfq.file_path, 60 * 60);

      if (signedError) {
        console.error("RFQ detail signed URL error:", signedError);
      } else {
        attachmentUrl = signedData?.signedUrl || null;
      }
    }

    if (!attachmentUrl && rfq.file_url) {
      attachmentUrl = rfq.file_url;
    }

    const { count, error: offersError } = await supabase
      .from("offers")
      .select("*", { count: "exact", head: true })
      .eq("rfq_slug", slug);

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
      offerCount: count || 0,
    });
  } catch (error) {
    console.error("RFQ detail API error:", error);

    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}