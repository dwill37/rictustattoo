import { business } from "@/content/site";

export const isPlaceholder = (value: string) => value.includes("[PLACEHOLDER");

/** WhatsApp deep link with a URL-encoded, pre-filled message. */
export const waLink = (message: string) => `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${business.phoneE164}`;

/** Placeholder URLs fall back to "#" so links stay valid until they are filled in. */
export const safeHref = (url: string) => (isPlaceholder(url) ? "#" : url);
