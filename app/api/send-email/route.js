import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, text } = body;

    // HTML verzija emaila
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: auto;">

        <h2 style="margin-bottom: 10px;">New offer received</h2>

        <p>
          You have received a new supplier offer through <strong>MetalConnect</strong>.
        </p>

        <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; margin: 0;">
${text}
          </pre>
        </div>

        ${
          text.includes("http")
            ? `<a href="${text.match(/https?:\/\/[^\s]+/)?.[0]}" 
                 style="display:inline-block; margin-top:10px; padding:12px 20px; background:#0f172a; color:white; text-decoration:none; border-radius:8px;">
                 View offers
               </a>`
            : ""
        }

        <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
          This is an automated message from MetalConnect.
        </p>

        <p style="margin-top: 30px;">
          — MetalConnect
        </p>

      </div>
    `;

    await resend.emails.send({
      from: "MetalConnect <onboarding@resend.dev>",
      to,
      subject,
      text, // fallback (plain text)
      html, // 💥 polished version
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message });
  }
}