"use client";

import { useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDisplayDate, formatDisplayTime } from "@/lib/booking/slots";
import { getInitials } from "@/lib/booking/validation";
import { STAFF } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
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

const STATUS_FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: COPY.admin.filters.all, value: "all" },
  { label: COPY.admin.filters.pending, value: "pending" },
  { label: COPY.admin.filters.confirmed, value: "confirmed" },
  { label: COPY.admin.filters.completed, value: "completed" },
  { label: COPY.admin.filters.cancelled, value: "cancelled" },
];

const STAFF_FILTERS = [
  { label: COPY.admin.allEmployees, value: "all" },
  ...STAFF.map((member) => ({ label: member.name, value: member.id })),
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
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments
      .filter((a) => statusFilter === "all" || a.status === statusFilter)
      .filter((a) => staffFilter === "all" || a.staff_id === staffFilter)
      .filter((a) => {
        if (!q) return true;
        return (
          a.customer_name.toLowerCase().includes(q) ||
          a.phone_number.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
          a.phone_number.toLowerCase().includes(q) ||
          (a.staff_name ?? "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const dateCmp = b.booking_date.localeCompare(a.booking_date);
        return dateCmp !== 0
          ? dateCmp
          : b.booking_time.localeCompare(a.booking_time);
      });
  }, [appointments, search, statusFilter, staffFilter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, DbAppointment[]>();

    filtered.forEach((appointment) => {
      const key = appointment.staff_name ?? COPY.booking.staffAny;
      const list = groups.get(key) ?? [];
      list.push(appointment);
      groups.set(key, list);
    });

    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-base">{COPY.admin.bookingList}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={COPY.admin.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 border-white/10 bg-white/5 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STAFF_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStaffFilter(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                staffFilter === value
                  ? "bg-gold/15 text-gold"
                  : "bg-white/5 text-muted-foreground hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatusFilter(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === value
                  ? "bg-white/10 text-white"
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
            {COPY.admin.loading}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {COPY.admin.noBookings}
          </p>
        ) : (
          <div className="max-h-[32rem] space-y-6 overflow-y-auto">
            {grouped.map(([staffName, items]) => (
              <div key={staffName}>
                <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold/80">
                  {staffName}
                </h3>
                <ul className="divide-y divide-white/10 rounded-xl border border-white/10">
                  {items.map((a) => (
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
                          {formatDisplayDate(a.booking_date)} ·{" "}
                          {formatDisplayTime(a.booking_time)}
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
