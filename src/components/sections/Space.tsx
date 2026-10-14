"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { studioPhotos } from "@/content/images";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { SmileOrnament } from "./WhyRictus";

type Panel =
  { kind: "photo"; index: number; width: string } | { kind: "note"; title: string; body: string; tone: "grin" | "cream" | "dark" };

const PANELS: Panel[] = [
  { kind: "photo", index: 0, width: "w-[78vw] sm:w-[46vw] lg:w-[30vw]" },
  { kind: "note", title: "Super friendly vibe", body: "That's how reviewers sum up the room. Expect a warm welcome.", tone: "grin" },
  { kind: "photo", index: 2, width: "w-[78vw] sm:w-[52vw] lg:w-[36vw]" },
  {
    kind: "note",
    title: "Beautifully decorated",
    body: "Baroque mirrors, skeleton prints, a wall of stickers. There's always something to look at.",
    tone: "cream",
  },
  { kind: "photo", index: 1, width: "w-[62vw] sm:w-[36vw] lg:w-[22vw]" },
  {
    kind: "note",
    title: "Good conversation",
    body: "Chat, laugh or zone out. Hours in the chair feel more like hanging out.",
    tone: "dark",
  },
];

export function Space() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const pinned = desktop && !reduce;

  return (
    <section aria-labelledby="space-title" className="relative">
      {pinned ? <PinnedStrip /> : <SwipeStrip />}
    </section>
  );
}

function Intro() {
  return (
    <div className="w-[82vw] shrink-0 sm:w-[60vw] lg:w-[34vw] lg:pr-8">
      <h2 id="space-title" className="display text-[clamp(2.6rem,5.5vw,5rem)]">
        A room you&apos;ll want to <span className="text-grin">stay in.</span>
      </h2>
      <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-mute">
        Reviewers keep mentioning two things besides the tattoos: the friendly vibe and the beautifully decorated space.
      </p>
    </div>
  );
}

function PanelView({ panel }: { panel: Panel }) {
  if (panel.kind === "photo") {
    const photo = studioPhotos[panel.index];
    return (
      <div
        className={`relative aspect-[4/5] shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto lg:h-[62vh] ${panel.width}`}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 36vw, 80vw" placeholder="blur" className="object-cover" />
      </div>
    );
  }
  const tone = {
    grin: "bg-grin text-ink",
    cream: "bg-cream text-ink",
    dark: "bg-ink-2 text-cream ring-1 ring-line",
  }[panel.tone];
  return (
    <div
      className={`flex aspect-[4/5] w-[70vw] shrink-0 snap-center flex-col justify-between rounded-[var(--radius-card)] p-7 sm:w-[40vw] lg:aspect-auto lg:h-[44vh] lg:w-[22vw] ${tone}`}
    >
      <SmileOrnament className={`h-7 w-20 ${panel.tone === "dark" ? "text-grin" : "text-ink/70"}`} />
      <div>
        <h3 className="display text-[2rem] leading-none">{panel.title}</h3>
        <p className={`mt-3 leading-relaxed ${panel.tone === "dark" ? "text-mute" : "text-ink/80"}`}>{panel.body}</p>
      </div>
    </div>
  );
}

/** Desktop: vertical scroll drives a horizontal pan while the section is pinned. */
function PinnedStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div ref={wrapRef} style={{ height: `calc(100dvh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-6 pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] pr-[8vw] will-change-transform"
        >
          <Intro />
          {PANELS.map((p, i) => (
            <PanelView key={i} panel={p} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** Mobile and reduced motion: a native swipeable strip with scroll snapping. */
function SwipeStrip() {
  return (
    <div className="py-24 md:py-32">
      <div className="shell">
        <Intro />
      </div>
      <div
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        role="region"
        aria-label="Photos of the studio, scroll sideways"
      >
        {PANELS.map((p, i) => (
          <PanelView key={i} panel={p} />
        ))}
      </div>
    </div>
  );
}
