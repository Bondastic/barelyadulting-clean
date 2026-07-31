import { db, isDatabaseConfigured } from "@/db";
import { sponsorInquiries } from "@/db/schema";
import {
  checkRateLimit,
  getClientIp,
  hashIdentifier,
  isDuplicateSubmission,
  isTrustedOrigin,
  validateSponsorSubmission,
  type SponsorFormFields,
} from "@/lib/formSecurity";

export const dynamic = "force-dynamic";

async function saveInquiry(data: SponsorFormFields, ipHash: string): Promise<void> {
  if (!isDatabaseConfigured()) {
    return;
  }

  try {
    await db.insert(sponsorInquiries).values({
      name: data.name,
      email: data.email,
      company: data.company || null,
      type: data.type,
      message: data.message,
      ipHash,
    });
  } catch {
    return;
  }
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return Response.json(
      {
        ok: false,
        error: "Please refresh the page and try again.",
      },
      { status: 403 },
    );
  }

  const ip = getClientIp(request);
  const ipHash = hashIdentifier(ip);
  const rateLimit = checkRateLimit(`sponsor:${ipHash}`);

  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.ceil(rateLimit.retryAfterMs / 1000);
    const retryAfterMinutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));

    return Response.json(
      {
        ok: false,
        error: `Too many messages were sent recently. Please try again in about ${retryAfterMinutes} minutes.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const validation = validateSponsorSubmission(body);

  if (!validation.ok && validation.botDetected) {
    // Pretend success to bots so they don't learn the honeypot was tripped.
    return Response.json({ ok: true });
  }

  if (!validation.ok) {
    return Response.json(
      { ok: false, errors: validation.errors },
      { status: 422 },
    );
  }

  if (isDuplicateSubmission(ipHash, validation.data)) {
    return Response.json(
      {
        ok: false,
        error: "That message was just sent. Please wait a minute before trying again.",
      },
      { status: 429 },
    );
  }

  // Save first. The email itself is sent client-side (Web3Forms free tier
  // rejects server-to-server requests), so this route's job is just to
  // validate, rate-limit, dedupe, and persist — the browser sends the email
  // once this responds ok:true.
  await saveInquiry(validation.data, ipHash);

  return Response.json({ ok: true });
}
