/**
 * Every fact and every piece of copy on the site lives here.
 * Fill in the [PLACEHOLDER: ...] strings, they render highlighted on the page
 * until you replace them. Facts come only from the Google Business Profile.
 */

/** Set to false to hide the Piercings section, its nav link and FAQ mentions. */
export const SHOW_PIERCINGS = true;

export const business = {
  name: "Rictus Tattoo",
  category: "Tattoo and piercing studio",
  rating: 4.9,
  reviewCount: 31,
  phoneDisplay: "+52 984 215 9064",
  phoneE164: "+529842159064",
  whatsappNumber: "529842159064",
  address: {
    street: "Calle 14 Bis, between Av. 40 and Av. 45",
    streetNumber: "[PLACEHOLDER: confirm address format and street number]",
    neighborhood: "Gonzalo Guerrero",
    postalCode: "77720",
    city: "Playa del Carmen",
    region: "Quintana Roo",
    regionShort: "Q.R.",
    country: "MX",
    countryName: "México",
  },
  plusCode: "JWMC+7W Playa del Carmen, Quintana Roo, México",
  /**
   * Decoded from plus code JWMC+7W (full code 76GJJWMC+7W).
   * [PLACEHOLDER: verify latitude/longitude on Google Maps]
   */
  geo: { latitude: 20.63319, longitude: -87.07769 },
  hours: {
    closes: "23:00",
    opens: "[PLACEHOLDER: opening time]",
    days: "[PLACEHOLDER: opening days]",
  },
  facebookUrl: "[PLACEHOLDER: Facebook URL]",
  instagramUrl: "[PLACEHOLDER: Instagram URL]",
  email: "[PLACEHOLDER: email]",
  googleReviewsUrl: "[PLACEHOLDER: Google reviews link]",
  /** Used for canonical URLs and Open Graph. */
  siteUrl: "[PLACEHOLDER: website URL, e.g. https://rictustattoo.com]",
} as const;

export const artist = {
  name: "Dan",
  fullName: "[PLACEHOLDER: full name / artist name, confirm she still works there]",
  specialty: "[PLACEHOLDER: specialty]",
  bio: "[PLACEHOLDER: short bio]",
  availability: "[PLACEHOLDER: availability]",
};

export const messages = {
  book: "Hi Rictus Tattoo! I saw your website and I'd like to book a tattoo.",
  quote: "Hi Rictus Tattoo! I saw your website and I'd like a quote for a tattoo.",
  piercing: "Hi Rictus Tattoo! I saw your website and I'd like to book a piercing.",
  dan: "Hi Rictus Tattoo! I saw your website and I'd like to book a tattoo with Dan.",
  question: "Hi Rictus Tattoo! I saw your website and I have a quick question.",
};

export const tattooOptions = [
  {
    id: "one",
    style: "[PLACEHOLDER: style name]",
    description: "[PLACEHOLDER: short description]",
    price: '[PLACEHOLDER: price or "from $..."]',
    session: "[PLACEHOLDER: approximate session time]",
  },
  {
    id: "two",
    style: "[PLACEHOLDER: style name]",
    description: "[PLACEHOLDER: short description]",
    price: '[PLACEHOLDER: price or "from $..."]',
    session: "[PLACEHOLDER: approximate session time]",
  },
  {
    id: "three",
    style: "[PLACEHOLDER: style name]",
    description: "[PLACEHOLDER: short description]",
    price: '[PLACEHOLDER: price or "from $..."]',
    session: "[PLACEHOLDER: approximate session time]",
  },
];

export const piercing = {
  types: "[PLACEHOLDER: piercing types]",
  jewelry: "[PLACEHOLDER: jewelry options]",
  prices: "[PLACEHOLDER: prices]",
};

export const reviews = [
  {
    author: "I. L.",
    role: "Google review",
    note: "Translated from French",
    text: "A huge thank you to this talented tattoo artist. I've rarely seen a tattoo artist so precise and dedicated to her work.",
  },
  {
    author: "Jules L.",
    role: "Google Local Guide",
    note: "Translated from Spanish",
    text: "The best tattoo artist I've met in Mexico.",
  },
  {
    author: "Diego D.",
    role: "Google review",
    note: "Translated from Spanish",
    text: "The best option if you want quality tattoos. Dan is the best; this is my third tattoo with her, and honestly, I'm always really happy with the result. ✌🏽",
  },
];

export const steps = [
  {
    title: "Send your idea",
    body: "Message us on WhatsApp with your references, the size you have in mind and the body area.",
    placeholder: null as string | null,
  },
  {
    title: "Get your design and quote",
    body: "You get a design and a quote for your piece.",
    placeholder: "[PLACEHOLDER: design/approval process, deposit policy]",
  },
  {
    title: "Come in, leave grinning",
    body: "Settle in at the studio while Dan does the careful part.",
    placeholder: "[PLACEHOLDER: aftercare info]",
  },
];

export const faqs = [
  {
    q: "How do I book?",
    a: "Send us a message on WhatsApp with your idea, a few references, the size and the body area. We'll reply with the next steps.",
  },
  {
    q: "How much does a tattoo cost?",
    a: "[PLACEHOLDER: pricing info] Every piece is different, so the quickest way to know is to send your idea on WhatsApp for a quote.",
  },
  {
    q: "Can I book with Dan?",
    a: `Yes. Just mention Dan in your WhatsApp message. ${artist.availability}`,
  },
  {
    q: "Do you do piercings?",
    a: "Yes. [PLACEHOLDER: piercing details]",
    piercingOnly: true,
  },
  {
    q: "Do I need to leave a deposit?",
    a: "[PLACEHOLDER: deposit policy]",
  },
  {
    q: "Is the studio LGBTQ+ friendly?",
    a: "Yes. Rictus is LGBTQ+ friendly and women-led. Everyone is welcome here, exactly as they are.",
  },
];

export const navLinks = [
  { href: "#tattoos", label: "Tattoos" },
  { href: "#piercings", label: "Piercings", piercingOnly: true },
  { href: "#work", label: "Work" },
  { href: "#dan", label: "Dan" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
].filter((l) => SHOW_PIERCINGS || !l.piercingOnly);

export const fullAddress = `${business.address.street}, ${business.address.neighborhood}, ${business.address.postalCode} ${business.address.city}, ${business.address.regionShort}, ${business.address.countryName}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Rictus Tattoo, JWMC+7W Playa del Carmen, Quintana Roo")}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent("Rictus Tattoo, JWMC+7W Playa del Carmen, Quintana Roo")}&z=17&output=embed`;
