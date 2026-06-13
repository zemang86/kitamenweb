import type { Metadata } from "next";
import { JetBrains_Mono, Poppins, Kanit } from "next/font/google";
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
  title: "KITAMEN — Boutique Esports Agency",
  description:
    "KITAMEN designs structured esports experiences through PlayPod (console & sim setups), PlaySuite (fully managed tournaments), and PlayLab (bespoke co-creations). Trusted by brands, agencies, and institutions seeking precision in play.",
  icons: {
    icon: "/logo/android-chrome-192x192.png",
    shortcut: "/logo/android-chrome-192x192.png",
    apple: "/logo/android-chrome-192x192.png",
  },
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
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
