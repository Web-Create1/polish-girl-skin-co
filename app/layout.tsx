import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polish-girl-skin-co.vercel.app"),
  title: "Polish Girl Skin Co. · Your Personal Skincare Concierge",
  description:
    "Personalized, judgment free skincare curated for your skin, your life, and your budget, plus a sisterhood of women healing together. Founded by Nicole Kaminski.",
  keywords: [
    "skincare concierge",
    "personalized skincare",
    "Polish Girl Skin Co",
    "skin barrier",
    "women's wellness",
    "skincare consultation",
  ],
  authors: [{ name: "Nicole Kaminski" }],
  openGraph: {
    title: "Polish Girl Skin Co. · Your Personal Skincare Concierge",
    description:
      "Your personal skincare concierge. Your sisterhood. Your healing. Personalized, judgment free skincare curated just for you.",
    type: "website",
    siteName: "Polish Girl Skin Co.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf4ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-espresso antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
