import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Services } from "@/components/sections/services";
import { BeardGrooming } from "@/components/sections/beard-grooming";
import { SignatureStyles } from "@/components/sections/signature-styles";
import { OurCraft } from "@/components/sections/our-craft";
import { Experience } from "@/components/sections/experience";
import { Gallery } from "@/components/sections/gallery";
import { Reviews } from "@/components/sections/reviews";
import { OpeningHours } from "@/components/sections/opening-hours";
import { BookingPreview } from "@/components/sections/booking-preview";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Services />
        <BeardGrooming />
        <SignatureStyles />
        <OurCraft />
        <Experience />
        <Gallery />
        <Reviews />
        <OpeningHours />
        <BookingPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
