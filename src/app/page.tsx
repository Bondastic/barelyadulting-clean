import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Marquee from "@/components/sections/Marquee";
import Content from "@/components/sections/Content";
import Sponsorship from "@/components/sections/Sponsorship";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/siteUrl";
import { getSiteContent } from "@/sanity/fetch";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const title = content.seo.title || content.name;
  const description = content.seo.description || content.description;
  const image = content.seo.ogImageUrl || content.logoUrl;

  return {
    title,
    description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      type: "website",
      siteName: content.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${content.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function HomePage() {
  const content = await getSiteContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    url: getSiteUrl(),
    image: toAbsoluteUrl(content.logoUrl),
    description: content.description,
    email: content.email,
    sameAs: Object.values(content.socials).filter(Boolean),
  };

  return (
    <>
      <Navbar content={content} />
      <main id="main-content">
        <Hero content={content} />
        <About content={content} />
        <Marquee content={content} />
        <Content content={content} />
        <Sponsorship content={content} />
      </main>
      <Footer content={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
