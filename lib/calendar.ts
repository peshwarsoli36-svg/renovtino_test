import type { CalendarDay } from "@/types";

interface MonthMatrix {
  label: string;
  weekdayLabels: string[];
  weeks: CalendarDay[][];
}

/**
 * Builds a Monday-first 6-row month grid for a reference date.
 * Days from adjacent months fill the leading/trailing cells so the
 * grid always has a consistent height.
 */
export function getMonthMatrix(
  reference: Date = new Date(),
  eventDays: number[] = []
): MonthMatrix {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const today = new Date();

  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // shift so Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarDay[] = [];

  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    cells.push({
      date: daysInPrevMonth - i,
      inMonth: false,
      isToday: false,
      events: 0,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day;

    cells.push({
      date: day,
      inMonth: true,
      isToday,
      events: eventDays.includes(day) ? 1 : 0,
    });
  }

  let trailing = 1;
  while (cells.length < 42) {
    cells.push({
      date: trailing,
      inMonth: false,
      isToday: false,
      events: 0,
    });
    trailing += 1;
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return {
    label: reference.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    weekdayLabels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    weeks,
  };
}
