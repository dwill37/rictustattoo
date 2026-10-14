import Image from "next/image";
import { images } from "@/content/images";
import { business, fullAddress, navLinks } from "@/content/site";
import { isPlaceholder, safeHref, telLink } from "@/lib/links";
import { Fill } from "../ui/Fill";
import { FacebookIcon, InstagramIcon, MailIcon } from "../ui/Icons";

export function Footer() {
  const socials = [
    { label: "Rictus Tattoo on Facebook", href: safeHref(business.facebookUrl), Icon: FacebookIcon },
    { label: "Rictus Tattoo on Instagram", href: safeHref(business.instagramUrl), Icon: InstagramIcon },
    {
      label: "Email Rictus Tattoo",
      href: isPlaceholder(business.email) ? "#" : `mailto:${business.email}`,
      Icon: MailIcon,
    },
  ];

  return (
    <footer className="border-t border-line bg-ink pb-28 pt-20 md:pb-12">
      <div className="shell grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="relative size-14 overflow-hidden rounded-full ring-1 ring-line">
              <Image src={images.logo.src} alt="" fill sizes="56px" className="scale-[1.6] object-cover object-[50%_58%]" />
            </span>
            <p className="display text-4xl" translate="no">
              Rictus Tattoo
            </p>
          </div>
          <p className="mt-5 max-w-[34ch] text-mute">Tattoo and piercing studio in Playa del Carmen.</p>
          <p className="mt-2 text-cream">Women-led · LGBTQ+ friendly</p>
        </div>

        <div className="space-y-3 text-sm lg:col-span-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-mute">Visit</h2>
          <address className="not-italic leading-relaxed text-cream/90">{fullAddress}</address>
          <p>
            <a href={telLink} className="text-cream underline decoration-cream/30 underline-offset-4 hover:decoration-grin">
              {business.phoneDisplay}
            </a>
          </p>
          <p className="text-cream/90">
            Closes at {business.hours.closes}. <Fill text={`${business.hours.days} ${business.hours.opens}`} />
          </p>
          <p className="text-cream/90">
            <Fill text={business.email} />
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm lg:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-mute">Explore</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1 text-cream/90 hover:text-grin">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-11 place-items-center rounded-full bg-cream/10 ring-1 ring-line transition-colors hover:bg-grin hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:justify-between">
        <p>
          © <Year /> Rictus Tattoo. All rights reserved.
        </p>
        <p>
          Social links and email: <Fill text="[PLACEHOLDER: Facebook URL, Instagram URL, email]" />
        </p>
      </div>
    </footer>
  );
}

/** Prerendered and cached, so the year updates on each rebuild. */
async function Year() {
  "use cache";
  return new Date().getFullYear();
}
