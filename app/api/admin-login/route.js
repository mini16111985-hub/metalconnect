import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!process.env.ADMIN_LOGIN_PASSWORD) {
      return Response.json(
        { success: false, error: "Missing ADMIN_LOGIN_PASSWORD env variable." },
        { status: 500 }
      );
    }

    if (!password) {
      return Response.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    if (password !== process.env.ADMIN_LOGIN_PASSWORD) {
      return Response.json(
        { success: false, error: "Invalid password." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("mc_admin_session", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);

    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}