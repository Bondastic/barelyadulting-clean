"use client";

import Image from "next/image";
import { memo } from "react";
import { useInView } from "@/lib/useInView";
import type { ResolvedSiteContent } from "@/sanity/fetch";

function SunriseArt() {
  return (
    <svg viewBox="0 0 320 200" className="w-full" fill="none" aria-hidden="true">
      <circle cx="160" cy="150" r="120" fill="#FDECEC" />
      <g className="animate-sun-rays" style={{ transformOrigin: "160px 130px" }}>
        <g stroke="#F59E0B" strokeWidth="4" strokeLinecap="round">
          <line x1="160" y1="52" x2="160" y2="34" />
          <line x1="107" y1="74" x2="94" y2="61" />
          <line x1="213" y1="74" x2="226" y2="61" />
          <line x1="84" y1="126" x2="66" y2="126" />
          <line x1="236" y1="126" x2="254" y2="126" />
        </g>
      </g>
      <circle cx="160" cy="130" r="46" fill="#DC2626" />
      <circle cx="160" cy="130" r="46" fill="url(#sunGradient)" />
      <rect x="20" y="152" width="280" height="4" rx="2" fill="#211D1A" />
      <path d="M140 200 L155 156 H165 L180 200 Z" fill="#211D1A" opacity="0.85" />
      <g stroke="#FAF6F0" strokeWidth="3" strokeLinecap="round">
        <line x1="160" y1="192" x2="160" y2="184" />
        <line x1="160" y1="176" x2="160" y2="170" />
        <line x1="160" y1="164" x2="160" y2="160" />
      </g>
      <defs>
        <linearGradient id="sunGradient" x1="160" y1="84" x2="160" y2="176" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function About({ content }: { content: ResolvedSiteContent }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const { about } = content;

  return (
    <section id="about" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } transition-all duration-1000 ease-out`}
        >
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rotate-2 rounded-3xl bg-brand-red-light transition-transform duration-500 hover:rotate-0" />
              <div className="relative overflow-hidden rounded-3xl border border-ink/5 bg-cream p-8 shadow-lg shadow-ink/5">
                {content.aboutPhotoUrl ? (
                  <Image
                    src={content.aboutPhotoUrl}
                    alt={`${content.name} portrait`}
                    width={640}
                    height={640}
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-6">
                    <SunriseArt />
                  </div>
                )}
                <blockquote className="text-center text-lg font-semibold leading-relaxed text-ink">
                  &ldquo;{about.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-center text-xs font-medium uppercase tracking-widest text-ink-soft/70">
                  {about.quoteAuthor}
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full bg-brand-red-light px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
              {about.badge}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {about.headline}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {about.bio}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {content.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border border-ink/5 bg-cream p-4 text-center transition-all duration-700 hover:-translate-y-1 hover:border-brand-red/20 hover:shadow-md ${
                    isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
