"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { getMonthMatrix } from "@/lib/calendar";
import {
  formatDateKey,
  getWeekday,
  isDateSelectable,
} from "@/lib/booking/slots";

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  eventDays?: number[];
}

export function BookingCalendar({
  selectedDate,
  onSelectDate,
  eventDays = [],
}: BookingCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    () =>
      selectedDate
        ? new Date(
            Number(selectedDate.split("-")[0]),
            Number(selectedDate.split("-")[1]) - 1,
            1
          )
        : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const { label, weekdayLabels, weeks } = getMonthMatrix(viewDate, eventDays);
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  function goMonth(delta: number) {
    setViewDate(new Date(viewYear, viewMonth + delta, 1));
  }

  function handleDayClick(day: number, inMonth: boolean, monthOffset: number) {
    const ref = new Date(viewYear, viewMonth + monthOffset, day);
    const key = formatDateKey(ref);
    if (inMonth && isDateSelectable(key)) onSelectDate(key);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-heading text-sm font-medium text-white">
          {label}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            aria-label="Previous month"
            className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => goMonth(1)}
            aria-label="Next month"
            className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdayLabels.map((day) => (
          <div
            key={day}
            className="pb-2 text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {weeks.flat().map((cell, index) => {
          const monthOffset = cell.inMonth ? 0 : cell.date > 15 ? -1 : 1;
          const ref = new Date(viewYear, viewMonth + monthOffset, cell.date);
          const key = formatDateKey(ref);
          const selectable = cell.inMonth && isDateSelectable(key);
          const isSelected = selectedDate === key;
          const isSunday = cell.inMonth && getWeekday(key) === 0;
          const isToday = cell.isToday;

          return (
            <button
              key={index}
              type="button"
              disabled={!selectable}
              onClick={() =>
                handleDayClick(cell.date, cell.inMonth, monthOffset)
              }
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg text-sm transition-colors",
                !cell.inMonth && "text-muted-foreground/20",
                cell.inMonth &&
                  !selectable &&
                  "cursor-not-allowed text-muted-foreground/30",
                selectable &&
                  !isSelected &&
                  "text-white/80 hover:bg-white/5",
                isSelected && "bg-gold font-semibold text-ink",
                isToday && !isSelected && "ring-1 ring-gold/40",
                isSunday &&
                  cell.inMonth &&
                  !isSelected &&
                  "text-muted-foreground/40"
              )}
            >
              {cell.date}
            </button>
          );
        })}
      </div>
    </div>
  );
}
