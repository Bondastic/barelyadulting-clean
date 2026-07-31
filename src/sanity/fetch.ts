import { cache } from "react";
import {
  defaultContent,
  type Platform,
  type PlatformKey,
  type SiteContent,
} from "@/lib/content";
import {
  isSanityConfigured,
  sanityClient,
  urlForImage,
  type SanityImageSource,
} from "./client";

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name,
  logo,
  email,
  description,
  seo{ title, description, keywords, image },
  socials,
  footerLine,
  marqueeItems,
  hero{
    titleRed,
    titleBlack,
    tagline,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    scrollLabel
  },
  tagline,
  heroSubtitle,
  stats[]{ label, value },
  about{ badge, headline, bio, quote, quoteAuthor, photo },
  contentSection{
    badge,
    headline,
    headlineAccent,
    description,
    platforms[]{ key, name, description, cta }
  },
  community{ headline, description, cta },
  sponsorship{ badge, headline, description }
}`;

type SanitySiteSettings = {
  name?: string;
  logo?: SanityImageSource;
  email?: string;
  description?: string;
  seo?: Partial<Omit<SiteContent["seo"], "ogImageUrl">> & {
    image?: SanityImageSource;
  };
  socials?: Partial<SiteContent["socials"]>;
  footerLine?: string;
  marqueeItems?: string[];
  hero?: Partial<SiteContent["hero"]>;
  tagline?: string;
  heroSubtitle?: string;
  stats?: SiteContent["stats"];
  about?: Partial<SiteContent["about"]> & { photo?: SanityImageSource };
  contentSection?: Partial<SiteContent["content"]>;
  community?: Partial<SiteContent["community"]>;
  sponsorship?: Partial<SiteContent["sponsorship"]>;
};

export type ResolvedSiteContent = SiteContent & {
  aboutPhotoUrl: string | null;
};

const platformKeys: PlatformKey[] = [
  "youtube",
  "tiktok",
  "instagram",
  "facebook",
];

function isPlatformKey(value: unknown): value is PlatformKey {
  return typeof value === "string" && platformKeys.includes(value as PlatformKey);
}

function definedEntries<T extends object>(value: T | undefined): Partial<T> {
  if (!value) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry != null && entry !== ""),
  ) as Partial<T>;
}

function resolvePlatforms(platforms: unknown): Platform[] | null {
  if (!Array.isArray(platforms)) {
    return null;
  }

  const resolved = platforms
    .map((platform) => {
      const item = platform as Partial<Platform>;

      if (!isPlatformKey(item.key)) {
        return null;
      }

      return {
        key: item.key,
        name: item.name || item.key,
        description: item.description || "Follow along for new updates.",
        cta: item.cta || "Follow",
      } satisfies Platform;
    })
    .filter(Boolean) as Platform[];

  return resolved.length ? resolved : null;
}

function withDefaults(doc: SanitySiteSettings | null): ResolvedSiteContent {
  const fallback = defaultContent;

  if (!doc) {
    return { ...fallback, aboutPhotoUrl: null };
  }

  const heroOverrides: Partial<SiteContent["hero"]> = {
    ...definedEntries(doc.hero),
  };

  if (doc.tagline) {
    heroOverrides.tagline = doc.tagline;
  }

  if (doc.heroSubtitle) {
    heroOverrides.subtitle = doc.heroSubtitle;
  }

  const seoImageUrl = urlForImage(doc.seo?.image, {
    width: 1200,
    height: 630,
  });

  const platforms = resolvePlatforms(doc.contentSection?.platforms);

  return {
    name: doc.name ?? fallback.name,
    description: doc.description ?? fallback.description,
    email: doc.email ?? fallback.email,
    logoUrl:
      urlForImage(doc.logo, { width: 600, height: 600 }) ?? fallback.logoUrl,
    seo: {
      ...fallback.seo,
      ...definedEntries(doc.seo),
      description:
        doc.seo?.description ?? doc.description ?? fallback.seo.description,
      ogImageUrl: seoImageUrl ?? fallback.seo.ogImageUrl,
    },
    hero: {
      ...fallback.hero,
      ...heroOverrides,
    },
    socials: {
      ...fallback.socials,
      ...definedEntries(doc.socials),
    },
    nav: fallback.nav,
    marqueeItems: doc.marqueeItems?.length
      ? doc.marqueeItems
      : fallback.marqueeItems,
    stats: doc.stats?.length ? doc.stats : fallback.stats,
    about: {
      ...fallback.about,
      ...definedEntries(doc.about),
    },
    content: {
      ...fallback.content,
      ...definedEntries(doc.contentSection),
      platforms: platforms ?? fallback.content.platforms,
    },
    community: {
      ...fallback.community,
      ...definedEntries(doc.community),
    },
    sponsorship: {
      ...fallback.sponsorship,
      ...definedEntries(doc.sponsorship),
    },
    footerLine: doc.footerLine ?? fallback.footerLine,
    aboutPhotoUrl: urlForImage(doc.about?.photo, {
      width: 900,
      height: 900,
    }),
  };
}

export const getSiteContent = cache(async (): Promise<ResolvedSiteContent> => {
  if (!isSanityConfigured || !sanityClient) {
    return withDefaults(null);
  }

  try {
    const doc = await sanityClient.fetch<SanitySiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["siteSettings"] } },
    );

    return withDefaults(doc);
  } catch {
    return withDefaults(null);
  }
});
