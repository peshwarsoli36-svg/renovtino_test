"use client";

import type { ReactNode } from "react";
import { Bell, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminSidebarContent } from "@/components/admin/admin-sidebar";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

/** Responsive admin chrome: fixed desktop rail, mobile drawer, and top bar. */
export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-sidebar lg:block">
        <AdminSidebarContent />
      </aside>

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 text-white hover:bg-white/10 lg:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-r-white/10 bg-sidebar p-0"
            >
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <AdminSidebarContent />
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-xs flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers, bookings…"
              className="h-10 border-white/10 bg-white/5 pl-9"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <AdminLogoutButton />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative size-10 text-muted-foreground hover:bg-white/10 hover:text-white"
            >
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-gold ring-2 ring-background" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-gold/15 text-xs text-gold">
                SB
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
