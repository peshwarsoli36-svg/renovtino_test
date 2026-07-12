import { Mail, MapPin, Navigation, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/config";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";
import { WhatsappIcon } from "@/components/common/icons";

const CONTACT_ITEMS = [
  { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: SITE.emailHref },
  { icon: MapPin, label: "Address", value: SITE.address, href: SITE.maps },
];

export function Contact() {
  return (
    <Section id="contact" className="bg-[#0d0d0d]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Details */}
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">Contact</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              Come say hello
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Find us in {SITE.location}. Call ahead, message us, or simply drop
              by the shop.
            </p>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-3">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface px-5 py-4 transition-colors hover:border-gold/30 hover:bg-surface-2"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    {label}
                  </p>
                  <p className="truncate text-white">{value}</p>
                </div>
              </a>
            ))}
          </Reveal>

          <Reveal delay={180} className="flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 flex-1 rounded-full border-emerald-500/30 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200"
              )}
            >
              <WhatsappIcon className="size-4" />
              WhatsApp
            </a>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 flex-1 rounded-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
              )}
            >
              <Navigation className="size-4 text-gold" />
              Google Maps
            </a>
          </Reveal>
        </div>

        {/* Decorative map */}
        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(#c8a96a 1px, transparent 1px), linear-gradient(90deg, #c8a96a 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="absolute left-0 top-1/3 h-px w-full bg-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
            <div className="absolute left-2/3 top-0 h-full w-px bg-white/5" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex size-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex size-4 rounded-full bg-gold ring-4 ring-gold/20" />
              </span>
            </div>

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur-sm">
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">SAM Barbershop</p>
                <p className="truncate text-xs text-muted-foreground">
                  {SITE.address}
                </p>
              </div>
              <a
                href={SITE.maps}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-9 shrink-0 rounded-full px-4 text-xs font-semibold"
                )}
              >
                Open
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
