"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { images } from "@/content/images";
import { artist, messages } from "@/content/site";
import { grinClosed, grinFull, grinOpen } from "@/lib/grin";
import { waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";

const QUOTE = "The best tattoo artist I've met in Mexico.";

export function MeetDan() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  const { scrollYProgress: quoteProgress } = useScroll({ target: quoteRef, offset: ["start 90%", "end 55%"] });
  const words = QUOTE.split(" ");

  return (
    <section ref={sectionRef} id="dan" aria-labelledby="dan-title" className="relative py-24 md:py-36">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div className="lg:col-span-5" initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.div
            className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]"
            variants={{
              hidden: { clipPath: grinClosed({ y: 46, depth: 16 }) },
              show: {
                clipPath: [grinClosed({ y: 46, depth: 16 }), grinOpen({ y: 46, depth: 16 }), grinFull()],
                transition: { duration: 1.5, times: [0, 0.45, 1], ease: [0.65, 0, 0.2, 1] },
              },
            }}
          >
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imgY }}>
              <Image
                src={images.dan.src}
                alt={images.dan.alt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-[55%_40%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-7">
          <h2 id="dan-title" className="display text-[clamp(4.5rem,16vw,12rem)] leading-[0.8]">
            Meet <span className="text-grin">Dan.</span>
          </h2>
          <p className="mt-4 text-sm text-mute">
            <Fill text={artist.fullName} />
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-x-10">
            <dt className="text-sm text-mute">Specialty</dt>
            <dd className="-mt-5 text-lg sm:mt-0">
              <Fill text={artist.specialty} />
            </dd>
            <dt className="text-sm text-mute">About</dt>
            <dd className="-mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/90 sm:mt-0">
              <Fill text={artist.bio} />
            </dd>
          </dl>

          <figure className="mt-12 border-l-2 border-grin pl-6 md:pl-8">
            <blockquote ref={quoteRef} className="display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02]">
              <span className="sr-only">{QUOTE}</span>
              <span aria-hidden>
                <span className="text-grin">&ldquo;</span>
                {words.map((w, i) => (
                  <Word key={i} progress={quoteProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce}>
                    {w}
                  </Word>
                ))}
                <span className="text-grin">&rdquo;</span>
              </span>
            </blockquote>
            <figcaption className="mt-4 text-sm text-mute">Jules L., Google Local Guide, translated from Spanish</figcaption>
          </figure>

          <div className="mt-10">
            <CtaButton href={waLink(messages.dan)} size="lg" magnetic>
              Book with Dan
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0, 1]);
  const y = useTransform(progress, range, reduce ? [0, 0] : [10, 0]);
  return (
    <>
      <motion.span className="reveal inline-block" style={{ opacity, y }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
