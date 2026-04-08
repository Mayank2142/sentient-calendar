import { useState, useCallback, useMemo } from 'react';
import { useCalendarStore } from '@/store/calendarStore';

interface CalendarMonth {
  year: number;
  month: number;
  weeks: Array<Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean }>>;
}

/**
 * Hook for managing calendar month/week views and date navigation
 */
export function useCalendar(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const { events } = useCalendarStore();

  /**
   * Generate calendar grid for a given month
   */
  const getCalendarDays = useCallback((date: Date): CalendarMonth => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const weeks: CalendarMonth['weeks'] = [];
    let currentWeek: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean }> = [];
    let current = new Date(startDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (current <= lastDay || currentWeek.length > 0) {
      const dayDate = new Date(current);
      const dayToday = new Date(dayDate);
      dayToday.setHours(0, 0, 0, 0);

      currentWeek.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: dayToday.getTime() === today.getTime(),
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      current.setDate(current.getDate() + 1);
    }

    return { year, month, weeks };
  }, []);

  /**
   * Navigate to next month
   */
  const nextMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  /**
   * Navigate to previous month
   */
  const previousMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  /**
   * Jump to specific date
   */
  const goToDate = useCallback((date: Date) => {
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
  }, []);

  /**
   * Go to today
   */
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }, []);

  /**
   * Get events for a specific date
   */
  const getEventsForDate = useCallback(
    (date: Date) => {
      const dateStr = date.toISOString().split('T')[0];
      return events.filter((event) => {
        const eventStart = event.startDate;
        const eventEnd = event.endDate || event.startDate;
        return dateStr >= eventStart && dateStr <= eventEnd;
      });
    },
    [events]
  );

  // Generate calendar data
  const calendar = useMemo(() => getCalendarDays(currentDate), [currentDate, getCalendarDays]);

  return {
    currentDate,
    calendar,
    nextMonth,
    previousMonth,
    goToDate,
    goToToday,
    getEventsForDate,
    setCurrentDate,
  };
}

/**
 * Hook for date range utilities
 */
export function useDateRange() {
  const getDaysInRange = useCallback((start: Date, end: Date): Date[] => {
    const days: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, []);

  const getWeekNumber = useCallback((date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }, []);

  const isSameDay = useCallback(
    (date1: Date, date2: Date): boolean =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate(),
    []
  );

  const isSameMonth = useCallback(
    (date1: Date, date2: Date): boolean =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth(),
    []
  );

  return {
    getDaysInRange,
    getWeekNumber,
    isSameDay,
    isSameMonth,
  };
}
