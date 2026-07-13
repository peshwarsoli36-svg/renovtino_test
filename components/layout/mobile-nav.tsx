"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE } from "@/lib/salon/config";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/common/logo";
import { WhatsappIcon } from "@/components/common/icons";

/** Slide-in navigation drawer for small screens. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-10 text-white hover:bg-white/10 md:hidden"
        )}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[85%] max-w-sm border-l-white/10 bg-[#0c0c0c] p-0"
      >
        <SheetHeader className="border-b border-white/10 p-6">
          <SheetTitle className="text-left">
            <Logo href="#home" />
          </SheetTitle>
          <SheetDescription className="text-left text-muted-foreground">
            {SITE.tagline}
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="size-4 text-gold/70" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 p-6">
          <Link
            href="#book"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 rounded-full text-[0.95rem] font-semibold tracking-wide"
            )}
          >
            Book Appointment
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
            )}
          >
            <WhatsappIcon className="size-4 text-emerald-400" />
            WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
