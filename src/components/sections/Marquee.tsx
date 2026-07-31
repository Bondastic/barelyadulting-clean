import type { ResolvedSiteContent } from "@/sanity/fetch";

export default function Marquee({ content }: { content: ResolvedSiteContent }) {
  return (
    <div className="relative overflow-hidden bg-brand-red py-4" aria-label="Barely Adulting values">
      <div className="animate-marquee flex whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {content.marqueeItems.map((item, index) => (
              <span key={`${copy}-${item}-${index}`} className="flex items-center">
                <span className="mx-5 text-sm font-bold uppercase tracking-widest text-white">
                  {item}
                </span>
                <svg
                  className="h-2 w-2 text-white/60"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
