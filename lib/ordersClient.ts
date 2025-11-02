"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { CreateOrderPayload, Order } from "./types";

/**
 * Create a new order in Convex
 */
export async function createOrder(
  convex: ConvexReactClient,
  payload: CreateOrderPayload
): Promise<Order> {
  const id = await convex.mutation(api.orders.createOrder, {
    customer: payload.customer,
    shipping: payload.shipping,
    items: payload.items,
    paymentMethod: payload.paymentMethod,
    paymentDetails: payload.paymentDetails,
    subtotal: payload.subtotal,
    shippingFee: payload.shippingFee,
    taxes: payload.taxes,
    total: payload.total,
  });

  const order: Order = {
    ...payload,
    id: id.id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return order;
}

/**
 * Optional: Hook version (if you want to use directly in components)
 */
export function useCreateOrder() {
  const mutation = useMutation(api.orders.createOrder);
  return async (payload: CreateOrderPayload): Promise<Order> => {
    const id = await mutation({
      customer: payload.customer,
      shipping: payload.shipping,
      items: payload.items,
      paymentMethod: payload.paymentMethod,
      paymentDetails: payload.paymentDetails,
      subtotal: payload.subtotal,
      shippingFee: payload.shippingFee,
      taxes: payload.taxes,
      total: payload.total,
    });

    return {
      ...payload,
      id: id.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  };
}

// Get order by ID
export async function getOrderById(
  convex: ConvexReactClient,
  id: string
): Promise<Order | null> {
  try {
    // Cast the plain string to Convex's typed ID
    const convexId = id as Id<"orders">;

    const result = await convex.query(api.orders.getOrderById, {
      id: convexId,
    });
    if (!result) return null;

    return {
      ...result,
      id: result._id,
      createdAt: new Date(result.createdAt).toISOString(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
