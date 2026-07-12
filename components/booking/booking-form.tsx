"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { SERVICE_OPTIONS } from "@/lib/data";
import { validateBooking } from "@/lib/booking/validation";
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchAvailability = useCallback(async (selectedDate: string) => {
    setLoadingSlots(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/appointments/availability?date=${selectedDate}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load times.");
      setAvailableSlots(data.availableSlots ?? []);
      setTime((prev) =>
        data.availableSlots?.includes(prev) ? prev : ""
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load available times."
      );
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (date) fetchAvailability(date);
    else {
      setAvailableSlots([]);
      setTime("");
    }
  }, [date, fetchAvailability]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const formData = {
      customerName: name,
      phoneNumber: phone,
      service,
      bookingDate: date ?? "",
      bookingTime: time,
    };

    const validationError = validateBooking(formData);
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
          service,
          bookingDate: date,
          bookingTime: time,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed.");

      setSuccess(true);
      setName("");
      setPhone("");
      setService("");
      setDate(null);
      setTime("");
      setAvailableSlots([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      if (date) fetchAvailability(date);
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
          Your appointment request has been sent successfully.
        </p>
        <p className="max-w-xs text-sm text-muted-foreground">
          We&apos;ll confirm your booking shortly. See you at the shop.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-2 rounded-full border-white/15"
          onClick={() => setSuccess(false)}
        >
          Book another appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="booking-name">
          <Input
            id="booking-name"
            name="name"
            placeholder="John Smith"
            className="h-11"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            required
          />
        </Field>
        <Field label="Phone" htmlFor="booking-phone">
          <Input
            id="booking-phone"
            name="phone"
            type="tel"
            placeholder="+1 555 000 0000"
            className="h-11"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
            required
          />
        </Field>
      </div>

      <Field label="Service">
        <Select
          value={service || null}
          onValueChange={(v) => setService(v ?? "")}
          disabled={submitting}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Date">
        <BookingCalendar
          selectedDate={date}
          onSelectDate={(d) => {
            setDate(d);
            setTime("");
          }}
        />
      </Field>

      <Field label="Time">
        {!date ? (
          <p className="text-sm text-muted-foreground">
            Select a date to see available times.
          </p>
        ) : loadingSlots ? (
          <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading available times…
          </div>
        ) : availableSlots.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No available times for this date. Please choose another day.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={submitting}
                onClick={() => setTime(slot)}
                className={cn(
                  "rounded-xl border px-2 py-2.5 text-sm font-medium tabular-nums transition-colors",
                  time === slot
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-white/10 text-white/80 hover:border-gold/30 hover:bg-white/5"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </Field>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={submitting || !date || !time || !service}
        className="mt-1 h-12 w-full rounded-full text-[0.95rem] font-semibold tracking-wide"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Booking…
          </>
        ) : (
          "Book Appointment"
        )}
      </Button>
    </form>
  );
}
