import { fetchQuery } from "convex/nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";

import { CONTACT_SESSION_KEY } from "@/modules/vapi/configs/constants";

export async function POST(request: Request) {
  const { contactSessionId } = await request.json();

  if (!contactSessionId) {
    return NextResponse.json(
      {
        success: false,
        reason: "Missing contactSessionId",
      },
      { status: 400 }
    );
  }

  const expiredAt = await fetchQuery(api.contactSessions.getExpiredAt, {
    contactSessionId: contactSessionId as Id<"contactSessions">,
  });

  if (!expiredAt.success || !expiredAt.contactSessionId) {
    return NextResponse.json(expiredAt, { status: 404 });
  }

  const cookieStore = await cookies();

  cookieStore.set(CONTACT_SESSION_KEY, expiredAt.contactSessionId, {
    path: "/",
    maxAge: expiredAt.expiredAt - Date.now(),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ success: true });
}
