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
                  This Privacy Policy applies to visitors who use this website (&quot;the Site&quot;), including
                  people who submit business inquiries, sponsorship requests, collaboration ideas, or general
                  messages through the contact form, or who email the Site directly.
                </p>
                <p className="mt-3 leading-relaxed">
                  By using this Site, you acknowledge the practices described in this policy. If you do not agree
                  with these practices, please do not submit information through the contact form or email the
                  Site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Who is responsible for your information</h2>
                <p className="mt-3 leading-relaxed">
                  {content.name} operates this Site and is the party responsible for the information described in
                  this policy (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). Questions or requests can be sent
                  to the contact address at the bottom of this page.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Information we collect</h2>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">Information you provide directly: </span>
                  When you submit the contact form, we may collect your name, email address, company or brand
                  name, partnership type, message content, and confirmation that you accepted this Privacy Policy.
                  If you email us directly, we collect whatever information you choose to include in that email.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">Information collected automatically: </span>
                  We use basic technical information, such as an IP-derived rate-limiting identifier and request
                  metadata, to protect the form from spam and abuse. Where stored, IP-derived data is hashed where
                  practical and used only for abuse prevention, not for tracking or profiling individuals.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">Cookies and similar technologies: </span>
                  This Site does not currently use advertising or analytics cookies. If that changes in the
                  future, this policy will be updated to describe what is used and to provide any consent
                  mechanism required in your region.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Why we process this information</h2>
                <p className="mt-3 leading-relaxed">
                  Where applicable law requires a stated legal basis (for example, under the EU/UK GDPR), we
                  process your information on these grounds:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                  <li>
                    <span className="font-semibold text-ink">Consent</span> &mdash; you provide your information
                    voluntarily and confirm acceptance of this policy before submitting the form.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">Legitimate interests</span> &mdash; responding to
                    inquiries, evaluating partnership opportunities, and protecting the Site against spam and
                    abuse are legitimate business interests, balanced against your rights.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">Legal obligation</span> &mdash; where retention or
                    disclosure is required by law.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">How information is used</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                  <li>To respond to your message or business inquiry.</li>
                  <li>To evaluate sponsorship, collaboration, or brand partnership opportunities.</li>
                  <li>To prevent spam, automated abuse, duplicate submissions, and malicious content.</li>
                  <li>To keep a reasonable record of business communication.</li>
                  <li>To improve the reliability and security of the Site.</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  We do not use the information collected through this form for advertising, resale, or
                  third-party marketing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Third-party service providers</h2>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">Web3Forms</span> &mdash; This Site uses Web3Forms to
                  deliver contact form submissions to our inbox. Form details are transmitted to Web3Forms for the
                  purpose of email delivery and spam protection. Web3Forms processes that information according
                  to its own privacy practices, which we encourage you to review on their website. The Web3Forms
                  access key used to submit the form is a public-facing key by design (not a secret credential);
                  it does not expose your submitted data to unrelated third parties beyond the delivery function
                  described here.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">Hosting and infrastructure</span> &mdash; The Site is
                  hosted using standard third-party infrastructure providers, which may incidentally process
                  technical request data (such as IP addresses) as part of normal web hosting operations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">International data transfers</h2>
                <p className="mt-3 leading-relaxed">
                  Because service providers such as Web3Forms and our hosting provider may operate servers outside
                  your country of residence, your information may be transferred to and processed in countries
                  other than your own, including the United States. Where required, we rely on the safeguards
                  those providers offer (such as standard contractual clauses or equivalent mechanisms) for such
                  transfers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Data retention</h2>
                <p className="mt-3 leading-relaxed">
                  Business inquiry records are kept for as long as reasonably needed to respond, manage potential
                  partnerships, maintain business records, and protect the Site, and are reviewed periodically.
                  Short-term rate-limiting data is retained only as long as needed to prevent abuse and is not
                  kept indefinitely.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Sharing information</h2>
                <p className="mt-3 leading-relaxed">
                  We do not sell personal information. Information may be shared with:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                  <li>
                    Service providers that help operate the Site, deliver email, host content, or protect against
                    spam (such as Web3Forms).
                  </li>
                  <li>
                    Parties as required by law, legal process, or to protect rights, safety, or security.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Your rights and choices</h2>
                <p className="mt-3 leading-relaxed">
                  Depending on where you live, you may have rights to access, correct, delete, or restrict the use
                  of personal information you have submitted, and to object to certain processing. You may also
                  withdraw consent at any time, which will not affect processing that already occurred before
                  withdrawal.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">
                    If you are in the European Economic Area or United Kingdom (GDPR / UK GDPR):
                  </span>{" "}
                  You have the rights described above, plus the right to data portability and the right to lodge
                  a complaint with your local data protection authority.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="font-semibold text-ink">If you are a California resident (CCPA / CPRA):</span>{" "}
                  You have the right to know what personal information is collected, to request deletion, to
                  correct inaccurate information, and to not be discriminated against for exercising these
                  rights. This Site does not sell or &quot;share&quot; personal information as defined under
                  California law.
                </p>
                <p className="mt-3 leading-relaxed">
                  To exercise any of these rights, contact us using the details below. We may need to verify your
                  identity before completing certain requests.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Children&apos;s privacy</h2>
                <p className="mt-3 leading-relaxed">
                  This Site is intended for a general, adult audience and business communication. It is not
                  directed at children and we do not knowingly collect personal information from children under
                  13 (or the relevant minimum age in your jurisdiction). If you believe a child has submitted
                  personal information through this Site, please contact us so it can be reviewed and removed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Security</h2>
                <p className="mt-3 leading-relaxed">
                  We use reasonable technical and organizational measures to protect submissions, including
                  server-side validation, input sanitization, rate limiting, bot protection, and standard security
                  headers. No website or email system can be guaranteed to be completely secure, but the form is
                  designed to reduce common risks.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-ink">Changes to this policy</h2>
                <p className="mt-3 leading-relaxed">
                  This policy may be updated from time to time to reflect changes in our practices or applicable
                  law. The effective date above reflects the most recent revision, and the latest version will
                  always be posted on this page.
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
                  This policy may be updated from time to time. The latest version will always be posted on this
                  page.
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
