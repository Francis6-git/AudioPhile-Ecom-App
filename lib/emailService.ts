"use server";

import nodemailer from "nodemailer";
import { Order } from "./types";
import { formatPrice } from "./currency";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateOrderConfirmationHTML(order: Order): string {
  const itemsHTML = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0;">${item.name}</td>
          <td style="padding: 8px 0; text-align: center;">x${item.quantity}</td>
          <td style="padding: 8px 0; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
        </tr>
      `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Audiophile Order Confirmation</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color:#d97e4a; padding:24px; text-align:center;">
                <h1 style="color:#ffffff; font-size:24px; margin:0;">AUDIOPHILE</h1>
              </td>
            </tr>

            <!-- Hero Section -->
            <tr>
              <td style="padding:32px 40px 16px 40px; text-align:center;">
                <h2 style="color:#191919; font-size:22px; margin-bottom:8px;">Thank you for your order, ${order.customer.firstName}!</h2>
                <p style="color:#555; font-size:15px; margin:0;">Your order has been successfully confirmed.</p>
              </td>
            </tr>

            <!-- Order Summary -->
            <tr>
              <td style="padding:0 40px;">
                <h3 style="margin:24px 0 8px; font-size:18px; color:#191919;">Order Summary</h3>
                <p style="color:#555; font-size:14px; margin:0 0 16px;">Order ID: <strong>#${order.id.slice(0, 8).toUpperCase()}</strong></p>

                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th align="left" style="border-bottom:1px solid #eee; padding-bottom:8px;">Item</th>
                      <th align="center" style="border-bottom:1px solid #eee; padding-bottom:8px;">Qty</th>
                      <th align="right" style="border-bottom:1px solid #eee; padding-bottom:8px;">Price</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHTML}</tbody>
                </table>

                <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                <p style="text-align:right; color:#191919; font-weight:bold; font-size:16px;">Total: ${formatPrice(order.total)}</p>
              </td>
            </tr>

           <!-- Shipping Info -->
            <tr>
              <td style="padding:0 40px 32px;">
                <h3 style="margin:24px 0 8px; font-size:18px; color:#191919;">Shipping Address</h3>
                <p style="color:#555; font-size:14px; line-height:1.5;">
                  ${order.shipping.address}<br/>
                  ${order.shipping.city}, ${order.shipping.postalCode}
                </p>

                <!-- Contact Info -->
                <h3 style="margin:24px 0 8px; font-size:18px; color:#191919;">Need Help?</h3>
                <p style="color:#555; font-size:14px; line-height:1.5;">
                  If you have any questions about your order, feel free to contact us at
                  <a href="mailto:support@audiophile.com" style="color:#d97e4a; text-decoration:none; font-weight:bold;">
                    support@audiophile.com
                  </a>.
                </p>

                <!-- View Order Button -->
                <div style="text-align:center; margin-top:24px;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/order/${order.id}" 
                    style="display:inline-block; background-color:#d97e4a; color:#ffffff; text-decoration:none; 
                          padding:12px 24px; border-radius:6px; font-size:15px; font-weight:bold;">
                    View Your Order
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#191919; text-align:center; padding:20px;">
                <p style="color:#999; font-size:13px; margin:0;">&copy; ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
                <p style="color:#777; font-size:13px; margin-top:8px;">This is an automated email — please do not reply.</p>
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

function generateOrderConfirmationText(order: Order): string {
  return `
Thank you, ${order.customer.firstName}!
Your Audiophile order has been confirmed.

Order ID: #${order.id.slice(0, 8).toUpperCase()}
Total: ${formatPrice(order.total)}

We’ll notify you once your order ships.
  `;
}

export async function sendOrderConfirmation(order: Order): Promise<void> {
  const html = generateOrderConfirmationHTML(order);
  const text = generateOrderConfirmationText(order);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: order.customer.email,
    subject: `Your Audiophile Order — #${order.id.slice(0, 8).toUpperCase()}`,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
