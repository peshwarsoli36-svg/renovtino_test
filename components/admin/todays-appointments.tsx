"use client";

import { Loader2 } from "lucide-react";

import type { Appointment } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/admin/status-badge";
import { BookingActions } from "@/components/admin/booking-actions";

interface TodaysAppointmentsProps {
  appointments: Appointment[];
  loading?: boolean;
  onUpdateStatus: (
    id: string,
    status: Appointment["status"]
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodaysAppointments({
  appointments,
  loading,
  onUpdateStatus,
  onDelete,
}: TodaysAppointmentsProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-base">Today&apos;s Appointments</CardTitle>
        <CardAction>
          <span className="text-xs text-muted-foreground">
            {appointments.length} total
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading…
          </div>
        ) : appointments.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            No appointments scheduled for today.
          </p>
        ) : (
          <ul className="divide-y divide-white/10">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/5"
              >
                <Avatar>
                  <AvatarFallback className="bg-white/5 text-xs text-white">
                    {appointment.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {appointment.customer}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {appointment.service}
                    {appointment.phone ? ` · ${appointment.phone}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-medium tabular-nums text-white">
                      {appointment.time}
                    </span>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <BookingActions
                    id={appointment.id}
                    status={appointment.status}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
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
