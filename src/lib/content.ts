export type NavItem = { label: string; href: string; badge?: string };
export type StatItem = { label: string; value: string };
export type PlatformKey = "youtube" | "tiktok" | "instagram" | "facebook";
export type SocialKey = PlatformKey | "discord";

export type Platform = {
  key: PlatformKey;
  name: string;
  description: string;
  cta: string;
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string[];
  ogImageUrl: string | null;
};

export type HeroContent = {
  titleRed: string;
  titleBlack: string;
  tagline: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  scrollLabel: string;
};

export type SiteContent = {
  name: string;
  description: string;
  email: string;
  logoUrl: string;
  seo: SeoContent;
  hero: HeroContent;
  socials: Record<SocialKey, string>;
  nav: NavItem[];
  marqueeItems: string[];
  stats: StatItem[];
  about: {
    badge: string;
    headline: string;
    bio: string;
    quote: string;
    quoteAuthor: string;
  };
  content: {
    badge: string;
    headline: string;
    headlineAccent: string;
    description: string;
    platforms: Platform[];
  };
  community: {
    headline: string;
    description: string;
    cta: string;
  };
  sponsorship: {
    badge: string;
    headline: string;
    description: string;
  };
  footerLine: string;
};

const youtubeUrl = "https://www.youtube.com/@BarelyAdultingPOV";

export const defaultContent: SiteContent = {
  name: "Barely Adulting POV",
  description:
    "Real day-in-the-life content about fatherhood, self-improvement, and the honest side of adulting. No filters, no pretending. Just showing up.",
  email: "contact@barelyadultingpov.com",
  logoUrl: "/logo.jpg",
  seo: {
    title: "Barely Adulting POV",
    description:
      "Follow Barely Adulting POV for honest videos about fatherhood, family life, self-improvement, budgeting, and figuring out adulthood one day at a time.",
    keywords: [
      "Barely Adulting POV",
      "YouTube creator",
      "fatherhood",
      "family content",
      "self improvement",
      "day in the life",
      "business inquiries",
      "sponsorships",
    ],
    ogImageUrl: null,
  },
  hero: {
    titleRed: "BARELY",
    titleBlack: "ADULTING",
    tagline: "Just a dad trying to figure it out, one day at a time.",
    subtitle:
      "Content creator and dad. Slowly learning, slowly growing, still showing up.",
    primaryCtaLabel: "Watch the latest",
    primaryCtaHref: youtubeUrl,
    secondaryCtaLabel: "Sponsorship inquiries",
    secondaryCtaHref: "#sponsor",
    scrollLabel: "Scroll to about section",
  },
  socials: {
    youtube: youtubeUrl,
    tiktok: "https://www.tiktok.com/@barelyadultingpov",
    facebook:
      "https://www.facebook.com/people/Barely-Adulting-POV/61585322005340/#",
    instagram: "https://www.instagram.com/barelyadultingpov/",
    discord: "https://discord.com/invite/eJEywUmAyk",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Content", href: "#content" },
    { label: "Sponsor", href: "#sponsor" },
  ],
  marqueeItems: [
    "Show up every day",
    "Family first",
    "Debt-free journey",
    "One day at a time",
    "Day in the life",
    "Stop giving up",
    "Barely Adulting POV",
  ],
  stats: [
    { label: "Content", value: "Day-in-the-life vlogs" },
    { label: "Focus", value: "Family and growth" },
    { label: "Mission", value: "Debt-free journey" },
  ],
  about: {
    badge: "About me",
    headline: "Hey, I'm the guy behind Barely Adulting POV",
    bio: "I'm a dad documenting the real, unfiltered side of adulting. I'm working toward getting out of debt, showing up at the gym even when I don't feel like it, and trying to be a better father and partner every day. It's not always pretty, but it's honest. Somewhere between the budgeting, family moments, and the occasional Minecraft session, there is plenty to laugh about too.",
    quote: "If you're tired of starting over, stop giving up.",
    quoteAuthor: "The words that get me through the day",
  },
  content: {
    badge: "My content",
    headline: "Find me",
    headlineAccent: "everywhere",
    description:
      "Real life, documented daily. Pick your platform and follow the journey.",
    platforms: [
      {
        key: "youtube",
        name: "YouTube",
        description:
          "Full day-in-the-life vlogs, the wins, the setbacks, and everything in between.",
        cta: "Subscribe",
      },
      {
        key: "tiktok",
        name: "TikTok",
        description:
          "Honest daily updates on fatherhood, the grind, and the small wins that matter.",
        cta: "Follow",
      },
      {
        key: "instagram",
        name: "Instagram",
        description:
          "Behind the scenes, family moments, and a little daily motivation.",
        cta: "Follow",
      },
      {
        key: "facebook",
        name: "Facebook",
        description:
          "The community side, updates, conversations, and encouragement.",
        cta: "Like page",
      },
    ],
  },
  community: {
    headline: "Join the community on Discord",
    description:
      "The place where the conversation actually happens, with daily check-ins, wins, setbacks, and people who get it.",
    cta: "Join the Discord",
  },
  sponsorship: {
    badge: "Partnerships",
    headline: "Let's work together",
    description:
      "I partner with brands that fit real everyday life, including family, self-improvement, budgeting, gaming, and products that genuinely help people keep going. If that sounds like your brand, I'd love to hear from you.",
  },
  footerLine: "Still showing up. On to the next one.",
};
