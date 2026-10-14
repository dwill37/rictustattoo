"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

type Variant = "grin" | "cream" | "ghost" | "ink";

const styles: Record<Variant, { btn: string; dot: string }> = {
  grin: { btn: "bg-grin text-ink", dot: "bg-ink text-grin" },
  cream: { btn: "bg-cream text-ink", dot: "bg-ink text-cream" },
  ink: { btn: "bg-ink text-cream", dot: "bg-grin text-ink" },
  ghost: {
    btn: "bg-ink/40 text-cream ring-1 ring-inset ring-cream/30 backdrop-blur-sm hover:ring-cream/60",
    dot: "bg-cream/10 text-cream",
  },
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "whatsapp" | "arrow" | "none";
  magnetic?: boolean;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Pill CTA with a nested icon "island". Main CTAs get a magnetic pull and a
 * cheeky tilt on hover, then settle back with a tight spring.
 */
export function CtaButton({
  href,
  children,
  variant = "grin",
  icon = "whatsapp",
  magnetic = false,
  size = "md",
  external,
  className = "",
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.6 });
  const isExternal = external ?? href.startsWith("http");

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const s = styles[variant];
  const pad = size === "lg" ? "pl-7 pr-2 py-2 text-base md:text-lg" : "pl-5 pr-1.5 py-1.5 text-[0.95rem]";
  const dot = size === "lg" ? "size-11 md:size-12" : "size-9";

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.96, rotate: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 16 }}
      className={`group relative inline-flex min-h-11 items-center gap-3 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[box-shadow,background-color] duration-300 ${pad} ${s.btn} ${className}`}
    >
      <span>{children}</span>
      {icon !== "none" && (
        <span
          className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-wink)] group-hover:-rotate-12 group-hover:scale-110 ${dot} ${s.dot}`}
        >
          {icon === "whatsapp" ? <WhatsAppIcon width={18} height={18} /> : <ArrowIcon width={16} height={16} />}
        </span>
      )}
    </motion.a>
  );
}
