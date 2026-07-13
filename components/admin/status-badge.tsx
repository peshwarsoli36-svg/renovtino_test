"use client";

import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types";

const STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  pending: "bg-gold/10 text-gold ring-gold/20",
  completed: "bg-white/5 text-muted-foreground ring-white/10",
  cancelled: "bg-red-500/10 text-red-400 ring-red-500/20",
};

const LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        STYLES[status]
      )}
    >
      {LABELS[status]}
    </span>
  );
}
