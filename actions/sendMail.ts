"use server";

import { sendOrderConfirmation } from "@/lib/emailService";
import { Order } from "@/lib/types";

export async function sendOrderEmail(order: Order) {
  await sendOrderConfirmation(order);
  return order;
}
