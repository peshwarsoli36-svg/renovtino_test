"use client";

import { Loader2 } from "lucide-react";

import type { Booking } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { BookingActions } from "@/components/admin/booking-actions";

interface UpcomingBookingsProps {
  bookings: Booking[];
  loading?: boolean;
  onUpdateStatus: (id: string, status: Booking["status"]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function UpcomingBookings({
  bookings,
  loading,
  onUpdateStatus,
  onDelete,
}: UpcomingBookingsProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-base">Upcoming Appointments</CardTitle>
        <CardAction>
          <span className="text-xs text-muted-foreground">
            Next {bookings.length}
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading…
          </div>
        ) : bookings.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            No upcoming appointments.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="pl-4 text-muted-foreground">
                  Customer
                </TableHead>
                <TableHead className="text-muted-foreground">Service</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="pr-4 text-right text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="border-white/10">
                  <TableCell className="pl-4 font-medium text-white">
                    {booking.customer}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {booking.service}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {booking.date}
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {booking.time}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <BookingActions
                      id={booking.id}
                      status={booking.status}
                      onUpdateStatus={onUpdateStatus}
                      onDelete={onDelete}
                      compact
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
