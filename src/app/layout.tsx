import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { artist, business, SHOW_PIERCINGS } from "@/content/site";
import { isPlaceholder } from "@/lib/links";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Until the real domain is set in site.ts, fall back to localhost so URLs resolve.
const siteUrl = isPlaceholder(business.siteUrl) ? "http://localhost:3000" : business.siteUrl;

const title = "Rictus Tattoo | Tattoo Studio in Playa del Carmen, Women-led";
const description =
  "Women-led tattoo and piercing studio in Playa del Carmen. Precise, quality tattoos by Dan, rated 4.9 on Google. Book your tattoo on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "tattoo studio Playa del Carmen",
    "female tattoo artist Playa del Carmen",
    "tattoo and piercing Playa del Carmen",
    "women-led tattoo studio",
    "LGBTQ+ friendly tattoo Playa del Carmen",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rictus Tattoo",
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#100c11",
  colorScheme: "dark",
  viewportFit: "cover",
};

/* Structured data. Fields still holding a [PLACEHOLDER] are left out so the markup stays valid. */
function jsonLd() {
  const a = business.address;
  const streetAddress = isPlaceholder(a.streetNumber) ? a.street : `${a.street} ${a.streetNumber}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: business.name,
    description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.jpg`,
    telephone: business.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    // Decoded from plus code JWMC+7W. [PLACEHOLDER: verify latitude/longitude]
    geo: { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("JWMC+7W Playa del Carmen")}`,
    employee: { "@type": "Person", name: artist.name, jobTitle: "Tattoo artist" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
    },
    knowsAbout: SHOW_PIERCINGS ? ["Tattoos", "Piercings"] : ["Tattoos"],
  };

  const sameAs = [business.facebookUrl, business.instagramUrl].filter((u) => !isPlaceholder(u));
  if (sameAs.length) data.sameAs = sameAs;

  // [PLACEHOLDER: days and opening time]. Fill business.hours in site.ts, then
  // list the days below, e.g. ["Monday", "Tuesday", ...].
  const openingDays: string[] = [];
  if (openingDays.length && !isPlaceholder(business.hours.opens)) {
    data.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openingDays,
      opens: business.hours.opens,
      closes: business.hours.closes,
    };
  }

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} antialiased`}>
      <body className="grain min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        {children}
      </body>
    </html>
  );
}
