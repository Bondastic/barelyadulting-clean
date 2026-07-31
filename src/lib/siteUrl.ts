export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://barelyadultingpov.com").replace(
    /\/$/,
    "",
  );
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${path}`;
}
