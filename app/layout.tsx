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
  title: {
    default: "Polish Girl Skin Co. · Your Personal Skincare Concierge",
    template: "%s · Polish Girl Skin Co.",
  },
  description:
    "Personalized, judgment free skincare curated for your skin, your life, and your budget, plus a sisterhood of women healing together. Book a 1:1 virtual skincare consultation with founder Nicole Kaminski.",
  keywords: [
    "skincare concierge",
    "personalized skincare",
    "virtual skincare consultation",
    "online skincare consultation",
    "1:1 skincare coaching",
    "custom skincare routine",
    "skin barrier repair",
    "clean skincare guidance",
    "sensitive skin help",
    "skincare for women",
    "women's skincare community",
    "skincare membership",
    "Nicole Kaminski",
    "Polish Girl Skin Co",
  ],
  authors: [{ name: "Nicole Kaminski" }],
  creator: "Nicole Kaminski",
  category: "beauty",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Polish Girl Skin Co. · Your Personal Skincare Concierge",
    description:
      "Your personal skincare concierge. Your sisterhood. Your healing. Personalized, judgment free skincare curated just for you.",
    url: "/",
    type: "website",
    siteName: "Polish Girl Skin Co.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polish Girl Skin Co. · Your Personal Skincare Concierge",
    description:
      "Personalized, judgment free skincare curated just for you, plus a sisterhood of women healing together.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
