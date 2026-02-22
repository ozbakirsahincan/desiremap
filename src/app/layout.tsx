import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://desiremap.de";

const listingSchemas = [
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-1`,
    name: "Artemis",
    description: "Berlins größtes FKK Club mit exklusivem Wellness-Bereich und eleganter Bar.",
    telephone: "+49 30 123456",
    address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.8, reviewCount: 1247 },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-2`,
    name: "Pascha",
    description: "Europas größtes Laufhaus mit 7 Etagen und über 120 Damen.",
    telephone: "+49 221 123456",
    address: { "@type": "PostalAddress", addressLocality: "Köln", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.6, reviewCount: 892 },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-3`,
    name: "Café del Sol",
    description: "Exklusives Bordell in Hamburg mit diskreter Atmosphäre und privaten Zimmern.",
    telephone: "+49 40 123456",
    address: { "@type": "PostalAddress", addressLocality: "Hamburg", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.5, reviewCount: 423 },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-4`,
    name: "Paradise",
    description: "Premium FKK Club in Stuttgart mit Pool und großzügigem Außenbereich.",
    telephone: "+49 711 123456",
    address: { "@type": "PostalAddress", addressLocality: "Stuttgart", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.7, reviewCount: 678 },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-5`,
    name: "Royal",
    description: "Zentrales Laufhaus in München mit 3 Etagen und Bar.",
    telephone: "+49 89 123456",
    address: { "@type": "PostalAddress", addressLocality: "München", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.4, reviewCount: 312 },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#listing-6`,
    name: "Diamond",
    description: "Exklusives Ambiente im Herzen von Frankfurt mit VIP-Suiten.",
    telephone: "+49 69 123456",
    address: { "@type": "PostalAddress", addressLocality: "Frankfurt", addressCountry: "DE" },
    areaServed: "DE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.6, reviewCount: 534 },
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "DesireMap",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      sameAs: ["https://desiremap.de"],
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", availableLanguage: ["German"] }],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "DesireMap",
      inLanguage: "de-DE",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#featured-listings`,
      name: "Verifizierte DesireMap Betriebe",
      itemListElement: listingSchemas.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item,
      })),
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DesireMap - Premium Erotik Guide Deutschland",
    template: "%s | DesireMap",
  },
  description:
    "Exklusive FKK Clubs, Bordelle und Laufhäuser in Deutschland. Diskrete, verifizierte Adressen mit Bewertungen, Preisen und Reservierungsoptionen.",
  keywords: [
    "FKK Club Deutschland",
    "Bordell Verzeichnis",
    "Laufhaus finden",
    "Erotik Guide",
    "DesireMap",
    "Erotik Deutschland",
  ],
  applicationName: "DesireMap",
  authors: [{ name: "DesireMap Team" }],
  category: "directory",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "x-default": "/",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "DesireMap",
    title: "DesireMap - Premium Erotik Guide Deutschland",
    description:
      "Deutschlands Premium-Verzeichnis für FKK Clubs, Bordelle und Laufhäuser mit diskreten, verifizierten Einträgen.",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "DesireMap Premium Erotik Guide Deutschland . Artist : Pixabay Sunriseforever",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesireMap - Premium Erotik Guide Deutschland",
    description:
      "Verifizierte FKK Clubs, Bordelle und Laufhäuser in ganz Deutschland. Diskret, elegant und aktuell.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
