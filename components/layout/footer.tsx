import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import { NAV_ITEMS, SITE } from "@/lib/config";
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
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
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

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Explore
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

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Visit
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} SAM. All rights reserved.</p>
          <p className="text-white/40">
            Crafted for the modern gentleman ·{" "}
            <Link href="/admin" className="transition-colors hover:text-gold">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
