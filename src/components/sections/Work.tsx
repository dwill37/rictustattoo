"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery } from "@/content/images";
import { business } from "@/content/site";
import { safeHref } from "@/lib/links";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CtaButton } from "../ui/CtaButton";
import { ChevronIcon, CloseIcon } from "../ui/Icons";

type Item = (typeof gallery)[number];

export function Work() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const cols = desktop ? 3 : 2;
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Each column drifts at its own speed.
  const y0 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const y1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -110]);
  const y2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 30, reduce ? 0 : -70]);
  const speeds = [y0, y1, y2];

  const columns = useMemo(() => {
    const out: { item: Item; index: number }[][] = Array.from({ length: cols }, () => []);
    // Greedy masonry: each photo goes to the currently shortest column.
    const heights = Array(cols).fill(0);
    gallery.forEach((item, index) => {
      const c = heights.indexOf(Math.min(...heights));
      out[c].push({ item, index });
      heights[c] += item.src.height / item.src.width;
    });
    return out;
  }, [cols]);

  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-grin">The work</p>
            <h2 id="work-title" className="display max-w-[12ch] text-[clamp(2.8rem,8vw,7rem)]">
              Fresh off the needle.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
            <p className="max-w-[30ch] text-lg leading-relaxed text-mute">Real pieces on real skin. Tap any photo to see it up close.</p>
            <CtaButton href={safeHref(business.facebookUrl)} variant="cream" icon="arrow">
              Follow us on Facebook
            </CtaButton>
          </div>
        </div>

        <LayoutGroup>
          <div ref={ref} className="mt-16 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {columns.map((col, c) => (
              <motion.ul key={c} style={{ y: speeds[c] }} className="flex flex-col gap-3 md:gap-5">
                {col.map(({ item, index }) => (
                  <GalleryItem key={item.id} item={item} index={index} onOpen={setActiveId} reduce={!!reduce} />
                ))}
              </motion.ul>
            ))}
          </div>

          <Lightbox activeId={activeId} setActiveId={setActiveId} />
        </LayoutGroup>
      </div>
    </section>
  );
}

function GalleryItem({ item, index, onOpen, reduce }: { item: Item; index: number; onOpen: (id: string) => void; reduce: boolean }) {
  return (
    <motion.li
      className="reveal"
      initial={reduce ? false : { opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-label={`View larger: ${item.alt}`}
        className="group relative block w-full overflow-hidden rounded-[var(--radius-tile)] bg-ink-2"
        style={{ aspectRatio: `${item.src.width} / ${item.src.height}` }}
      >
        <motion.div layoutId={`work-${item.id}`} className="absolute inset-0">
          <Image
            src={item.src}
            alt=""
            fill
            sizes="(min-width:1024px) 30vw, 50vw"
            placeholder="blur"
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-precise)] [@media(hover:hover)]:group-hover:scale-[1.06]"
          />
        </motion.div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 [@media(hover:hover)]:group-hover:bg-ink/15"
        />
      </button>
    </motion.li>
  );
}

function Lightbox({ activeId, setActiveId }: { activeId: string | null; setActiveId: (id: string | null) => void }) {
  const index = gallery.findIndex((g) => g.id === activeId);
  const item = index >= 0 ? gallery[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const go = useCallback((dir: 1 | -1) => setActiveId(gallery[(index + dir + gallery.length) % gallery.length].id), [index, setActiveId]);

  useEffect(() => {
    if (!item) return;
    lastFocus.current ??= document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, go, setActiveId]);

  useEffect(() => {
    if (activeId === null && lastFocus.current) {
      lastFocus.current.focus();
      lastFocus.current = null;
    }
  }, [activeId]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Tattoo photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain p-4 md:p-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.button
            type="button"
            aria-label="Close photo viewer"
            tabIndex={-1}
            className="absolute inset-0 cursor-zoom-out bg-ink/92 backdrop-blur-md"
            onClick={() => setActiveId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <figure className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4">
            <motion.div
              layoutId={`work-${item.id}`}
              className="relative overflow-hidden rounded-[var(--radius-tile)]"
              style={{
                aspectRatio: `${item.src.width} / ${item.src.height}`,
                width: `min(100%, calc(min(78dvh, 1100px) * ${item.src.width / item.src.height}))`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-contain"
                placeholder="blur"
              />
            </motion.div>
            <motion.figcaption
              className="max-w-[60ch] text-center text-sm text-cream/85"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
            >
              {item.alt}
            </motion.figcaption>
          </figure>

          <motion.div
            className="absolute inset-x-4 top-4 flex justify-end gap-2 md:inset-x-8 md:top-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="grid size-11 rotate-180 place-items-center rounded-full bg-cream/10 ring-1 ring-cream/20 hover:bg-cream/20"
            >
              <ChevronIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="grid size-11 place-items-center rounded-full bg-cream/10 ring-1 ring-cream/20 hover:bg-cream/20"
            >
              <ChevronIcon />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Close photo viewer"
              className="grid size-11 place-items-center rounded-full bg-cream text-ink"
            >
              <CloseIcon />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
