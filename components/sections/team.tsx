import Image from "next/image";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/common/icons";

import { STAFF } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";

const SOCIAL_PLACEHOLDERS = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
] as const;

function TeamCard({
  name,
  role,
  description,
  image,
  alt,
  delay,
}: {
  name: string;
  role: string;
  description: string;
  image: string;
  alt: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[20px]",
          "border border-white/10 bg-surface/40",
          "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]",
          "transition-all duration-500",
          "hover:-translate-y-1 hover:border-gold/35",
          "hover:bg-surface/70 hover:shadow-[0_20px_56px_-16px_rgba(200,169,106,0.18)]"
        )}
      >
        <div className="flex flex-col items-center px-6 pt-8 pb-6 sm:px-8 sm:pt-10">
          <div
            className={cn(
              "relative size-44 overflow-hidden rounded-[20px] sm:size-48",
              "border-2 border-gold/30 shadow-[0_12px_32px_-12px_rgba(200,169,106,0.25)]",
              "transition-all duration-500 group-hover:border-gold/55 group-hover:shadow-[0_16px_40px_-12px_rgba(200,169,106,0.35)]"
            )}
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 640px) 220px, 176px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <h3 className="font-heading text-2xl font-semibold text-white transition-colors group-hover:text-gold">
              {name}
            </h3>
            <p className="text-sm font-medium tracking-wide text-gold">
              {role}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_PLACEHOLDERS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full",
                  "border border-white/10 bg-ink/50 text-muted-foreground",
                  "transition-colors duration-300 group-hover:border-gold/20"
                )}
                aria-label={`${label} (coming soon)`}
                title={`${label} (coming soon)`}
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 bg-ink/20 px-6 py-4 sm:px-8">
          <Link
            href="#book"
            className={cn(
              "flex items-center justify-center gap-2 text-sm font-medium text-gold/90",
              "transition-colors duration-300 hover:text-gold"
            )}
          >
            <CalendarCheck className="size-4 shrink-0" strokeWidth={1.75} />
            {COPY.team.available}
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function Team() {
  return (
    <Section
      id="team"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.04),transparent_70%)]"
        aria-hidden
      />

      <div className="relative flex flex-col gap-14 lg:gap-16">
        <SectionHeading
          overline={COPY.team.overline}
          title={
            <>
              {COPY.team.title.replace(".", "")}
              <span className="text-gradient-gold">.</span>
            </>
          }
          description={COPY.team.body}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
          {STAFF.map((member, index) => {
            const profile =
              COPY.team.members[
                member.id as keyof typeof COPY.team.members
              ];

            return (
              <TeamCard
                key={member.id}
                name={member.name}
                role={profile?.role ?? member.role}
                description={profile?.description ?? ""}
                image={member.image}
                alt={`${member.name} — ${profile?.role ?? member.role}`}
                delay={index * 100}
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
