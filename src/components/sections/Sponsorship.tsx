"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { useInView } from "@/lib/useInView";
import type { ResolvedSiteContent } from "@/sanity/fetch";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<"name" | "email" | "message" | "privacy" | "form", string>
>;

type ClientPayload = {
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
  privacyAccepted: boolean;
  website: string;
  botcheck: boolean;
};

const inputClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder-ink-soft/40 shadow-sm outline-none transition-all focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/15";

const partnershipLabels: Record<string, string> = {
  sponsored: "Sponsored content",
  collab: "Collaboration",
  product: "Product placement",
  affiliate: "Affiliate partnership",
  other: "Other or custom",
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function validatePayload(payload: ClientPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (payload.name.trim().length < 2) {
    errors.name = "Please add your name.";
  }

  if (!isEmail(payload.email.trim())) {
    errors.email = "That email does not look right.";
  }

  if (payload.message.trim().length < 20) {
    errors.message = "A few more details would help.";
  }

  if (!payload.privacyAccepted) {
    errors.privacy = "Please confirm that you have read and accept the Privacy Policy.";
  }

  return errors;
}

// Sends the actual email via Web3Forms, directly from the browser.
// Web3Forms' free tier only accepts client-side requests, so this call
// cannot be moved server-side without a paid plan.
async function sendToWeb3Forms(payload: ClientPayload): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set");
    return false;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "Barely Adulting website",
        subject: `Business inquiry from ${payload.name}`,
        replyto: payload.email,
        name: payload.name,
        email: payload.email,
        company: payload.company || "Not provided",
        partnership_type: partnershipLabels[payload.type] ?? payload.type,
        message: payload.message,
        privacy_policy_accepted: "Yes",
      }),
    });

    const json = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;

    return response.ok && json?.success === true;
  } catch {
    return false;
  }
}

function Sponsorship({ content }: { content: ResolvedSiteContent }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const { sponsorship } = content;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: ClientPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      type: String(data.get("type") ?? "other"),
      message: String(data.get("message") ?? "").trim(),
      privacyAccepted: data.get("privacy") === "on",
      website: String(data.get("website") ?? ""),
      botcheck: data.get("botcheck") === "on",
    };

    const clientErrors = validatePayload(payload);

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setServerError(null);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setServerError(null);

    try {
      // Step 1: validate, rate-limit, dedupe, and persist via our own API.
      const response = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (response.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("error");
        return;
      }

      if (!response.ok || !json.ok) {
        setServerError(
          json.error || "Something went wrong. Please try again in a minute.",
        );
        setStatus("error");
        return;
      }

      // Step 2: our API says this submission is legitimate — now actually
      // send the email, from the browser, since Web3Forms requires that.
      const emailed = await sendToWeb3Forms(payload);

      if (!emailed) {
        setServerError(
          `The contact form is temporarily unavailable. Please email ${content.email} directly.`,
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setServerError("Network hiccup, please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="sponsor" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } transition-all duration-1000 ease-out`}
        >
          <span className="inline-block rounded-full bg-brand-red-light px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            {sponsorship.badge}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {sponsorship.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            {sponsorship.description}
          </p>
        </div>

        <div
          className={`mx-auto mt-16 max-w-2xl rounded-3xl border border-ink/5 bg-white p-6 shadow-lg shadow-ink/5 sm:p-10 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } transition-all duration-1000 ease-out`}
          style={{ transitionDelay: "300ms" }}
        >
          {status === "success" ? (
            <div className="py-10 text-center" role="status" aria-live="polite">
              <div className="relative mx-auto mb-5 flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-brand-red-light">
                <span className="absolute inset-0 rounded-full bg-brand-red/10 animate-ping" aria-hidden="true" />
                <svg
                  className="relative h-8 w-8 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path className="animate-draw-line" strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-ink">Message received</h3>
              <p className="mx-auto mt-2 max-w-sm text-ink-soft">
                Thanks for reaching out. You will hear back within a couple of days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setErrors({});
                  setServerError(null);
                }}
                className="mt-6 rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                <input name="botcheck" type="checkbox" tabIndex={-1} />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${inputClasses} ${errors.name ? "border-brand-red" : "border-ink/10"}`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-brand-red">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputClasses} ${errors.email ? "border-brand-red" : "border-ink/10"}`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-brand-red">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-semibold text-ink">
                  Company / brand <span className="font-normal text-ink-soft/60">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your brand name"
                  className={`${inputClasses} border-ink/10`}
                />
              </div>

              <div>
                <label htmlFor="type" className="mb-2 block text-sm font-semibold text-ink">
                  Partnership type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue="sponsored"
                  className={`${inputClasses} border-ink/10`}
                >
                  <option value="sponsored">Sponsored content</option>
                  <option value="collab">Collaboration</option>
                  <option value="product">Product placement</option>
                  <option value="affiliate">Affiliate partnership</option>
                  <option value="other">Other / custom</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                  Tell me about your idea
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What do you have in mind? Timeline, goals, product, the more detail the better."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClasses} resize-y ${errors.message ? "border-brand-red" : "border-ink/10"}`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-brand-red">
                    {errors.message}
                  </p>
                )}
              </div>

              <div
                className={`rounded-xl border px-4 py-3 ${
                  errors.privacy ? "border-brand-red bg-brand-red-light/40" : "border-ink/10 bg-cream/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={errors.privacy ? "privacy-error" : "privacy-help"}
                    className="mt-1 h-4 w-4 rounded border-ink/20 text-brand-red accent-brand-red focus:ring-brand-red/20"
                  />
                  <div>
                    <label htmlFor="privacy" className="text-sm font-medium leading-relaxed text-ink">
                      I confirm that I have read and accept the{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-brand-red underline underline-offset-2 transition-colors hover:text-brand-red-dark"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </label>
                    <p id="privacy-help" className="mt-1 text-xs text-ink-soft/70">
                      This consent is required before submitting a business inquiry.
                    </p>
                  </div>
                </div>
                {errors.privacy && (
                  <p id="privacy-error" className="mt-2 text-xs text-brand-red">
                    {errors.privacy}
                  </p>
                )}
              </div>

              {serverError && (
                <p
                  className="rounded-xl bg-brand-red-light px-4 py-3 text-sm text-brand-red-dark"
                  role="alert"
                >
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative w-full overflow-hidden rounded-xl bg-brand-red px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-red/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "submitting" ? "Sending..." : "Send message"}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </form>
          )}

          {status !== "success" && (
            <p className="mt-4 text-center text-xs text-ink-soft/70">
              Or reach out directly at{" "}
              <a
                href={`mailto:${content.email}`}
                className="font-medium text-brand-red underline underline-offset-2 transition-colors hover:text-brand-red-dark"
              >
                {content.email}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(Sponsorship);
