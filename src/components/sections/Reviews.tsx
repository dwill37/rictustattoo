"use client";

import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { business, reviews } from "@/content/site";
import { safeHref } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { StarIcon } from "../ui/Icons";

const TILTS = [-4, 3, -2.5];

export function Reviews() {
  const reduce = useReducedMotion();
  const ratingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ratingRef, { once: true, amount: 0.6 });

  const value = useSpring(reduce ? business.rating : 0, { stiffness: 55, damping: 18, restDelta: 0.001 });
  const display = useTransform(value, (v) => v.toFixed(1));
  // Stars fill to exactly 4.9 / 5 = 98%.
  const fill = useTransform(value, (v) => `inset(0 ${100 - (v / 5) * 100}% 0 0)`);

  useEffect(() => {
    if (inView) value.set(business.rating);
  }, [inView, value]);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="on-cream relative bg-cream py-24 text-ink md:py-36">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="reviews-title" className="display text-[clamp(2.6rem,5.5vw,5rem)]">
            Grins, in their own <span className="text-grin-deep">words.</span>
          </h2>

          <div
            ref={ratingRef}
            className="mt-12"
            role="img"
            aria-label={`Rated ${business.rating} out of 5, based on ${business.reviewCount} Google reviews`}
          >
            <div aria-hidden className="display text-[clamp(6.5rem,18vw,13rem)] leading-[0.8] tabular-nums">
              <motion.span>{display}</motion.span>
            </div>
            <div aria-hidden className="relative mt-5 inline-flex">
              <Stars className="text-ink/15" />
              <motion.div className="absolute inset-0" style={{ clipPath: fill }}>
                <Stars className="text-grin-deep" />
              </motion.div>
            </div>
            <p aria-hidden className="mt-3 text-ink/70">
              Based on {business.reviewCount} Google reviews
            </p>
          </div>

          <div className="mt-10">
            <CtaButton href={safeHref(business.googleReviewsUrl)} variant="ink" icon="arrow">
              Read all {business.reviewCount} reviews on Google
            </CtaButton>
          </div>
        </div>

        <ul className="flex flex-col gap-6 lg:col-span-7 lg:pt-8">
          {reviews.map((r, i) => (
            <motion.li
              key={r.author}
              className={`reveal rounded-[var(--radius-card)] bg-white/70 p-7 shadow-[0_24px_60px_-30px_rgb(80_30_70/0.35)] ring-1 ring-ink/10 md:p-9 ${i === 1 ? "lg:ml-16" : i === 2 ? "lg:ml-6" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 70, x: 40, rotate: TILTS[i] * 2 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.12 }}
              whileHover={reduce ? undefined : { rotate: TILTS[i] / 2, y: -4 }}
            >
              <figure>
                <div className="flex gap-0.5 text-grin-deep" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} width={18} height={18} />
                  ))}
                </div>
                <blockquote
                  className={`mt-5 leading-snug text-ink ${i === 1 ? "display text-[clamp(1.9rem,3.6vw,2.8rem)]" : "text-xl md:text-[1.4rem]"}`}
                >
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                  <span className="font-semibold text-ink">{r.author}</span>
                  <span className="text-ink/65">{r.role}</span>
                  <span className="text-ink/65">{r.note}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} width={34} height={34} />
      ))}
    </div>
  );
}
