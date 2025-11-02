import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    return { id: orderId };
  },
});

// GET Order By ID
export const getOrderById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    return order;
  },
});
