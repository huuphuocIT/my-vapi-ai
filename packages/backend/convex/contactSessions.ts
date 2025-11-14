import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    meta: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        referrer: v.optional(v.string()),
        language: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        viewPortSize: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiredAt = now + SESSION_DURATION_MS;

    const contactSessionId = await ctx.db.insert("contactSessions", {
      name: args.name,
      email: args.email,
      expiredAt,
      meta: args.meta,
    });

    return contactSessionId;
  },
});

export const validate = query({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    const contactSession = await ctx.db.get(contactSessionId);

    if (!contactSession) {
      return {
        success: false,
        reason: "Contact session not found",
      };
    }

    if (contactSession.expiredAt < Date.now()) {
      return {
        success: false,
        reason: "Contact session expired",
      };
    }

    return {
      success: true,
      contactSession,
    };
  },
});

export const getExpiredAt = query({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    if (!contactSessionId) {
      return {
        success: false,
        reason: "Missing contactSessionId",
      };
    }

    const contactSessions = await ctx.db
      .query("contactSessions")
      .filter((q) => q.eq(q.field("_id"), contactSessionId))
      .first();

    if (!contactSessions) {
      return {
        success: false,
        reason: "Contact session not found",
      };
    }

    const expiredAt = contactSessions.expiredAt;

    if (expiredAt < Date.now()) {
      return {
        success: false,
        reason: "Contact session expired",
      };
    }

    return {
      success: true,
      expiredAt,
      contactSessionId: contactSessions._id,
    };
  },
});
