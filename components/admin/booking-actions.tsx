"use client";

import { useState } from "react";
import { Check, Loader2, MoreHorizontal, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BookingActionsProps {
  id: string;
  status: BookingStatus;
  onUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  compact?: boolean;
}

export function BookingActions({
  id,
  status,
  onUpdateStatus,
  onDelete,
  compact,
}: BookingActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function run(action: string, fn: () => Promise<void>) {
    setLoading(action);
    try {
      await fn();
    } finally {
      setLoading(null);
    }
  }

  const actions = [
    status === "pending" && {
      key: "confirm",
      label: "Confirm Appointment",
      icon: Check,
      onClick: () => run("confirm", () => onUpdateStatus(id, "confirmed")),
    },
    (status === "pending" || status === "confirmed") && {
      key: "complete",
      label: "Mark as Completed",
      icon: Check,
      onClick: () => run("complete", () => onUpdateStatus(id, "completed")),
    },
    status !== "cancelled" &&
      status !== "completed" && {
        key: "cancel",
        label: "Cancel Appointment",
        icon: X,
        onClick: () => run("cancel", () => onUpdateStatus(id, "cancelled")),
      },
    {
      key: "delete",
      label: "Delete Appointment",
      icon: Trash2,
      destructive: true,
      onClick: () => run("delete", () => onDelete(id)),
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    icon: typeof Check;
    destructive?: boolean;
    onClick: () => void;
  }[];

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: compact ? "icon-sm" : "icon" }),
          "text-muted-foreground hover:bg-white/10 hover:text-white"
        )}
        aria-label="Appointment actions"
        disabled={!!loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <MoreHorizontal className="size-4" />
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 border-l-white/10 bg-[#0c0c0c]"
      >
        <SheetTitle className="font-heading text-base text-white">
          Actions
        </SheetTitle>
        <div className="mt-6 flex flex-col gap-2">
          {actions.map(({ key, label, icon: Icon, destructive, onClick }) => (
            <button
              key={key}
              type="button"
              disabled={!!loading}
              onClick={onClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                destructive
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-white/80 hover:bg-white/5"
              )}
            >
              {loading === key ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Icon className="size-4" />
              )}
              {label}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
