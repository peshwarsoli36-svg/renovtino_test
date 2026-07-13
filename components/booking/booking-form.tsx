"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SERVICE_OPTIONS,
  STAFF,
  NO_PREFERENCE_STAFF_ID,
} from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { validateBooking } from "@/lib/booking/validation";
import type { TimeSlot } from "@/lib/booking/slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingCalendar } from "@/components/booking/booking-calendar";

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function BookingForm() {
  const [staffId, setStaffId] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchAvailability = useCallback(
    async (selectedDate: string, selectedStaff: string) => {
      if (!selectedStaff) return;
      setLoadingSlots(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/appointments/availability?date=${encodeURIComponent(selectedDate)}&staffId=${encodeURIComponent(selectedStaff)}`
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error ?? "Failed to load times.");
        const slots: TimeSlot[] = Array.isArray(data.slots) ? data.slots : [];
        setDaySlots(slots);
        setTime((prev) => {
          const selected = slots.find((s) => s.time === prev);
          return selected?.status === "available" ? prev : "";
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load available times."
        );
        setDaySlots([]);
      } finally {
        setLoadingSlots(false);
      }
    },
    []
  );

  useEffect(() => {
    if (date && staffId) fetchAvailability(date, staffId);
    else {
      setDaySlots([]);
      setTime("");
    }
  }, [date, staffId, fetchAvailability]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const formData = {
      customerName: name,
      phoneNumber: phone,
      email,
      service,
      staffId,
      bookingDate: date ?? "",
      bookingTime: time,
    };

    const bookedTimes = daySlots
      .filter((s) => s.status === "booked")
      .map((s) => s.time);

    const validationError = validateBooking(formData, bookedTimes);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          phoneNumber: phone.trim(),
          email: email.trim(),
          service,
          staffId,
          bookingDate: date,
          bookingTime: time,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed.");

      setSuccess(true);
      setStaffId("");
      setService("");
      setDate(null);
      setTime("");
      setName("");
      setPhone("");
      setEmail("");
      setDaySlots([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      if (date && staffId) fetchAvailability(date, staffId);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Check className="size-7" />
        </span>
        <p className="font-heading text-lg font-medium text-white">
          {COPY.booking.successTitle}
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          {COPY.booking.successBody}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-2 rounded-full border-white/15"
          onClick={() => setSuccess(false)}
        >
          {COPY.booking.successAgain}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label={COPY.booking.staff}>
        <Select
          value={staffId || null}
          onValueChange={(v) => {
            setStaffId(v ?? "");
            setTime("");
          }}
          disabled={submitting}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder={COPY.booking.staffPlaceholder} />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value={NO_PREFERENCE_STAFF_ID}>
              {COPY.booking.staffAny}
            </SelectItem>
            {STAFF.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name} — {member.role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label={COPY.booking.service}>
        <Select
          value={service || null}
          onValueChange={(v) => setService(v ?? "")}
          disabled={submitting}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder={COPY.booking.servicePlaceholder} />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} · {option.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label={COPY.booking.date}>
        <BookingCalendar
          selectedDate={date}
          onSelectDate={(d) => {
            setDate(d);
            setTime("");
          }}
        />
      </Field>

      <Field label={COPY.booking.time}>
        {!date || !staffId ? (
          <p className="text-sm text-muted-foreground">
            {COPY.booking.timeHint}
          </p>
        ) : loadingSlots ? (
          <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            {COPY.booking.timeLoading}
          </div>
        ) : daySlots.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {COPY.booking.timeEmpty}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {daySlots.map((slot) => {
              const isBooked = slot.status === "booked";
              const isPast = slot.status === "past";
              const isSelected = time === slot.time;
              const isDisabled = submitting || isBooked || isPast;

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setTime(slot.time)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 text-sm font-medium tabular-nums transition-colors",
                    isBooked &&
                      "cursor-not-allowed border-red-500/30 bg-red-500/10 text-red-300",
                    isPast &&
                      "cursor-not-allowed border-white/5 bg-white/[0.02] text-muted-foreground/50",
                    !isBooked &&
                      !isPast &&
                      isSelected &&
                      "border-gold bg-gold/15 text-gold",
                    !isBooked &&
                      !isPast &&
                      !isSelected &&
                      "border-white/10 text-white/80 hover:border-gold/30 hover:bg-white/5"
                  )}
                >
                  <span>{slot.time}</span>
                  {isBooked ? (
                    <span className="flex items-center gap-1 text-[0.65rem] font-normal uppercase tracking-wide text-red-400/80">
                      <Lock className="size-3" />
                      {COPY.booking.booked}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={COPY.booking.name} htmlFor="booking-name">
          <Input
            id="booking-name"
            name="name"
            placeholder={COPY.booking.namePlaceholder}
            className="h-11"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </Field>
        <Field label={COPY.booking.phone} htmlFor="booking-phone">
          <Input
            id="booking-phone"
            name="phone"
            type="tel"
            placeholder={COPY.booking.phonePlaceholder}
            className="h-11"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
            required
          />
        </Field>
      </div>

      <Field label={COPY.booking.email} htmlFor="booking-email">
        <Input
          id="booking-email"
          name="email"
          type="email"
          placeholder={COPY.booking.emailPlaceholder}
          className="h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
      </Field>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={
          submitting || !staffId || !date || !time || !service || !name || !phone
        }
        className="mt-1 h-12 w-full rounded-full text-[0.95rem] font-semibold tracking-wide"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {COPY.booking.submitting}
          </>
        ) : (
          COPY.booking.submit
        )}
      </Button>
    </form>
  );
}
