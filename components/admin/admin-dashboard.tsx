"use client";

import { Loader2 } from "lucide-react";

import { useAppointments } from "@/hooks/use-appointments";
import { StatCard } from "@/components/admin/stat-card";
import { TodaysAppointments } from "@/components/admin/todays-appointments";
import { UpcomingBookings } from "@/components/admin/upcoming-bookings";
import { CalendarCard } from "@/components/admin/calendar-card";
import { BookingList } from "@/components/admin/booking-list";

export function AdminDashboard() {
  const {
    appointments,
    todaysAppointments,
    upcomingBookings,
    eventDays,
    stats,
    loading,
    error,
    updateStatus,
    deleteAppointment,
  } = useAppointments();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {today} · Welcome back, Sam
          </p>
        </div>
        {loading ? (
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Syncing…
          </span>
        ) : (
          <span className="text-xs text-emerald-400/80">● Live</span>
        )}
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <TodaysAppointments
            appointments={todaysAppointments}
            loading={loading}
            onUpdateStatus={updateStatus}
            onDelete={deleteAppointment}
          />
          <UpcomingBookings
            bookings={upcomingBookings}
            loading={loading}
            onUpdateStatus={updateStatus}
            onDelete={deleteAppointment}
          />
        </div>
        <div className="flex flex-col gap-6">
          <CalendarCard eventDays={eventDays} />
          <BookingList
            appointments={appointments}
            loading={loading}
            onUpdateStatus={updateStatus}
            onDelete={deleteAppointment}
          />
        </div>
      </div>
    </div>
  );
}
