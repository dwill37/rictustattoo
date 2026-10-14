"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { messages, steps } from "@/content/site";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";

/* Step positions along the smile on desktop: the middle step sits in the dip. */
const OFFSETS = ["lg:mt-0", "lg:mt-28", "lg:mt-0"];

export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const draw = useTransform(smooth, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <section aria-labelledby="how-title" className="relative py-24 md:py-36">
      <div className="shell">
        <h2 id="how-title" className="display max-w-[15ch] text-[clamp(2.6rem,6vw,5.5rem)]">
          From idea to grin in three moves.
        </h2>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Desktop: one smile connecting the three steps. */}
          <svg
            aria-hidden
            viewBox="0 0 1200 260"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[260px] w-full overflow-visible lg:block"
          >
            <path d="M 200 32 Q 600 256 1000 32" fill="none" stroke="var(--color-line)" strokeWidth="2" />
            <motion.path
              d="M 200 32 Q 600 256 1000 32"
              fill="none"
              stroke="var(--color-grin)"
              strokeWidth="3"
              strokeLinecap="round"

              style={{ pathLength: draw }}
            />
          </svg>
          {/* Mobile: the same idea, running down the left edge. */}
          <svg
            aria-hidden
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-[1.33rem] overflow-visible top-0 h-full w-10 lg:hidden"
          >
            <path d="M 1 10 Q 36 500 1 990" fill="none" stroke="var(--color-line)" strokeWidth="2" />
            <motion.path
              d="M 1 10 Q 36 500 1 990"
              fill="none"
              stroke="var(--color-grin)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />
          </svg>

          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className={`reveal relative pl-16 lg:pl-0 lg:text-center ${OFFSETS[i]}`}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 }}
              >
                <span className="display absolute left-0 top-0 grid size-11 place-items-center rounded-full bg-grin text-xl text-ink lg:static lg:mx-auto lg:size-16 lg:text-3xl">
                  {i + 1}
                </span>
                <h3 className="display text-[1.8rem] leading-tight lg:mt-6 lg:text-[2.1rem]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mute lg:mx-auto lg:max-w-[30ch]">
                  {s.body}
                  {s.placeholder && (
                    <>
                      {" "}
                      <Fill text={s.placeholder} />
                    </>
                  )}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex lg:mt-20 lg:justify-center">
          <CtaButton href={waLink(messages.book)} magnetic>
            Book on WhatsApp
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
