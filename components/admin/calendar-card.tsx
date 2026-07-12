"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { getMonthMatrix } from "@/lib/calendar";
import { formatDateKey } from "@/lib/booking/slots";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CalendarCardProps {
  eventDays?: number[];
}

export function CalendarCard({ eventDays = [] }: CalendarCardProps) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const { label, weekdayLabels, weeks } = getMonthMatrix(viewDate, eventDays);

  function goMonth(delta: number) {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
        <CardAction className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Previous month"
            className="text-muted-foreground hover:bg-white/5 hover:text-white"
            onClick={() => goMonth(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Next month"
            className="text-muted-foreground hover:bg-white/5 hover:text-white"
            onClick={() => goMonth(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((day) => (
            <div
              key={day}
              className="pb-2 text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {weeks.flat().map((day, index) => {
            const ref = new Date(viewDate);
            if (!day.inMonth) {
              ref.setMonth(ref.getMonth() + (day.date > 15 ? -1 : 1));
            }
            ref.setDate(day.date);
            const key = formatDateKey(ref);

            return (
              <div
                key={index}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-lg text-sm transition-colors",
                  !day.inMonth && "text-muted-foreground/25",
                  day.inMonth && !day.isToday && "text-white/80",
                  day.isToday && "bg-gold font-semibold text-ink"
                )}
                title={day.inMonth ? key : undefined}
              >
                {day.date}
                {day.events > 0 && !day.isToday ? (
                  <span className="absolute bottom-1 size-1 rounded-full bg-gold" />
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
