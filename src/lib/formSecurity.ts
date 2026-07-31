import { createHash } from "node:crypto";

export type PartnershipType =
  | "sponsored"
  | "collab"
  | "product"
  | "affiliate"
  | "other";

export type SponsorFormFields = {
  name: string;
  email: string;
  company: string;
  type: PartnershipType;
  message: string;
  privacyAccepted: boolean;
  website: string;
  botcheck: boolean;
};

export type ValidationResult =
  | { ok: true; data: SponsorFormFields }
  | { ok: false; errors: Record<string, string>; botDetected?: boolean };

const validTypes = new Set<PartnershipType>([
  "sponsored",
  "collab",
  "product",
  "affiliate",
  "other",
]);

const rateLimitWindowMs = 15 * 60 * 1000;
const duplicateWindowMs = 60 * 1000;
const maxSubmissionsPerWindow = 4;

const rateStore = new Map<string, { count: number; resetAt: number }>();
const duplicateStore = new Map<string, number>();

function toString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stripMarkup(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ");
}

function sanitizeLine(value: unknown, maxLength: number): string {
  return stripMarkup(toString(value))
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown): string {
  return stripMarkup(toString(value))
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 2000);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isTrue(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}

export function validateSponsorSubmission(body: unknown): ValidationResult {
  const data = (body ?? {}) as Record<string, unknown>;
  const website = sanitizeLine(data.website, 160);
  const botcheck = isTrue(data.botcheck);

  if (website || botcheck) {
    return { ok: false, errors: {}, botDetected: true };
  }

  const rawType = sanitizeLine(data.type, 40) as PartnershipType;
  const type = validTypes.has(rawType) ? rawType : "other";
  const name = sanitizeLine(data.name, 160);
  const email = sanitizeLine(data.email, 254).toLowerCase();
  const company = sanitizeLine(data.company, 200);
  const message = sanitizeMessage(data.message);
  const privacyAccepted = isTrue(data.privacyAccepted);

  const errors: Record<string, string> = {};

  if (name.length < 2) {
    errors.name = "Please add your name.";
  }

  if (!isEmail(email)) {
    errors.email = "That email does not look right.";
  }

  if (message.length < 20) {
    errors.message = "A few more details would help.";
  }

  if (message.length > 2000) {
    errors.message = "Please keep your message under 2,000 characters.";
  }

  if (!privacyAccepted) {
    errors.privacy = "Please confirm that you have read and accept the Privacy Policy.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      type,
      message,
      privacyAccepted,
      website,
      botcheck,
    },
  };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cloudflareIp = request.headers.get("cf-connecting-ip");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    cloudflareIp?.trim() ||
    "unknown"
  );
}

export function hashIdentifier(value: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "barely-adulting-rate-limit";
  return createHash("sha256")
    .update(`${salt}:${value}`)
    .digest("hex")
    .slice(0, 64);
}

function cleanupStores(now: number): void {
  for (const [key, entry] of rateStore.entries()) {
    if (entry.resetAt <= now) {
      rateStore.delete(key);
    }
  }

  for (const [key, timestamp] of duplicateStore.entries()) {
    if (now - timestamp > duplicateWindowMs) {
      duplicateStore.delete(key);
    }
  }
}

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfterMs: number;
} {
  const now = Date.now();
  cleanupStores(now);
  const current = rateStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateStore.set(identifier, { count: 1, resetAt: now + rateLimitWindowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (current.count >= maxSubmissionsPerWindow) {
    return { allowed: false, retryAfterMs: current.resetAt - now };
  }

  current.count += 1;
  rateStore.set(identifier, current);
  return { allowed: true, retryAfterMs: 0 };
}

export function isDuplicateSubmission(
  identifier: string,
  data: Pick<SponsorFormFields, "email" | "message" | "type">,
): boolean {
  const now = Date.now();
  cleanupStores(now);
  const fingerprint = hashIdentifier(
    `${identifier}:${data.email}:${data.type}:${data.message}`,
  );
  const lastSeen = duplicateStore.get(fingerprint);

  if (lastSeen && now - lastSeen < duplicateWindowMs) {
    return true;
  }

  duplicateStore.set(fingerprint, now);
  return false;
}

export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const host = request.headers.get("host");

    if (host && originUrl.host === host) {
      return true;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl && originUrl.origin === new URL(siteUrl).origin) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
