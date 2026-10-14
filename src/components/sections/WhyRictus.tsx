"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/content/images";

const HIGHLIGHTS = [
  {
    title: "Rare precision",
    body: "Reviewers say they've rarely seen an artist this precise and this dedicated to her work. Lines land exactly where they should.",
    tone: "dark",
  },
  {
    title: "Quality that brings you back",
    body: "Some clients are already on their third tattoo here. Happy skin tends to come back for more.",
    tone: "grin",
  },
  {
    title: "A vibe worth sitting for",
    body: "Super friendly people in a beautifully decorated space. Time in the chair goes quicker than you think.",
    tone: "dark",
  },
  {
    title: "Everyone's welcome",
    body: "A women-led, LGBTQ+ friendly studio. Come as you are and leave grinning.",
    tone: "cream",
  },
] as const;

const toneClass = {
  dark: "bg-ink-2 text-cream ring-1 ring-line",
  grin: "bg-grin text-ink",
  cream: "bg-cream text-ink",
};

export function WhyRictus() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="relative py-24 md:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="why-title" className="display text-[clamp(2.6rem,6vw,5.25rem)]">
              Why clients come back for tattoo number <span className="text-grin">three.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-mute">
              It&apos;s all in the Google reviews: careful hands, a warm room and results people are happy to show off.
            </p>
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <span className="relative size-24 overflow-hidden rounded-full ring-1 ring-line">
                <Image
                  src={images.logo.src}
                  alt={images.logo.alt}
                  fill
                  sizes="96px"
                  className="scale-[1.6] object-cover object-[50%_58%]"
                />
              </span>
              <SmileOrnament className="h-8 w-32 text-grin" />
            </div>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {HIGHLIGHTS.map((h, i) => (
            <motion.li
              key={h.title}
              className={`reveal flex min-h-64 flex-col justify-between rounded-[var(--radius-card)] p-7 md:p-8 ${toneClass[h.tone]} ${i % 2 === 1 ? "sm:translate-y-16" : ""}`}
              initial={reduce ? false : { opacity: 0, x: i % 2 ? 90 : -90, y: 110, rotate: i % 2 ? 7 : -7 }}
              whileInView={{
                opacity: 1,
                // A curved path: swing past the target, then settle precisely.
                x: [i % 2 ? 90 : -90, i % 2 ? -12 : 12, 0],
                y: [110, -18, 0],
                rotate: [i % 2 ? 7 : -7, i % 2 ? -2 : 2, 0],
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 1.1,
                delay: (i % 2) * 0.12 + Math.floor(i / 2) * 0.08,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.62, 1],
                opacity: { duration: 0.4 },
              }}
              whileHover={reduce ? undefined : { rotate: i % 2 ? 1.2 : -1.2, y: -6 }}
            >
              <SmileOrnament className={`h-6 w-16 ${h.tone === "dark" ? "text-grin" : "text-ink/70"}`} />
              <div className="mt-10">
                <h3 className="display text-[1.9rem] md:text-[2.2rem]">{h.title}</h3>
                <p className={`mt-3 leading-relaxed ${h.tone === "dark" ? "text-mute" : "text-ink/80"}`}>{h.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The recurring Rictus ornament: a smile drawn as a single confident line. */
export function SmileOrnament({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 24" className={className} fill="none">
      <path d="M3 6 Q32 34 61 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M2 3.5 5 7.5M62 3.5 59 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
