import { SERVICES } from "@/lib/data";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { ServiceCard } from "@/components/sections/service-card";

export function Services() {
  return (
    <Section id="services" className="bg-[#0d0d0d]">
      <SectionHeading
        overline="Services"
        title="Everything a gentleman needs"
        description="A focused menu, done exceptionally well. Choose your service and leave the rest to us."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id} delay={index * 70} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
