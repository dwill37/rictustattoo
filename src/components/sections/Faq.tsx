"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { faqs, messages, SHOW_PIERCINGS } from "@/content/site";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";

const items = faqs.filter((f) => SHOW_PIERCINGS || !("piercingOnly" in f && f.piercingOnly));

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="faq-title" className="display text-[clamp(2.6rem,5.5vw,4.75rem)]">
              Questions, <span className="text-grin">answered.</span>
            </h2>
            <p className="mt-5 max-w-[30ch] text-lg leading-relaxed text-mute">Anything else? Ask us directly.</p>
            <div className="mt-8">
              <CtaButton href={waLink(messages.question)} variant="cream">
                Ask on WhatsApp
              </CtaButton>
            </div>
          </div>
        </div>

        <LayoutGroup>
          <ul className="flex flex-col gap-3 lg:col-span-8">
            {items.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${uid}-panel-${i}`;
              const btnId = `${uid}-btn-${i}`;
              return (
                <motion.li
                  key={f.q}
                  layout={reduce ? false : "position"}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className={`overflow-hidden rounded-[var(--radius-tile)] ring-1 transition-colors duration-300 ${isOpen ? "bg-ink-2 ring-grin/40" : "bg-ink-2/50 ring-line hover:ring-cream/25"}`}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                    >
                      <span className="display text-[1.35rem] leading-tight tracking-[-0.03em] md:text-[1.6rem]">{f.q}</span>
                      <span aria-hidden className="relative grid size-9 shrink-0 place-items-center rounded-full bg-cream/10">
                        <span className="absolute h-[1.5px] w-3.5 rounded-full bg-cream" />
                        <motion.span
                          className="absolute h-3.5 w-[1.5px] rounded-full bg-cream"
                          animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        key="panel"
                        initial={reduce ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6 pb-6 md:px-8 md:pb-7"
                      >
                        <p className="max-w-[60ch] text-lg leading-relaxed text-mute">
                          <Fill text={f.a} />
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
