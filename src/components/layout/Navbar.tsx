"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { ResolvedSiteContent } from "@/sanity/fetch";

export default function Navbar({ content }: { content: ResolvedSiteContent }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const resolvedNav = useMemo(
    () =>
      content.nav.map((item) => ({
        ...item,
        href:
          item.href.startsWith("#") && pathname !== "/"
            ? `/${item.href}`
            : item.href,
      })),
    [content.nav, pathname],
  );

  const sponsorHref = pathname === "/" ? "#sponsor" : "/#sponsor";
  const homeHref = pathname === "/" ? "#home" : "/#home";

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const mobileMenu = (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-[49] flex flex-col items-center justify-center gap-8 overflow-y-auto overscroll-contain bg-cream px-6 py-24 transition-all duration-500 md:hidden ${
        mobileMenuOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {resolvedNav.map((item, index) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setMobileMenuOpen(false)}
          className={`text-2xl font-bold text-ink transition-all duration-500 hover:text-brand-red ${
            mobileMenuOpen ? "animate-fade-in-up" : ""
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {item.label}
          {item.badge && (
            <span className="ml-2 rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
      <Link
        href={sponsorHref}
        onClick={() => setMobileMenuOpen(false)}
        className="mt-4 rounded-full bg-brand-red px-8 py-3 text-lg font-bold text-white shadow-lg shadow-brand-red/25 transition-transform hover:scale-105"
      >
        Work with me
      </Link>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || mobileMenuOpen
            ? "border-b border-ink/5 bg-cream/90 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            href={homeHref}
            className="group flex items-center gap-3 transition-transform hover:scale-[1.03]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src={content.logoUrl}
              alt={`${content.name} logo`}
              width={44}
              height={44}
              sizes="44px"
              className="h-10 w-10 rounded-full border border-ink/10 bg-white object-cover shadow-sm sm:h-11 sm:w-11"
            />
            <span className="hidden text-lg font-extrabold tracking-tight sm:block">
              <span className="text-brand-red">BARELY</span>
              <span className="text-ink">ADULTING</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {resolvedNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1 rounded-full bg-brand-red px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                    {item.badge}
                  </span>
                )}
                <span className="absolute inset-x-2 bottom-0 h-0.5 scale-x-0 rounded-full bg-brand-red transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              href={sponsorHref}
              className="ml-4 rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-red/25 transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-md"
            >
              Work with me
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="flex flex-col gap-1.5 transition-all" aria-hidden="true">
              <span
                className={`block h-0.5 w-6 rounded-full bg-ink transition-all ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-ink transition-all ${
                  mobileMenuOpen ? "scale-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-ink transition-all ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
