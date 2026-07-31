import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteContent } from "@/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Barely Adulting POV, including business inquiry forms, sponsorship requests, and Web3Forms processing.",
  alternates: {
    canonical: "/privacy",
  },
};

export default async function PrivacyPage() {
  const content = await getSiteContent();
  const effectiveDate = "January 1, 2026";

  return (
    <>
      <Navbar content={content} />
      <main id="main-content" className="bg-cream pt-28">
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red-light/50 via-cream to-cream" />
            <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-sun/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft shadow-sm">
              Legal
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              A clear look at what information is collected when you contact {content.name} and how it is handled.
            </p>
            <p className="mt-4 text-sm text-ink-soft/70">Effective date: {effectiveDate}</p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-ink/5 bg-white p-6 shadow-lg shadow-ink/5 sm:p-10">
            <div className="space-y-10 text-ink-soft">
              <div>
                <h2 className="text-2xl font-extrabold text-ink">Who this policy covers</h2>
                <p className="mt-3 leading-relaxed">
                  This Privacy Policy applies to visitors who use this website, including people who submit business inquiries, sponsorship requests, collaboration ideas, or general messages through the contact form.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Information collected</h2>
                <p className="mt-3 leading-relaxed">
                  When you submit the contact form, the website may collect your name, email address, company or brand name, partnership type, message, and confirmation that you accepted this Privacy Policy. If you email directly, the information you choose to include in that email is collected as well.
                </p>
                <p className="mt-3 leading-relaxed">
                  The website also uses basic technical information, such as IP-derived rate limiting data and request details, to protect the form from spam and abuse. When stored for security, IP information is hashed where practical and used only for abuse prevention.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">How information is used</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                  <li>To respond to your message or business inquiry.</li>
                  <li>To evaluate sponsorship, collaboration, or brand partnership opportunities.</li>
                  <li>To prevent spam, automated abuse, duplicate submissions, and malicious content.</li>
                  <li>To keep a reasonable record of business communication.</li>
                  <li>To improve the reliability and security of the website.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Web3Forms</h2>
                <p className="mt-3 leading-relaxed">
                  This website uses Web3Forms to deliver contact form submissions to the configured inbox. Form details are sent to Web3Forms for the purpose of email delivery and spam protection. Web3Forms processes that information according to its own terms and privacy practices.
                </p>
                <p className="mt-3 leading-relaxed">
                  The Web3Forms access key is handled on the server when configured, and private keys are not exposed in the browser bundle.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Data retention</h2>
                <p className="mt-3 leading-relaxed">
                  Business inquiry records may be kept for as long as reasonably needed to respond, manage potential partnerships, keep business records, and protect the website. In most cases, inquiries are reviewed periodically and are not kept longer than necessary. Short-term rate limiting data is used only to prevent abuse.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Sharing information</h2>
                <p className="mt-3 leading-relaxed">
                  Personal information is not sold. Information may be shared with service providers that help operate the website, deliver email, host the site, manage content, or protect against spam. Information may also be disclosed if required by law or needed to protect rights, safety, or security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Your choices and rights</h2>
                <p className="mt-3 leading-relaxed">
                  You can request access to, correction of, or deletion of personal information you submitted through the website. You can also ask that a business inquiry no longer be used for follow-up. Some records may need to be retained when required for legal, security, or legitimate business reasons.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Children&apos;s privacy</h2>
                <p className="mt-3 leading-relaxed">
                  This website is intended for general audiences and business communication. It is not designed to knowingly collect personal information from children under 13. If you believe a child has submitted personal information, please get in touch so it can be reviewed and removed if appropriate.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Security</h2>
                <p className="mt-3 leading-relaxed">
                  Reasonable technical and organizational measures are used to protect submissions, including server-side validation, sanitization, rate limiting, bot protection, and security headers. No website or email system can be guaranteed to be completely secure, but the form is designed to reduce common risks.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Contact</h2>
                <p className="mt-3 leading-relaxed">
                  For privacy questions, requests, or business communication, email{" "}
                  <a
                    href={`mailto:${content.email}`}
                    className="font-semibold text-brand-red underline underline-offset-2 transition-colors hover:text-brand-red-dark"
                  >
                    {content.email}
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-2xl bg-cream p-5 text-sm leading-relaxed text-ink-soft">
                <p>
                  This policy may be updated from time to time. The latest version will always be posted on this page.
                </p>
                <Link
                  href="/#sponsor"
                  className="mt-3 inline-flex font-bold text-brand-red underline underline-offset-2 transition-colors hover:text-brand-red-dark"
                >
                  Back to the contact form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer content={content} />
    </>
  );
}
