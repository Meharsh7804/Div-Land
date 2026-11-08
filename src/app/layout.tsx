import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divya Land · Everything in here is about you",
  description:
    "A small birthday universe for Divya: coffee, long conversations, art, reels, and a few things worth keeping.",
  applicationName: "Divya Land",
  authors: [{ name: "A friend" }],
  keywords: ["Divya Land", "birthday", "for Sonu", "eight chapters"],
  openGraph: {
    title: "Divya Land · Everything in here is about you",
    description:
      "Coffee, conversations, art, reels, and one very specific person.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya Land · Everything in here is about you",
    description: "Come in, Sonu. Your world is waiting.",
  },
  appleWebApp: {
    capable: true,
    title: "Divya Land",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF9F0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body className="min-h-dvh bg-cream font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
