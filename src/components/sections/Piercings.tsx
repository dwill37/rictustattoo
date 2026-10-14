"use client";

import { motion, useReducedMotion } from "framer-motion";
import { messages, piercing } from "@/content/site";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";

const ROWS = [
  { label: "Piercings", value: piercing.types },
  { label: "Jewelry", value: piercing.jewelry },
  { label: "Prices", value: piercing.prices },
];

const tight = { type: "spring" as const, stiffness: 520, damping: 30 };

export function Piercings() {
  const reduce = useReducedMotion();

  return (
    <section id="piercings" aria-labelledby="piercings-title" className="py-12 md:py-20">
      <div className="shell">
        <div className="relative grid gap-10 overflow-hidden rounded-[var(--radius-card)] bg-ink-2 p-7 ring-1 ring-line md:p-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Tiny jewelry: a ring and a stud, popping in with tight springs. */}
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 hidden md:block">
            <motion.span
              className="reveal block size-44 rounded-full border-[10px] border-grin/80"
              initial={reduce ? false : { scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={tight}
            />
          </div>
          <motion.span
            aria-hidden
            className="reveal pointer-events-none absolute right-40 top-36 hidden size-4 rounded-full bg-cream md:block"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...tight, delay: 0.25 }}
          />

          <div>
            <h2 id="piercings-title" className="display text-[clamp(2.4rem,5vw,4.25rem)]">
              Piercings, <span className="text-grin">too.</span>
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-mute">
              A little shine to go with your ink. Send us a message and we&apos;ll sort out the details.
            </p>
            <div className="mt-8">
              <CtaButton href={waLink(messages.piercing)}>Book a piercing</CtaButton>
            </div>
          </div>

          <dl className="relative grid content-center gap-3">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.label}
                className="reveal flex flex-col gap-1 rounded-[var(--radius-tile)] bg-ink-3 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                initial={reduce ? false : { opacity: 0, x: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...tight, delay: 0.1 + i * 0.07 }}
              >
                <dt className="text-sm text-mute">{r.label}</dt>
                <dd className="text-cream sm:text-right">
                  <Fill text={r.value} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
