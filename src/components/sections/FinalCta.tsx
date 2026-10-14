"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/content/images";
import { messages } from "@/content/site";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";

export function FinalCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The smile comes back and widens behind the headline as you arrive.
  const draw = useTransform(scrollYProgress, [0.1, 0.7], [reduce ? 1 : 0, 1]);
  const widen = useTransform(scrollYProgress, [0.1, 1], [reduce ? 1 : 0.55, reduce ? 1 : 1.25]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.18, 1]);

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative isolate overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={{ scale: imgScale }}>
        <Image
          src={images.finalCta.src}
          alt={images.finalCta.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_45%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/72" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--color-ink)_85%)]" />

      <div className="shell relative flex min-h-[88dvh] flex-col items-center justify-center py-28 text-center">
        <motion.svg
          aria-hidden
          viewBox="0 0 1000 300"
          className="pointer-events-none absolute left-1/2 top-[64%] w-[min(1100px,120vw)] md:top-1/2 -translate-x-1/2 -translate-y-[38%]"
          style={{ scaleX: widen }}
        >
          <motion.path
            d="M 40 40 Q 500 420 960 40"
            fill="none"
            stroke="var(--color-grin)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ pathLength: draw }}
          />
        </motion.svg>

        <h2 id="final-title" className="display relative max-w-[13ch] text-[clamp(3rem,9vw,8rem)] text-cream">
          Come in curious. Leave with a <span className="text-grin">grin.</span>
        </h2>
        <p className="relative mt-6 max-w-[40ch] text-lg text-cream/85 md:text-xl">
          Send your idea today. Your future favorite tattoo starts with a message.
        </p>
        <div className="relative mt-10">
          <CtaButton href={waLink(messages.book)} size="lg" magnetic>
            Book on WhatsApp
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
