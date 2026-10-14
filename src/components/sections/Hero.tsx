"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { images } from "@/content/images";
import { business, messages } from "@/content/site";
import { grinClosed, grinFull, grinOpen, smilePath } from "@/lib/grin";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { StarIcon } from "../ui/Icons";

const HEADLINE = ["Tattoos", "that", "make", "you"];

const GRIN_CSS = `
.hero-smile { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .hero-grin { animation: hero-grin 1.25s cubic-bezier(0.65, 0, 0.2, 1) 0.6s both; }
  .hero-smile {
    stroke-dasharray: 1; stroke-dashoffset: 1;
    animation: hero-smile-draw 0.7s cubic-bezier(0.7, 0, 0.3, 1) 0.05s forwards, hero-smile-fade 0.5s ease 1.05s forwards;
  }
}
@keyframes hero-grin {
  0% { clip-path: ${grinClosed()}; }
  42% { clip-path: ${grinOpen()}; }
  100% { clip-path: ${grinFull()}; }
}
@keyframes hero-smile-draw { 0% { opacity: 1; stroke-dashoffset: 1; } 100% { opacity: 1; stroke-dashoffset: 0; } }
@keyframes hero-smile-fade { from { opacity: 1; stroke-dashoffset: 0; } to { opacity: 0; stroke-dashoffset: 0; } }
`;

const pop = (delay: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.85, rotate: -4 },
  animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  transition: { type: "spring" as const, stiffness: 380, damping: 17, delay },
});

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14]);

  const m = (delay: number) => (reduce ? {} : pop(delay));

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Photo, opened by the grin. */}
      {/* The intro runs as CSS keyframes (same polygons) so it starts on first
          paint instead of waiting for hydration, which keeps LCP fast. */}
      <style>{GRIN_CSS}</style>
      <div className="hero-grin absolute inset-0 -z-20">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            quality={80}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[50%_28%]"
          />
        </motion.div>
      </div>

      {/* Scrims keep the cream type above WCAG AA over any part of the photo. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/85 via-ink/30 to-transparent md:block" />

      {/* The smile line that draws itself, then opens into the grin. */}
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 size-full">
        <path
          className="hero-smile"
          d={smilePath()}
          pathLength={1}
          fill="none"
          stroke="var(--color-grin)"
          strokeWidth={0.3}
          strokeLinecap="round"
        />
      </svg>

      <div className="shell mt-auto pb-10 pt-32 md:pb-16 lg:pb-20">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <motion.a
            href="#reviews"
            {...m(1.25)}
            className="reveal inline-flex min-h-9 items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 text-sm font-medium text-ink"
          >
            <span>{business.rating}</span>
            <StarIcon width={14} height={14} className="text-grin-deep" />
            <span>on Google</span>
            <span aria-hidden className="text-ink/40">
              ·
            </span>
            <span>{business.reviewCount} reviews</span>
          </motion.a>
          <motion.span
            {...m(1.35)}
            className="reveal inline-flex min-h-9 items-center rounded-full bg-ink/50 px-3.5 py-1.5 text-sm text-cream ring-1 ring-inset ring-cream/25 backdrop-blur-sm"
          >
            Women-led
          </motion.span>
          <motion.span
            {...m(1.42)}
            className="reveal inline-flex min-h-9 items-center rounded-full bg-ink/50 px-3.5 py-1.5 text-sm text-cream ring-1 ring-inset ring-cream/25 backdrop-blur-sm"
          >
            LGBTQ+ friendly
          </motion.span>
        </div>

        <h1 className="display max-w-[14ch] text-[clamp(3.1rem,10.5vw,8.75rem)] text-cream">
          {HEADLINE.map((w, i) => (
            <Fragment key={w}>
              <span className="mask-word">
                <span style={{ ["--i" as string]: i }}>{w}</span>
              </span>{" "}
            </Fragment>
          ))}
          <span className="mask-word relative">
            <span style={{ ["--i" as string]: HEADLINE.length }} className="text-grin">
              grin.
            </span>
          </span>
        </h1>

        <p className="fade-rise mt-6 max-w-[34rem] text-lg leading-relaxed text-cream/85 md:text-xl" style={{ ["--d" as string]: "350ms" }}>
          Precise, quality tattoos and piercings in Playa del Carmen, from a women-led studio in Gonzalo Guerrero.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <motion.div {...m(1.5)} className="reveal">
            <CtaButton href={waLink(messages.book)} size="lg" magnetic>
              Book on WhatsApp
            </CtaButton>
          </motion.div>
          <motion.div {...m(1.6)} className="reveal">
            <CtaButton href="#work" variant="ghost" icon="arrow" size="lg">
              See the work
            </CtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
