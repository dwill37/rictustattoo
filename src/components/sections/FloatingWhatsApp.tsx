"use client";

import { motion, useReducedMotion } from "framer-motion";
import { messages } from "@/content/site";
import { waLink } from "@/lib/links";
import { WhatsAppIcon } from "../ui/Icons";

/** Always visible on mobile, small and quiet on desktop. Enters after the hero intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={waLink(messages.question)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rictus Tattoo on WhatsApp"
      className="reveal group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex items-center gap-2 rounded-full bg-grin p-3.5 text-ink shadow-[0_14px_40px_-10px_rgb(230_95_214/0.55)] md:bottom-6 md:right-6 md:p-3"
      initial={reduce ? false : { scale: 0, rotate: -45, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 16, delay: 2.3 }}
      whileHover={reduce ? undefined : { rotate: -8, scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.92 }}
    >
      <WhatsAppIcon width={26} height={26} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 ease-[var(--ease-precise)] md:inline md:group-hover:max-w-40 md:group-focus-visible:max-w-40">
        Chat with us
      </span>
    </motion.a>
  );
}
