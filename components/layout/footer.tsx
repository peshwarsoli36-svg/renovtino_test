import Link from "next/link";
import { MapPin, Mail, Phone, Globe, Clock } from "lucide-react";

import { NAV_ITEMS, SITE } from "@/lib/salon/config";
import { OPENING_HOURS } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { Logo } from "@/components/common/logo";
import { InstagramIcon, WhatsappIcon } from "@/components/common/icons";

const SOCIALS = [
  { label: "WhatsApp", href: SITE.whatsapp, Icon: WhatsappIcon },
  { label: "Instagram", href: SITE.instagram, Icon: InstagramIcon },
];

const CONTACT = [
  { Icon: Phone, value: SITE.phone, href: SITE.phoneHref },
  { Icon: Mail, value: SITE.email, href: SITE.emailHref },
  { Icon: MapPin, value: SITE.address, href: SITE.maps },
  { Icon: Globe, value: SITE.website.replace("https://", ""), href: SITE.website },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {COPY.footer.explore}
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {COPY.footer.visit}
            </h3>
            <ul className="flex flex-col gap-3">
              {CONTACT.map(({ Icon, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {COPY.footer.hours}
            </h3>
            <ul className="flex flex-col gap-2">
              {OPENING_HOURS.map((row) => (
                <li
                  key={row.days}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Clock className="size-3.5 shrink-0 text-gold/70" />
                  <span className="text-white/80">{row.days}</span>
                  <span className="ml-auto tabular-nums">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.name}. {COPY.footer.rights}
          </p>
          <p className="text-white/40">
            {COPY.footer.tagline} ·{" "}
            <Link href="/admin/login" className="transition-colors hover:text-gold">
              {COPY.footer.admin}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
