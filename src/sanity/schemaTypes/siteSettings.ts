import { defineArrayMember, defineField, defineType } from "sanity";

const socialField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "content", title: "Content" },
    { name: "gallery", title: "Gallery" },
    { name: "sponsorship", title: "Sponsorship" },
  ],
  preview: {
    prepare() {
      return {
        title: "Barely Adulting website",
        subtitle: "Homepage content and metadata",
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Site name",
      type: "string",
      group: "brand",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo or profile picture",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    defineField({
      name: "email",
      title: "Public contact email",
      type: "string",
      group: "brand",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "description",
      title: "Short site description",
      type: "text",
      rows: 3,
      group: "brand",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "object",
      group: "brand",
      fields: [
        socialField("youtube", "YouTube"),
        socialField("tiktok", "TikTok"),
        socialField("instagram", "Instagram"),
        socialField("facebook", "Facebook"),
        socialField("discord", "Discord invite link"),
      ],
    }),
    defineField({
      name: "footerLine",
      title: "Footer line",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee phrases",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "brand",
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: "seo",
      title: "SEO and sharing",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", title: "SEO title", type: "string" }),
        defineField({
          name: "description",
          title: "SEO description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "image",
          title: "Open Graph image",
          type: "image",
          options: { hotspot: true },
          description: "Recommended size is 1200 by 630 pixels.",
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero section",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "titleRed", title: "Red title word", type: "string" }),
        defineField({ name: "titleBlack", title: "Black title word", type: "string" }),
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "primaryCtaLabel",
          title: "Primary button label",
          type: "string",
        }),
        defineField({
          name: "primaryCtaHref",
          title: "Primary button link",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary button label",
          type: "string",
        }),
        defineField({
          name: "secondaryCtaHref",
          title: "Secondary button link or section anchor",
          type: "string",
        }),
        defineField({
          name: "scrollLabel",
          title: "Scroll link accessibility label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Quick facts",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "about",
      title: "About section",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 6 }),
        defineField({ name: "quote", title: "Featured quote", type: "string" }),
        defineField({ name: "quoteAuthor", title: "Quote caption", type: "string" }),
        defineField({
          name: "photo",
          title: "Photo",
          type: "image",
          options: { hotspot: true },
          description: "Optional. If empty, the illustrated quote card is shown.",
        }),
      ],
    }),
    defineField({
      name: "contentSection",
      title: "Content section",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "headlineAccent",
          title: "Headline accent in red",
          type: "string",
        }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({
          name: "platforms",
          title: "Featured platform cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "key",
                  title: "Platform",
                  type: "string",
                  options: {
                    list: ["youtube", "tiktok", "instagram", "facebook"],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({ name: "name", title: "Display name", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                defineField({ name: "cta", title: "Button label", type: "string" }),
              ],
            }),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "community",
      title: "Community banner",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Button label", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Image gallery",
      type: "array",
      group: "gallery",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
      description: "A managed image library for future page updates and campaigns.",
    }),
    defineField({
      name: "sponsorship",
      title: "Sponsorship section",
      type: "object",
      group: "sponsorship",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),
  ],
});

export const schemaTypes = [siteSettings];
