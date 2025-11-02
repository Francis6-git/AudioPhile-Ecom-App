import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    customer: v.object({
      firstName: v.string(),
      lastName: v.optional(v.string()),
      email: v.string(),
      phone: v.optional(v.string()),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      postalCode: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    paymentMethod: v.string(),
    paymentDetails: v.optional(
      v.object({
        eMoneyNumber: v.string(),
        eMoneyPin: v.string(),
      })
    ),
    subtotal: v.number(),
    shippingFee: v.number(),
    taxes: v.number(),
    total: v.number(),
    status: v.string(),
    createdAt: v.number(),
  }),
});
