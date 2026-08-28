import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import CartSummaryBar from "@/components/CartSummaryBar";
import { CartProvider } from "@/lib/cart-context";
import {
  SHOP_NAME,
  SHOP_TAGLINE,
  SITE_URL,
  OG_IMAGE,
  SHOP_ADDRESS,
  SHOP_PHONE,
} from "@/config/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SHOP_NAME} | Chai & Nasta, Pune`,
    template: `%s | ${SHOP_NAME}`,
  },
  description: `${SHOP_TAGLINE} Order chai, poha, misal pav & more on WhatsApp. ${SHOP_ADDRESS}`,
  keywords: ["chai nasta pune", "misal pav pune", "poha delivery", "nasta center pune", "sadguru cafe"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SHOP_NAME,
    title: `${SHOP_NAME} | Chai & Nasta, Pune`,
    description: `${SHOP_TAGLINE} Order on WhatsApp — no app needed.`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SHOP_NAME} food` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SHOP_NAME} | Chai & Nasta, Pune`,
    description: SHOP_TAGLINE,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen pb-24 lg:pb-0">
            {children}
          </main>
          <Footer />
          <CartSummaryBar />
          <FloatingWhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
