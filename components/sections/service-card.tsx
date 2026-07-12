import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

/** A single premium service tile that links through to booking. */
export function ServiceCard({ service }: ServiceCardProps) {
  const { name, description, duration, icon: Icon } = service;

  return (
    <Link
      href="#book"
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface-2"
    >
      {/* Soft gold glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
          <Icon className="size-6" />
        </span>
        <ArrowUpRight className="size-5 translate-x-1 -translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold text-white">{name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-2 text-xs font-medium uppercase tracking-wider text-white/50">
        <Clock className="size-3.5 text-gold/70" />
        {duration}
      </div>
    </Link>
  );
}
