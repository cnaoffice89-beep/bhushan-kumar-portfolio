import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: personal.seo.title,
  description: personal.seo.description,
  keywords: [...personal.seo.keywords],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    title: personal.seo.title,
    description: personal.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: personal.seo.title,
    description: personal.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="x_Rb3P6KZtsII1FcLYwkNM0JF7g2dsXJSy6syM7qBcU"
        />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personal.name,
              jobTitle: personal.title,
              description: personal.seo.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Indore",
                addressRegion: "Madhya Pradesh",
                addressCountry: "IN",
              },
              knowsAbout: [
                "Industrial Automation",
                "PLC Programming",
                "Web Development",
                "Next.js",
              ],
            }),
          }}
        />
      </head>

      <body className="font-body antialiased">{children}</body>
    </html>
  );
}