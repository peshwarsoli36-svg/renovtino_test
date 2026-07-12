"use client";

import { useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDisplayDate } from "@/lib/booking/slots";
import { getInitials } from "@/lib/booking/validation";
import type { DbAppointment } from "@/lib/supabase/database.types";
import type { BookingStatus } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/status-badge";
import { BookingActions } from "@/components/admin/booking-actions";

const FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface BookingListProps {
  appointments: DbAppointment[];
  loading?: boolean;
  onUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function BookingList({
  appointments,
  loading,
  onUpdateStatus,
  onDelete,
}: BookingListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments
      .filter((a) => filter === "all" || a.status === filter)
      .filter((a) => {
        if (!q) return true;
        return (
          a.customer_name.toLowerCase().includes(q) ||
          a.phone_number.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
          a.phone_number.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const dateCmp = b.booking_date.localeCompare(a.booking_date);
        return dateCmp !== 0
          ? dateCmp
          : b.booking_time.localeCompare(a.booking_time);
      });
  }, [appointments, search, filter]);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-base">Booking List</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 border-white/10 bg-white/5 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                filter === value
                  ? "bg-gold/15 text-gold"
                  : "bg-white/5 text-muted-foreground hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No bookings found.
          </p>
        ) : (
          <ul className="max-h-[28rem] divide-y divide-white/10 overflow-y-auto rounded-xl border border-white/10">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/5"
              >
                <Avatar>
                  <AvatarFallback className="bg-gold/15 text-xs text-gold">
                    {getInitials(a.customer_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {a.customer_name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.phone_number} · {a.service}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {formatDisplayDate(a.booking_date)} at {a.booking_time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.status} />
                  <BookingActions
                    id={a.id}
                    status={a.status}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                    compact
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
