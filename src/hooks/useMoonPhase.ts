import { useCallback, useMemo } from 'react';
import { MoonPhase } from '@/types';
import { getMoonPhase, getSupermoonDates, hasLunarEclipse, hasSolarEclipse } from '@/utils/holidays/lunarCalendar';

/**
 * Hook for moon phase calculations and lunar event detection
 */
export function useMoonPhase() {
  /**
   * Get moon phase for a specific date
   */
  const getMoonPhaseForDate = useCallback((date: Date): MoonPhase => {
    return getMoonPhase(date);
  }, []);

  /**
   * Get moon phase for today
   */
  const getTodayMoonPhase = useCallback((): MoonPhase => {
    return getMoonPhase(new Date());
  }, []);

  /**
   * Get next full moon
   */
  const getNextFullMoon = useCallback((startDate: Date = new Date()): Date => {
    let current = new Date(startDate);

    // Search for next full moon (phase 4)
    for (let i = 0; i < 30; i++) {
      const phase = getMoonPhase(current);
      if (phase.phase === 4) {
        return current;
      }
      current.setDate(current.getDate() + 1);
    }

    return current;
  }, []);

  /**
   * Get next new moon
   */
  const getNextNewMoon = useCallback((startDate: Date = new Date()): Date => {
    let current = new Date(startDate);

    // Search for next new moon (phase 0)
    for (let i = 0; i < 30; i++) {
      const phase = getMoonPhase(current);
      if (phase.phase === 0) {
        return current;
      }
      current.setDate(current.getDate() + 1);
    }

    return current;
  }, []);

  /**
   * Get moon phases for entire month
   */
  const getMonthMoonPhases = useCallback(
    (year: number, month: number): Array<{ date: Date; phase: MoonPhase }> => {
      const phases: Array<{ date: Date; phase: MoonPhase }> = [];
      const lastDay = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        phases.push({
          date,
          phase: getMoonPhase(date),
        });
      }

      return phases;
    },
    []
  );

  /**
   * Check if date has lunar eclipse
   */
  const hasLunarEclipseOnDate = useCallback((date: Date): boolean => {
    return hasLunarEclipse(date);
  }, []);

  /**
   * Check if date has solar eclipse
   */
  const hasSolarEclipseOnDate = useCallback((date: Date): boolean => {
    return hasSolarEclipse(date);
  }, []);

  /**
   * Get supermoon dates for year
   */
  const getSupermoonDatesForYear = useCallback((year: number): Date[] => {
    return getSupermoonDates(year);
  }, []);

  /**
   * Check if date is a supermoon
   */
  const isSupermoon = useCallback((date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    const supermoons = getSupermoonDates(date.getFullYear());
    return supermoons.some((sm) => sm.toISOString().split('T')[0] === dateStr);
  }, []);

  /**
   * Get lunar calendar info for date
   */
  const getLunarInfo = useCallback(
    (date: Date) => {
      const phase = getMoonPhase(date);
      const isEclipse = hasLunarEclipse(date) || hasSolarEclipse(date);
      const isSuper = isSupermoon(date);

      return {
        phase,
        isEclipse,
        isSupermoon: isSuper,
        eclipseType: hasLunarEclipse(date) ? 'lunar' : hasSolarEclipse(date) ? 'solar' : null,
      };
    },
    [isSupermoon]
  );

  /**
   * Get moon age in days (0-29.5)
   */
  const getMoonAge = useCallback((date: Date): number => {
    const phase = getMoonPhase(date);
    const LUNAR_CYCLE = 29.530588861;
    return (phase.phase / 8) * LUNAR_CYCLE;
  }, []);

  return {
    getMoonPhaseForDate,
    getTodayMoonPhase,
    getNextFullMoon,
    getNextNewMoon,
    getMonthMoonPhases,
    hasLunarEclipseOnDate,
    hasSolarEclipseOnDate,
    getSupermoonDatesForYear,
    isSupermoon,
    getLunarInfo,
    getMoonAge,
  };
}
