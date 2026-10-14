"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business, directionsUrl, fullAddress, mapEmbedUrl } from "@/content/site";
import { telLink } from "@/lib/links";
import { CtaButton } from "../ui/CtaButton";
import { Fill } from "../ui/Fill";
import { ClockIcon, PhoneIcon, PinIcon } from "../ui/Icons";

export function Location() {
  const reduce = useReducedMotion();

  return (
    <section id="location" aria-labelledby="location-title" className="relative py-24 md:py-36">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-stretch">
        <motion.div className="lg:col-span-7" initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div
            className="reveal relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line lg:min-h-[34rem]"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0 round 28px)" },
              show: { clipPath: "inset(0 0% 0 0 round 28px)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
            }}
          >
            <iframe
              title="Map showing Rictus Tattoo in Gonzalo Guerrero, Playa del Carmen"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
            />
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:col-span-5">
          <h2 id="location-title" className="display text-[clamp(2.6rem,5.5vw,4.75rem)]">
            Find us in <span className="text-grin">Gonzalo Guerrero.</span>
          </h2>

          <ul className="mt-10 flex flex-col gap-7 text-lg">
            <li className="flex gap-4">
              <PinIcon className="mt-1 shrink-0 text-grin" />
              <div>
                <address className="not-italic leading-relaxed">{fullAddress}</address>
                <p className="mt-1 text-sm">
                  <Fill text={business.address.streetNumber} />
                </p>
                <p className="mt-2 text-sm text-mute">Plus code: {business.plusCode}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <ClockIcon className="mt-1 shrink-0 text-grin" />
              <div className="leading-relaxed">
                <p>Closes at {business.hours.closes}</p>
                <p className="mt-1 text-sm">
                  <Fill text={`${business.hours.days} ${business.hours.opens}`} />
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <PhoneIcon className="mt-1 shrink-0 text-grin" />
              <a href={telLink} className="underline decoration-cream/30 underline-offset-4 transition-colors hover:decoration-grin">
                {business.phoneDisplay}
              </a>
            </li>
          </ul>

          <div className="mt-10 lg:mt-auto">
            <CtaButton href={directionsUrl} variant="cream" icon="arrow" size="lg">
              Get directions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
