import { DateRange, RangeSummary } from '@/types';
import { getHolidaysInRange } from './holidays/holidayCalculator';

// ─── Date Range Utilities ─────────────────────────────────────────────────────

/**
 * Returns all calendar dates between two dates (inclusive).
 */
export function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endNorm = new Date(end);
  endNorm.setHours(0, 0, 0, 0);
  while (current <= endNorm) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Returns true if a date falls within a given range.
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(range.start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(range.end);
  e.setHours(0, 0, 0, 0);
  return d >= s && d <= e;
}

/**
 * Returns true if date is the start of a given range.
 */
export function isRangeStart(date: Date, range: DateRange): boolean {
  return date.toDateString() === new Date(range.start).toDateString();
}

/**
 * Returns true if date is the end of a given range.
 */
export function isRangeEnd(date: Date, range: DateRange): boolean {
  return date.toDateString() === new Date(range.end).toDateString();
}

/**
 * Returns whether the range contains only a single day.
 */
export function isSingleDay(range: DateRange): boolean {
  return range.start.toDateString() === range.end.toDateString();
}

/**
 * Returns true if a date is the first day of a row (Sunday or Monday based on locale).
 */
export function isRowStart(date: Date, weekStartsMonday: boolean): boolean {
  const day = date.getDay();
  return weekStartsMonday ? day === 1 : day === 0;
}

/**
 * Returns true if a date is the last day of a row.
 */
export function isRowEnd(date: Date, weekStartsMonday: boolean): boolean {
  const day = date.getDay();
  return weekStartsMonday ? day === 0 : day === 6;
}

/**
 * Computes a full summary of a date range (days, weekdays, weekends, holidays).
 */
export function computeRangeSummary(start: Date, end: Date): RangeSummary {
  const all = getDatesInRange(start, end);
  let weekdays = 0;
  let weekends = 0;
  for (const d of all) {
    const dow = d.getDay();
    if (dow === 0 || dow === 6) weekends++;
    else weekdays++;
  }

  const holidays = getHolidaysInRange(start, end);
  return {
    totalDays: all.length,
    weekdays,
    weekends,
    holidays,
  };
}

/**
 * Normalize a range so start is always before end.
 */
export function normalizeRange(a: Date, b: Date): { start: Date; end: Date } {
  return a <= b ? { start: a, end: b } : { start: b, end: a };
}

/**
 * Format a date range for display.
 */
export function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const s = start.toLocaleDateString('en-US', opts);
  const e = end.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  return `${s} – ${e}`;
}
