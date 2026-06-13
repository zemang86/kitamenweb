import type { Metadata } from "next";
import { JetBrains_Mono, Poppins, Kanit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KITAMEN — Boutique Esports Agency",
    template: "%s — KITAMEN",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "KITAMEN — Boutique Esports Agency",
    description: site.description,
    url: site.url,
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "KITAMEN — Boutique Esports Agency",
    description: site.description,
  },
  icons: {
    icon: "/logo/android-chrome-192x192.png",
    shortcut: "/logo/android-chrome-192x192.png",
    apple: "/logo/android-chrome-192x192.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo/android-chrome-192x192.png`,
      description: site.description,
      email: site.email,
      foundingDate: "2015",
      areaServed: "MY",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MY",
      },
      sameAs: site.social.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-MY",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${poppins.variable} ${kanit.variable} antialiased`}
    >
      <body className="bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
