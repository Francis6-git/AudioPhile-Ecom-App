/**
 * Orders Client - LocalStorage Fallback Implementation
 *
 * This file provides a localStorage-based persistence layer for orders.
 * It maintains the same API surface as the intended Convex implementation.
 *
 * To migrate to Convex:
 * 1. Install Convex: npm install convex
 * 2. Set up Convex project: npx convex dev
 * 3. Create orders schema in convex/schema.ts
 * 4. Replace implementations below with Convex mutations/queries
 * 5. See CONVEX_MIGRATION.md for detailed migration guide
 */

import { Order, CreateOrderPayload } from "./types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "audiophile_orders";
const STORAGE_VERSION = 1;

interface StorageData {
  version: number;
  orders: Order[];
}

/**
 * Get all orders from localStorage
 */
function getStorageData(): StorageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { version: STORAGE_VERSION, orders: [] };
    }

    const parsed = JSON.parse(data);

    // Handle version migration if needed
    if (parsed.version !== STORAGE_VERSION) {
      console.warn("Storage version mismatch, resetting orders");
      return { version: STORAGE_VERSION, orders: [] };
    }

    return parsed;
  } catch (error) {
    console.error("Error reading orders from localStorage:", error);
    return { version: STORAGE_VERSION, orders: [] };
  }
}

/**
 * Save orders to localStorage
 */
function setStorageData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving orders to localStorage:", error);
    throw new Error("Failed to save order");
  }
}

/**
 * Create a new order
 */
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const order: Order = {
    ...payload,
    id: uuidv4(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const data = getStorageData();
  data.orders.push(order);
  setStorageData(data);

  console.log("Order created:", order.id);
  return order;
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const data = getStorageData();
  const order = data.orders.find((o) => o.id === orderId);

  return order || null;
}

/**
 * List all orders
 */
export async function listOrders(): Promise<Order[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const data = getStorageData();
  return [...data.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Update order status (useful for admin features)
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order | null> {
  const data = getStorageData();
  const orderIndex = data.orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return null;
  }

  data.orders[orderIndex].status = status;
  setStorageData(data);

  return data.orders[orderIndex];
}

/**
 * Clear all orders (for testing/dev only)
 */
export async function clearAllOrders(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
  console.log("All orders cleared");
}
