// Tapping pricing - single source of truth
// January 1, 2027: change TAPPING_REDUCED to false. That's it.

export const TAPPING_REDUCED = true;
export const TAPPING_REDUCED_END = "January 1, 2027";
export const TAPPING_PRICE_GBP = 85;
export const TAPPING_PRICE_USD = 115;
export const TAPPING_REDUCED_GBP = 40;
export const TAPPING_REDUCED_USD = 55;

export const TAPPING_DISPLAY_GBP = TAPPING_REDUCED
  ? `\u00a3${TAPPING_REDUCED_GBP}`
  : `\u00a3${TAPPING_PRICE_GBP}`;

export const TAPPING_DISPLAY_USD = TAPPING_REDUCED
  ? `$${TAPPING_REDUCED_USD}`
  : `$${TAPPING_PRICE_USD}`;

// Homepage card shows USD first for row consistency
export const TAPPING_CARD_PRICE = TAPPING_REDUCED
  ? `$${TAPPING_REDUCED_USD} / \u00a3${TAPPING_REDUCED_GBP}`
  : `$${TAPPING_PRICE_USD} / \u00a3${TAPPING_PRICE_GBP}`;

// /tapping page shows GBP first (actual billing currency)
export const TAPPING_PAGE_PRICE = TAPPING_REDUCED
  ? `\u00a3${TAPPING_REDUCED_GBP}`
  : `\u00a3${TAPPING_PRICE_GBP}`;

export const TAPPING_PAGE_STRUCK = TAPPING_REDUCED
  ? `\u00a3${TAPPING_PRICE_GBP}`
  : null;

export const TAPPING_BOOKING_URL =
  "https://calendly.com/lfcoaching/eft-tapping-60mins";
