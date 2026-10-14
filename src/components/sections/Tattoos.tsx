"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tattooCardPhotos } from "@/content/images";
import { messages, tattooOptions } from "@/content/site";
import { isPlaceholder, waLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";

const origin = (i: number) => (i === 1 ? "100% 0%" : "0% 100%");

export function Tattoos() {
  const reduce = useReducedMotion();

  return (
    <section id="tattoos" aria-labelledby="tattoos-title" className="relative py-24 md:py-32">
      <div className="shell">
        <h2 id="tattoos-title" className="display max-w-[16ch] text-[clamp(2.6rem,6.5vw,5.75rem)]">
          Pick your ink. <span className="text-mute">We&apos;ll mind the details.</span>
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {tattooOptions.map((t, i) => {
            const photo = tattooCardPhotos[i];
            const featured = i === 0;
            const msg = isPlaceholder(t.style) ? messages.quote : `${messages.quote} Style: ${t.style}.`;
            return (
              // The observer sits on an unclipped wrapper: a clip-path at 0% would
              // never register as "in view". The clip itself is driven by variants.
              <motion.div
                key={t.id}
                className={featured ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6"}
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.article
                  className={`reveal group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line ${
                    featured ? "lg:flex lg:flex-col" : "sm:grid sm:grid-cols-2"
                  }`}
                  variants={{
                    hidden: { clipPath: `circle(0% at ${origin(i)})` },
                    show: {
                      clipPath: `circle(150% at ${origin(i)})`,
                      transition: { duration: 1.25, delay: i * 0.12, ease: [0.7, 0, 0.2, 1] },
                    },
                  }}
                  whileHover={reduce ? undefined : { y: -6 }}
                >
                  <div
                    className={`relative overflow-hidden ${featured ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-80 lg:flex-1" : "aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-72"}`}
                  >
                    <motion.div
                      className="reveal absolute inset-0"
                      variants={{
                        hidden: { scale: 1.2 },
                        show: { scale: 1, transition: { duration: 1.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={featured ? "(min-width:1024px) 45vw, 100vw" : "(min-width:1024px) 22vw, (min-width:640px) 50vw, 100vw"}
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-precise)] group-hover:scale-[1.04]"
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 md:p-7">
                    <h3 className="display text-[1.75rem] leading-[1.05] md:text-[2rem]">
                      <Fill text={t.style} />
                    </h3>
                    <p className="leading-relaxed text-mute">
                      <Fill text={t.description} />
                    </p>
                    <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                      <div>
                        <dt className="text-mute">Price</dt>
                        <dd className="mt-1 text-cream">
                          <Fill text={t.price} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-mute">Session</dt>
                        <dd className="mt-1 text-cream">
                          <Fill text={t.session} />
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-2">
                      <CtaButton href={waLink(msg)} variant={featured ? "grin" : "cream"}>
                        Get a quote
                      </CtaButton>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
