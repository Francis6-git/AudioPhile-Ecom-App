/**
 * Format a price in cents to a currency string
 * @param cents - Price in cents (e.g., 2999900 for $29,999.00)
 * @param currency - Currency code (default: USD)
 */
export function formatPrice(cents: number, currency: string = "USD"): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}

/**
 * Parse a currency string to cents
 * @param priceString - Price string (e.g., "$29,999")
 */
export function parsePriceToCents(priceString: string): number {
  const cleaned = priceString.replace(/[^0-9.-]+/g, "");
  return Math.round(parseFloat(cleaned) * 100);
}

// Export both names for convenience
export { formatPrice as formatCurrency };
export default formatPrice;
