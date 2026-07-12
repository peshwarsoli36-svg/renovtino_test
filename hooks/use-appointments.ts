"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { formatDateKey, formatRelativeDate } from "@/lib/booking/slots";
import { getInitials } from "@/lib/booking/validation";
import type { DbAppointment } from "@/lib/supabase/database.types";
import type { Appointment, Booking, BookingStatus, Stat } from "@/types";
import {
  CalendarCheck,
  CalendarDays,
  Star,
  Users,
} from "lucide-react";

export function useAppointments() {
  const [appointments, setAppointments] = useState<DbAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load appointments.");
      setAppointments(data.appointments ?? []);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load appointments."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();

    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = createClient();
    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAppointments]);

  const todayKey = formatDateKey(new Date());

  const todaysAppointments: Appointment[] = useMemo(
    () =>
      appointments
        .filter((a) => a.booking_date === todayKey)
        .sort((a, b) => a.booking_time.localeCompare(b.booking_time))
        .map((a) => ({
          id: a.id,
          customer: a.customer_name,
          phone: a.phone_number,
          service: a.service,
          time: a.booking_time,
          status: a.status,
          initials: getInitials(a.customer_name),
        })),
    [appointments, todayKey]
  );

  const upcomingBookings: Booking[] = useMemo(
    () =>
      appointments
        .filter(
          (a) =>
            a.booking_date > todayKey ||
            (a.booking_date === todayKey && a.status === "pending")
        )
        .filter((a) => a.status !== "completed" && a.status !== "cancelled")
        .slice(0, 10)
        .map((a) => ({
          id: a.id,
          customer: a.customer_name,
          service: a.service,
          date: formatRelativeDate(a.booking_date),
          time: a.booking_time,
          status: a.status,
        })),
    [appointments, todayKey]
  );

  const eventDays = useMemo(() => {
    const ref = new Date();
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const days = new Set<number>();

    appointments.forEach((a) => {
      const [y, m, d] = a.booking_date.split("-").map(Number);
      if (y === year && m - 1 === month && a.status !== "cancelled") {
        days.add(d);
      }
    });

    return Array.from(days);
  }, [appointments]);

  const stats: Stat[] = useMemo(() => {
    const todayCount = appointments.filter(
      (a) => a.booking_date === todayKey && a.status !== "cancelled"
    ).length;

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekStartKey = formatDateKey(weekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const weekEndKey = formatDateKey(weekEnd);

    const weekCount = appointments.filter(
      (a) =>
        a.booking_date >= weekStartKey &&
        a.booking_date <= weekEndKey &&
        a.status !== "cancelled"
    ).length;

    const uniqueCustomers = new Set(
      appointments.map((a) => a.phone_number)
    ).size;

    const pendingCount = appointments.filter(
      (a) => a.status === "pending"
    ).length;

    return [
      {
        id: "today",
        label: "Today's Appointments",
        value: String(todayCount),
        change: `${pendingCount} pending`,
        trend: "up",
        icon: CalendarCheck,
      },
      {
        id: "week",
        label: "Weekly Bookings",
        value: String(weekCount),
        change: "This week",
        trend: "up",
        icon: CalendarDays,
      },
      {
        id: "customers",
        label: "Total Customers",
        value: String(uniqueCustomers),
        change: `${appointments.length} bookings`,
        trend: "up",
        icon: Users,
      },
      {
        id: "rating",
        label: "Pending Review",
        value: String(pendingCount),
        change: "Awaiting confirm",
        trend: pendingCount > 0 ? "up" : "down",
        icon: Star,
      },
    ];
  }, [appointments, todayKey]);

  async function updateStatus(id: string, status: BookingStatus) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Update failed.");
    await fetchAppointments();
  }

  async function deleteAppointment(id: string) {
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Delete failed.");
    await fetchAppointments();
  }

  return {
    appointments,
    todaysAppointments,
    upcomingBookings,
    eventDays,
    stats,
    loading,
    error,
    updateStatus,
    deleteAppointment,
  };
}
