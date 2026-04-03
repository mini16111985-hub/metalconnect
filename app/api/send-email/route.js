import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return Response.json(
        { success: false, error: "Missing to, subject, or text." },
        { status: 400 }
      );
    }

    const firstUrlMatch = text.match(/https?:\/\/[^\s]+/);
    const firstUrl = firstUrlMatch ? firstUrlMatch[0] : null;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="margin-bottom: 10px;">MetalConnect notification</h2>

        <p>
          You have received an automated message through <strong>MetalConnect</strong>.
        </p>

        <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc;">
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; margin: 0;">${text}</pre>
        </div>

        ${
          firstUrl
            ? `<a href="${firstUrl}" 
                 style="display:inline-block; margin-top:10px; padding:12px 20px; background:#0f172a; color:white; text-decoration:none; border-radius:8px;">
                 Open link
               </a>`
            : ""
        }

        <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
          This is an automated message from MetalConnect.
        </p>

        <p style="margin-top: 30px;">— MetalConnect</p>
      </div>
    `;

    await resend.emails.send({
      from: "MetalConnect <onboarding@resend.dev>",
      to,
      subject,
      text,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Send email error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}