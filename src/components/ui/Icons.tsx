import type { SVGProps } from "react";

/* Small inline glyph set: the brief rules out extra icon libraries. */
type P = SVGProps<SVGSVGElement>;
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export const WhatsAppIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" />
    <path
      d="M9.1 7.8c-.3 0-.7.1-.9.4-.4.4-.9 1-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.6Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="M14.5 8H16.5V4.8H14C11.3 4.8 10.2 6.5 10.2 8.8V10.5H8V13.6H10.2V20H13.4V13.6H15.9L16.4 10.5H13.4V9.2C13.4 8.5 13.8 8 14.5 8Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4.5h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 6.4 6.4l1.3-2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A15.4 15.4 0 0 1 3.4 6.2 1.6 1.6 0 0 1 5 4.5Z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...base} strokeWidth={0} fill="currentColor" {...p}>
    <path d="M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.2l-5.8 3.2 1.2-6.5L2.6 9.4l6.5-.8L12 2.6Z" />
  </svg>
);
