// Pure JavaScript Lunar Calendar & Holiday Calculation Engine

import { MoonPhase } from '@/types';

/**
 * Calculate moon phase for any given date (0-7, where 0 = new moon)
 * Based on the known new moon of January 6, 2000 (JD 2451550.1)
 */
export function getMoonPhase(date: Date): MoonPhase {
  const KNOWN_NEW_MOON = 2451550.1; // January 6, 2000 (Julian Day)
  const LUNAR_CYCLE = 29.530588861; // days

  const jd = dateToJulianDay(date);
  const daysSinceNewMoon = (jd - KNOWN_NEW_MOON) % LUNAR_CYCLE;
  const phase = Math.floor((daysSinceNewMoon / LUNAR_CYCLE) * 8);

  const phaseNames = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const phaseLabels = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];

  return {
    phase,
    emoji: phaseNames[phase],
    name: phaseLabels[phase],
    illumination: Math.round(
      50 + 50 * Math.cos(2 * Math.PI * (daysSinceNewMoon / LUNAR_CYCLE))
    ),
  };
}

/**
 * Convert Gregorian date to Julian Day Number
 */
function dateToJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  return jdn + 0.5; // Add fractional part for time
}

/**
 * Calculate Diwali date for a given year
 * Diwali = 15th day of Kartik month (new moon in Oct/Nov)
 */
export function calculateDiwaliDate(year: number): Date {
  // Kartik Amavasya (new moon) typically falls in Oct/Nov
  // Using historical approximation: typically Oct 30 - Nov 15
  const approximateDate = new Date(year, 9, 30); // Oct 30

  // Find the nearest new moon
  for (let i = -5; i <= 15; i++) {
    const testDate = new Date(year, 9, 30 + i);
    const phase = getMoonPhase(testDate);
    if (phase.phase === 0) {
      // Found new moon, Diwali is on this date
      return testDate;
    }
  }

  return approximateDate; // Fallback
}

/**
 * Calculate Holi date for a given year
 * Holi = Full moon in Phalguna month (Feb/Mar)
 */
export function calculateHoliDate(year: number): Date {
  const approximateDate = new Date(year, 2, 15); // Mar 15

  // Find the nearest full moon
  for (let i = -15; i <= 15; i++) {
    const testDate = new Date(year, 1, 15 + i);
    const phase = getMoonPhase(testDate);
    if (phase.phase === 4) {
      // Found full moon, Holi is on this date
      return testDate;
    }
  }

  return approximateDate; // Fallback
}

/**
 * Calculate Chinese New Year (2nd new moon after winter solstice)
 */
export function calculateChineseNewYear(year: number): Date {
  const winterSolstice = new Date(year, 11, 21); // Dec 21
  let newMoonCount = 0;

  for (let i = 0; i <= 60; i++) {
    const testDate = new Date(year + (Math.floor((11 + i) / 12)), (11 + i) % 12, 21 + (i * 30) % 30);
    const phase = getMoonPhase(testDate);

    if (phase.phase === 0) {
      newMoonCount++;
      if (newMoonCount === 2) {
        return testDate;
      }
    }
  }

  return new Date(year + 1, 1, 10); // Fallback
}

/**
 * Calculate Ramadan start date for a given year
 * Using a simplified algorithm based on known Ramadan dates
 */
export function calculateRamadanDate(year: number): Date {
  // Ramadan dates (1st day) for 2024-2030 (pre-calculated)
  const ramadanDates: Record<number, string> = {
    2024: '2024-03-11',
    2025: '2025-02-28',
    2026: '2026-02-17',
    2027: '2027-02-07',
    2028: '2028-01-27',
    2029: '2029-01-16',
    2030: '2030-01-05',
  };

  if (ramadanDates[year]) {
    const [y, m, d] = ramadanDates[year].split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  return new Date(year, 2, 11); // Fallback
}

/**
 * Calculate Easter date using the Anonymous Gregorian Algorithm
 */
export function calculateEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/**
 * Get all equinoxes and solstices for a year
 */
export function getAstronomicalEvents(year: number): Record<string, Date> {
  return {
    springEquinox: new Date(year, 2, 20), // ~Mar 20
    summerSolstice: new Date(year, 5, 20), // ~Jun 20
    autumnEquinox: new Date(year, 8, 22), // ~Sep 22
    winterSolstice: new Date(year, 11, 21), // ~Dec 21
  };
}

/**
 * Check if a date has a lunar eclipse (pre-calculated for 2024-2030)
 */
export function hasLunarEclipse(date: Date): boolean {
  const eclipseDates = [
    '2024-09-18',
    '2025-03-14',
    '2025-09-07',
    '2026-03-07',
    '2026-08-31',
    '2027-02-24',
    '2027-08-20',
    '2028-01-12',
    '2028-07-06',
    '2029-06-26',
    '2030-06-15',
    '2030-12-09',
  ];

  const dateStr = date.toISOString().split('T')[0];
  return eclipseDates.includes(dateStr);
}

/**
 * Check if a date has a solar eclipse (pre-calculated for 2024-2030)
 */
export function hasSolarEclipse(date: Date): boolean {
  const eclipseDates = [
    '2024-10-02',
    '2025-03-29',
    '2025-09-21',
    '2026-02-17',
    '2026-08-12',
    '2027-02-06',
    '2027-08-02',
    '2028-01-26',
    '2028-07-22',
    '2029-01-15',
    '2029-07-11',
    '2030-01-05',
    '2030-06-30',
  ];

  const dateStr = date.toISOString().split('T')[0];
  return eclipseDates.includes(dateStr);
}

/**
 * Get supermoon dates for a year
 */
export function getSupermoonDates(year: number): Date[] {
  const supermoons = {
    2024: ['2024-10-07', '2024-11-05', '2024-12-04'],
    2025: ['2025-01-03', '2025-10-07', '2025-11-05', '2025-12-04'],
    2026: ['2026-01-02', '2026-12-24'],
    2027: ['2027-01-23', '2027-12-23'],
    2028: ['2028-01-12', '2028-12-11'],
    2029: ['2029-01-01', '2029-11-30', '2029-12-30'],
    2030: ['2030-10-09', '2030-11-08', '2030-12-07'],
  } as Record<number, string[]>;

  return (supermoons[year] || []).map(
    (dateStr) => new Date(dateStr + 'T00:00:00Z')
  );
}
