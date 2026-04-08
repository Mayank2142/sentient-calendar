import { Holiday } from '@/types';
import { indianFestivals } from './indianFestivals';
import { globalHolidays } from './globalHolidays';

// ─── Combined Holiday Database ────────────────────────────────────────────────
export const allHolidays: Holiday[] = [...indianFestivals, ...globalHolidays];

/**
 * Get all holidays for a given year and month (0-indexed).
 */
export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return allHolidays.filter((h) => {
    // Check primary date
    if (h.date.startsWith(prefix)) return true;
    // Check if a multi-day holiday spans into this month
    if (h.endDate) {
      const start = new Date(h.date);
      const end = new Date(h.endDate);
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      return start <= monthEnd && end >= monthStart;
    }
    return false;
  });
}

/**
 * Get a holiday for an exact date string (YYYY-MM-DD).
 */
export function getHolidayForDate(dateStr: string): Holiday | undefined {
  const date = new Date(dateStr);
  return allHolidays.find((h) => {
    const start = new Date(h.date);
    const end = h.endDate ? new Date(h.endDate) : start;
    return date >= start && date <= end;
  });
}

/**
 * Get holidays for a specific year.
 */
export function getHolidaysForYear(year: number): Holiday[] {
  return allHolidays.filter((h) => h.date.startsWith(`${year}`));
}

/**
 * Get the next N upcoming holidays from today.
 */
export function getUpcomingHolidays(count: number): Holiday[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return allHolidays
    .filter((h) => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}

/**
 * Check if a date range overlaps with any holidays.
 */
export function getHolidaysInRange(start: Date, end: Date): Holiday[] {
  return allHolidays.filter((h) => {
    const hStart = new Date(h.date);
    const hEnd = h.endDate ? new Date(h.endDate) : hStart;
    return hStart <= end && hEnd >= start;
  });
}

/**
 * Get days until a given holiday from today.
 */
export function getDaysUntilHoliday(holiday: Holiday): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const hDate = new Date(holiday.date);
  hDate.setHours(0, 0, 0, 0);
  return Math.ceil((hDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
