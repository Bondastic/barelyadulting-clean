import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export type SanityImageSource =
  | string
  | { _ref: string }
  | { asset?: { _ref?: string; _id?: string } };

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
const readToken = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: !readToken,
      token: readToken || undefined,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(
  source: SanityImageSource | undefined | null,
  options: { width?: number; height?: number } = {},
): string | null {
  if (!builder || !source) {
    return null;
  }

  try {
    let image = builder.image(source).auto("format").fit("max");

    if (options.width) {
      image = image.width(options.width);
    }

    if (options.height) {
      image = image.height(options.height);
    }

    return image.url();
  } catch {
    return null;
  }
}
