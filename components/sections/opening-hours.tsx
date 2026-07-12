import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { OPENING_HOURS } from "@/lib/data";
import { SITE } from "@/lib/config";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { BookButton } from "@/components/common/book-button";

export function OpeningHours() {
  const todayWeekday = new Date().getDay();

  return (
    <Section id="hours" className="bg-[#0d0d0d]">
      <SectionHeading
        overline="Hours"
        title="Opening hours"
        description="Walk-ins are welcome, but appointments are always recommended."
      />

      <Reveal className="mx-auto mt-14 max-w-xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
          <div className="flex items-center gap-4 border-b border-white/10 bg-gradient-to-r from-gold/10 to-transparent px-7 py-6">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <Clock className="size-6" />
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-white">
                This week
              </p>
              <p className="text-sm text-muted-foreground">
                {SITE.location} · by appointment
              </p>
            </div>
          </div>

          <ul className="divide-y divide-white/10 px-7">
            {OPENING_HOURS.map((row) => {
              const isToday = row.weekdays.includes(todayWeekday);
              return (
                <li
                  key={row.days}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-base",
                        row.closed ? "text-muted-foreground" : "text-white"
                      )}
                    >
                      {row.days}
                    </span>
                    {isToday ? (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold">
                        Today
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={cn(
                      "text-base font-medium tabular-nums",
                      row.closed ? "text-muted-foreground/70" : "text-white"
                    )}
                  >
                    {row.hours}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="px-7 pb-7 pt-3">
            <BookButton size="md" className="w-full" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
