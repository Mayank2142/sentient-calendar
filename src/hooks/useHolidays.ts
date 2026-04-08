import { useMemo, useCallback } from 'react';
import { Holiday } from '@/types';
import { HOLIDAYS_2024_2030, getHolidaysForRegion, getHolidaysInRange } from '@/data/holidays';
import { useSettingsStore } from '@/store/settingsStore';

/**
 * Hook for querying and filtering holidays based on user region and preferences
 */
export function useHolidays() {
  const { settings } = useSettingsStore();

  /**
   * Get holidays for the current region(s)
   */
  const getRegionalHolidays = useCallback((date: Date = new Date()): Holiday[] => {
    const year = date.getFullYear();
    const regions = [settings.region, ...settings.additionalRegions];
    const holidays = new Map<string, Holiday>();

    regions.forEach((region) => {
      getHolidaysForRegion(region, year).forEach((holiday) => {
        holidays.set(holiday.id, holiday);
      });
    });

    return Array.from(holidays.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [settings]);

  /**
   * Get holidays in a date range with filtering
   */
  const getHolidaysInDateRange = useCallback(
    (startDate: Date, endDate: Date, regions?: string[]): Holiday[] => {
      const targetRegions = regions || [settings.region, ...settings.additionalRegions];
      const holidays = getHolidaysInRange(startDate, endDate);

      return holidays.filter((holiday) =>
        targetRegions.some((region) => holiday.regions.includes(region))
      );
    },
    [settings]
  );

  /**
   * Get holiday for a specific date
   */
  const getHolidayForDate = useCallback(
    (date: Date): Holiday | undefined => {
      const dateStr = date.toISOString().split('T')[0];
      const regions = [settings.region, ...settings.additionalRegions];

      return HOLIDAYS_2024_2030.find(
        (holiday) =>
          holiday.date === dateStr &&
          regions.some((region) => holiday.regions.includes(region))
      );
    },
    [settings]
  );

  /**
   * Get holidays within a month
   */
  const getMonthHolidays = useCallback(
    (year: number, month: number): Holiday[] => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      return getHolidaysInDateRange(startDate, endDate);
    },
    [getHolidaysInDateRange]
  );

  /**
   * Get upcoming holidays (next 30 days)
   */
  const getUpcomingHolidays = useCallback((): Holiday[] => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    return getHolidaysInDateRange(today, futureDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [getHolidaysInDateRange]);

  /**
   * Check if date is a holiday
   */
  const isHoliday = useCallback(
    (date: Date): boolean => {
      return getHolidayForDate(date) !== undefined;
    },
    [getHolidayForDate]
  );

  /**
   * Get holidays by theme
   */
  const getHolidaysByTheme = useCallback(
    (theme: string): Holiday[] => {
      const regions = [settings.region, ...settings.additionalRegions];
      return HOLIDAYS_2024_2030.filter(
        (holiday) =>
          holiday.theme === theme &&
          regions.some((region) => holiday.regions.includes(region))
      );
    },
    [settings]
  );

  /**
   * Get holidays by tier
   */
  const getHolidaysByTier = useCallback(
    (tier: 1 | 2 | 3 | 4 | 5): Holiday[] => {
      const regions = [settings.region, ...settings.additionalRegions];
      return HOLIDAYS_2024_2030.filter(
        (holiday) =>
          holiday.tier === tier &&
          regions.some((region) => holiday.regions.includes(region))
      );
    },
    [settings]
  );

  /**
   * Get festival countdown (days until next major festival)
   */
  const getFestivalCountdown = useCallback(
    (festival: Holiday): { days: number; date: Date } => {
      const today = new Date();
      const festivalDate = new Date(festival.date);

      if (festivalDate < today) {
        festivalDate.setFullYear(festivalDate.getFullYear() + 1);
      }

      const days = Math.ceil(
        (festivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return { days, date: festivalDate };
    },
    []
  );

  return {
    getRegionalHolidays,
    getHolidaysInDateRange,
    getHolidayForDate,
    getMonthHolidays,
    getUpcomingHolidays,
    isHoliday,
    getHolidaysByTheme,
    getHolidaysByTier,
    getFestivalCountdown,
  };
}
