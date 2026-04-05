import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set("mc_admin_session", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin logout error:", error);

    return Response.json(
      { success: false, error: error.message || "Unknown server error." },
      { status: 500 }
    );
  }
}