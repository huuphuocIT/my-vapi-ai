import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchQuery } from "convex/nextjs";

import { Id } from "@workspace/backend/_generated/dataModel";
import { api } from "@workspace/backend/_generated/api";

import { CONTACT_SESSION_KEY } from "@/modules/vapi/configs/constants";

export const GET = async () => {
  const cookieStore = await cookies();
  const contactSessionId = cookieStore.get(CONTACT_SESSION_KEY)?.value;

  if (!contactSessionId) {
    return NextResponse.json(
      {
        success: false,
        reason: "Contact session not found",
      },
      { status: 404 }
    );
  }

  const valid = await fetchQuery(api.contactSessions.validate, {
    contactSessionId: contactSessionId as Id<"contactSessions">,
  });

  if (!valid.success) {
    cookieStore.delete(CONTACT_SESSION_KEY);
    return NextResponse.json(valid, { status: 404 });
  }

  return NextResponse.json({ success: valid.success });
};
