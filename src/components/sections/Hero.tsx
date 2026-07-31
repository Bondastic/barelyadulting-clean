import Image from "next/image";
import type { ResolvedSiteContent } from "@/sanity/fetch";

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Hero({ content }: { content: ResolvedSiteContent }) {
  const { hero } = content;
  const primaryHref = hero.primaryCtaHref || content.socials.youtube;
  const secondaryHref = hero.secondaryCtaHref || "#sponsor";
  const primaryIsExternal = isExternalLink(primaryHref);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red-light/60 via-cream to-cream" />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-sun/10 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-brand-red/5 blur-3xl" />
        <div className="absolute bottom-10 -right-24 h-80 w-80 rounded-full bg-sun/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(33,29,26,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
        <div className="mb-8 inline-block animate-scale-in">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-white/70 blur-2xl" />
            <Image
              src={content.logoUrl}
              alt={`${content.name} logo`}
              width={176}
              height={176}
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
              className="relative mx-auto h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-xl shadow-ink/10 sm:h-40 sm:w-40 md:h-44 md:w-44"
            />
          </div>
        </div>

        <div className="mb-6">
          <h1
            className="animate-fade-in-up text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "150ms" }}
          >
            <span className="text-brand-red">{hero.titleRed}</span>{" "}
            <span className="relative inline-block">
              {hero.titleBlack}
              <svg
                className="absolute -bottom-3 left-0 w-full text-brand-red sm:-bottom-4"
                viewBox="0 0 300 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className="animate-draw-line"
                  d="M4 11 C 60 4, 130 13, 176 8 S 270 6, 296 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        <p
          className="animate-fade-in-up mx-auto mb-4 mt-8 max-w-2xl text-lg font-medium text-ink-soft sm:text-xl md:text-2xl"
          style={{ animationDelay: "300ms" }}
        >
          {hero.tagline}
        </p>

        <p
          className="animate-fade-in-up mb-10 text-sm text-ink-soft/80"
          style={{ animationDelay: "400ms" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="animate-fade-in-up flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animationDelay: "500ms" }}
        >
          <a
            href={primaryHref}
            target={primaryIsExternal ? "_blank" : undefined}
            rel={primaryIsExternal ? "noopener noreferrer" : undefined}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-red/30"
          >
            <svg className="relative z-10 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="relative z-10">{hero.primaryCtaLabel}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href={secondaryHref}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-8 py-3.5 text-sm font-bold text-ink backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
          >
            {hero.secondaryCtaLabel}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5" />
            </svg>
          </a>
        </div>

        <div className="animate-fade-in mt-16" style={{ animationDelay: "900ms" }}>
          <a href="#about" aria-label={hero.scrollLabel} className="inline-block">
            <span className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border-2 border-ink/20 pt-1.5">
              <span className="h-1.5 w-1 animate-bounce rounded-full bg-ink/40" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
