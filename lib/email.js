import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRFQNotification({ email, title }) {
  try {
    await resend.emails.send({
      from: "MetalConnect <onboarding@resend.dev>",
      to: email,
      subject: "RFQ received",
      html: `
        <h2>RFQ received</h2>
        <p>Your request <strong>${title}</strong> has been submitted.</p>
        <p>We will notify you when offers arrive.</p>
      `,
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}