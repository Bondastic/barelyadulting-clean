import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { defaultContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultContent.seo.title,
    template: `%s | ${defaultContent.name}`,
  },
  description: defaultContent.seo.description,
  applicationName: defaultContent.name,
  authors: [{ name: defaultContent.name }],
  creator: defaultContent.name,
  publisher: defaultContent.name,
  keywords: defaultContent.seo.keywords,
  openGraph: {
    title: defaultContent.seo.title,
    description: defaultContent.seo.description,
    type: "website",
    siteName: defaultContent.name,
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: `${defaultContent.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultContent.seo.title,
    description: defaultContent.seo.description,
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#faf6f0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream font-display text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
