"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import { messages, navLinks } from "@/content/site";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";

const WORD = "Rictus".split("");

export function Nav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    if (next !== scrolled) setScrolled(next);
  });

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="shell relative"
        animate={{ y: scrolled ? 8 : 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <nav aria-label="Main" className="relative flex h-14 items-center justify-between gap-4 px-2 md:h-16 lg:px-3">
          {/* Solid pill that grows in behind the bar once you scroll. */}
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-ink/85 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)] ring-1 ring-line backdrop-blur-xl"
            initial={false}
            animate={{ opacity: scrolled || open ? 1 : 0, scaleX: scrolled || open ? 1 : 0.94, scaleY: scrolled || open ? 1 : 1.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          />

          <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2" aria-label="Rictus Tattoo, back to top">
            <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-cream/15 md:size-10">
              <Image src={images.logo.src} alt="" fill sizes="40px" className="scale-[1.9] object-cover object-[50%_58%]" loading="eager" />
            </span>
            <span className="display flex overflow-hidden pb-1 text-[1.6rem] leading-none md:text-[1.75rem]" translate="no" aria-hidden>
              {WORD.map((ch, i) => (
                <motion.span
                  key={i}
                  className="reveal inline-block"
                  initial={reduce ? false : { y: "110%", rotate: i % 2 ? 14 : -14 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 15, delay: 0.85 + i * 0.055 }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block rounded-full px-3 py-2 text-[0.92rem] text-cream/80 transition-colors hover:text-cream"
                >
                  {l.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 40 8"
                    className="absolute inset-x-3 bottom-0.5 h-1.5 w-[calc(100%-1.5rem)] overflow-visible"
                  >
                    <path
                      d="M1 2 Q20 9 39 2"
                      fill="none"
                      stroke="var(--color-grin)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      pathLength={1}
                      className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-[var(--ease-precise)] group-hover:[stroke-dashoffset:0]"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <CtaButton href={waLink(messages.book)}>Book on WhatsApp</CtaButton>
            </span>
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full bg-cream/10 ring-1 ring-cream/15 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-cream"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-cream"
                  animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-10 pt-28 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-1.5 text-[clamp(2.4rem,11vw,4rem)] text-cream active:text-grin"
                    initial={reduce ? false : { y: "105%", rotate: 3 }}
                    animate={{ y: "0%", rotate: 0 }}
                    exit={reduce ? undefined : { y: "105%", transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.18 + i * 0.05 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
            >
              <CtaButton href={waLink(messages.book)} size="lg">
                Book on WhatsApp
              </CtaButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
