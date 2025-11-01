/**
 * Email Service - Mock Implementation
 *
 * This file provides a mock email service that generates HTML emails
 * and logs them to the console. In production, this would integrate
 * with SendGrid, Mailgun, or another transactional email provider.
 *
 * The generated HTML is also saved to sessionStorage so it can be
 * previewed via a dev route.
 */

import { Order } from "./types";
import { formatPrice } from "./currency";

const EMAIL_STORAGE_KEY = "audiophile_emails";

interface EmailLog {
  to: string;
  subject: string;
  html: string;
  text: string;
  timestamp: string;
  orderId: string;
}

/**
 * Generate HTML email for order confirmation
 */
function generateOrderConfirmationHTML(order: Order): string {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f1f1f1;">
        <div style="display: flex; align-items: center;">
          <img src="${item.image}" alt="${
        item.name
      }" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; margin-right: 16px;" />
          <div>
            <div style="font-weight: 700; color: #000;">${item.name}</div>
            <div style="color: #000; opacity: 0.5; font-size: 14px;">${formatPrice(
              item.price
            )}</div>
          </div>
        </div>
      </td>
      <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f1f1;">
        <span style="font-weight: 700;">x${item.quantity}</span>
      </td>
      <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f1f1;">
        <span style="font-weight: 700;">${formatPrice(
          item.price * item.quantity
        )}</span>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Audiophile</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 20px !important; }
      .header { font-size: 24px !important; }
      .button { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f1f1f1;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f1f1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #000; padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 2px;">AUDIOPHILE</h1>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 48px 32px 32px;">
              <h2 class="header" style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #000;">Thank you, ${
                order.customer.firstName
              }!</h2>
              <p style="margin: 0; font-size: 16px; line-height: 24px; color: #000; opacity: 0.5;">
                Your order has been confirmed. We'll send you a shipping confirmation email as soon as your order ships.
              </p>
            </td>
          </tr>
          
          <!-- Order Number -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <div style="background-color: #f1f1f1; padding: 16px; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #000; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
                <p style="margin: 8px 0 0; font-size: 18px; font-weight: 700; color: #000;">#${order.id
                  .slice(0, 8)
                  .toUpperCase()}</p>
              </div>
            </td>
          </tr>
          
          <!-- Order Items -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 1px;">Order Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHTML}
              </table>
            </td>
          </tr>
          
          <!-- Totals -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color: #000; opacity: 0.5; text-transform: uppercase; font-size: 14px;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #000;">${formatPrice(
                    order.subtotal
                  )}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #000; opacity: 0.5; text-transform: uppercase; font-size: 14px;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #000;">${formatPrice(
                    order.shippingFee
                  )}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #000; opacity: 0.5; text-transform: uppercase; font-size: 14px;">VAT (Included)</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #000;">${formatPrice(
                    order.taxes
                  )}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0 0; color: #000; opacity: 0.5; text-transform: uppercase; font-size: 14px; font-weight: 700;">Grand Total</td>
                  <td style="padding: 16px 0 0; text-align: right; font-weight: 700; color: #D87D4A; font-size: 18px;">${formatPrice(
                    order.total
                  )}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</h3>
              <p style="margin: 0; font-size: 15px; line-height: 24px; color: #000;">
                ${order.customer.firstName} ${
    order.customer.lastName || ""
  }<br/>
                ${order.shipping.address}<br/>
                ${order.shipping.city}, ${order.shipping.postalCode}<br/>
                ${order.shipping.country}
                ${
                  order.customer.phone
                    ? `<br/>Phone: ${order.customer.phone}`
                    : ""
                }
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 48px;" align="center">
              <a href="${window.location.origin}/order/${
    order.id
  }" class="button" style="display: inline-block; background-color: #D87D4A; color: #ffffff; text-decoration: none; padding: 15px 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 0; font-size: 13px;">
                View Your Order
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #000; padding: 32px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #ffffff; opacity: 0.5;">
                Questions? Contact us at <a href="mailto:support@audiophile.com" style="color: #D87D4A; text-decoration: none;">support@audiophile.com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #ffffff; opacity: 0.5;">
                © ${new Date().getFullYear()} Audiophile. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generate plain text version of email
 */
function generateOrderConfirmationText(order: Order): string {
  const itemsText = order.items
    .map(
      (item) =>
        `${item.name} - ${formatPrice(item.price)} x ${
          item.quantity
        } = ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");

  return `
AUDIOPHILE - Order Confirmation

Thank you, ${order.customer.firstName}!

Your order has been confirmed. We'll send you a shipping confirmation email as soon as your order ships.

Order Number: #${order.id.slice(0, 8).toUpperCase()}

ORDER SUMMARY
${itemsText}

Subtotal: ${formatPrice(order.subtotal)}
Shipping: ${formatPrice(order.shippingFee)}
VAT (Included): ${formatPrice(order.taxes)}
GRAND TOTAL: ${formatPrice(order.total)}

SHIPPING ADDRESS
${order.customer.firstName} ${order.customer.lastName || ""}
${order.shipping.address}
${order.shipping.city}, ${order.shipping.postalCode}
${order.shipping.country}
${order.customer.phone ? `Phone: ${order.customer.phone}` : ""}

View your order: ${window.location.origin}/order/${order.id}

Questions? Contact us at support@audiophile.com

© ${new Date().getFullYear()} Audiophile. All rights reserved.
  `.trim();
}

/**
 * Send order confirmation email (mock implementation)
 */
export async function sendOrderConfirmation(order: Order): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const html = generateOrderConfirmationHTML(order);
  const text = generateOrderConfirmationText(order);

  const emailLog: EmailLog = {
    to: order.customer.email,
    subject: `Your Audiophile Order — #${order.id.slice(0, 8).toUpperCase()}`,
    html,
    text,
    timestamp: new Date().toISOString(),
    orderId: order.id,
  };

  // Save to sessionStorage for dev preview
  try {
    const existingLogs = sessionStorage.getItem(EMAIL_STORAGE_KEY);
    const logs: EmailLog[] = existingLogs ? JSON.parse(existingLogs) : [];
    logs.push(emailLog);
    sessionStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Error saving email log:", error);
  }

  // Log to console for development
  console.log("📧 Email sent (mock):");
  console.log("To:", emailLog.to);
  console.log("Subject:", emailLog.subject);
  console.log("---");
  console.log(text);
  console.log("---");
  console.log(
    "HTML preview available at: /dev/email-preview?orderId=" + order.id
  );
}

/**
 * Get email preview by order ID (for dev purposes)
 */
export function getEmailPreview(orderId: string): EmailLog | null {
  try {
    const logs = sessionStorage.getItem(EMAIL_STORAGE_KEY);
    if (!logs) return null;

    const parsed: EmailLog[] = JSON.parse(logs);
    return parsed.find((log) => log.orderId === orderId) || null;
  } catch (error) {
    console.error("Error getting email preview:", error);
    return null;
  }
}

/**
 * Get all email logs (for dev purposes)
 */
export function getAllEmailLogs(): EmailLog[] {
  try {
    const logs = sessionStorage.getItem(EMAIL_STORAGE_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error("Error getting email logs:", error);
    return [];
  }
}
