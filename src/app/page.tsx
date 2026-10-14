import { SHOW_PIERCINGS } from "@/content/site";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { MeetDan } from "@/components/sections/MeetDan";
import { Nav } from "@/components/sections/Nav";
import { Piercings } from "@/components/sections/Piercings";
import { Reviews } from "@/components/sections/Reviews";
import { Space } from "@/components/sections/Space";
import { Tattoos } from "@/components/sections/Tattoos";
import { WhyRictus } from "@/components/sections/WhyRictus";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <WhyRictus />
        <Tattoos />
        {SHOW_PIERCINGS && <Piercings />}
        <Work />
        <MeetDan />
        <Space />
        <Reviews />
        <HowItWorks />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
