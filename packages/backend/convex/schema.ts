import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contactSessions: defineTable({
    name: v.string(),
    email: v.string(),
    expiredAt: v.number(),
    meta: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        referrer: v.optional(v.string()),
        language: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        screenResolution: v.optional(v.string()),
        viewPortSize: v.optional(v.string()),
      })
    ),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),
});
