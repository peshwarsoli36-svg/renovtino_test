import { BOOKING_PERKS } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { BookingForm } from "@/components/booking/booking-form";
import { Check } from "lucide-react";

export function BookingPreview() {
  return (
    <Section id="book" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-96 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">{COPY.booking.overline}</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {COPY.booking.title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.booking.body}
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-5">
            {BOOKING_PERKS.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium text-white">{perk.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-8">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
