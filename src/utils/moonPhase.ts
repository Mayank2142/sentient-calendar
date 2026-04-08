import { MoonPhase } from '@/types';

// ─── Moon Phase Calculation ───────────────────────────────────────────────────
// Uses the known new moon reference date and the 29.530588853-day synodic period.
// No external library required.

const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z'); // Reference new moon
const SYNODIC_PERIOD = 29.530588853;

const MOON_PHASES: Omit<MoonPhase, 'illumination'>[] = [
  { phase: 0, emoji: '🌑', name: 'New Moon' },
  { phase: 1, emoji: '🌒', name: 'Waxing Crescent' },
  { phase: 2, emoji: '🌓', name: 'First Quarter' },
  { phase: 3, emoji: '🌔', name: 'Waxing Gibbous' },
  { phase: 4, emoji: '🌕', name: 'Full Moon' },
  { phase: 5, emoji: '🌖', name: 'Waning Gibbous' },
  { phase: 6, emoji: '🌗', name: 'Last Quarter' },
  { phase: 7, emoji: '🌘', name: 'Waning Crescent' },
];

/**
 * Returns the age of the moon (days since last new moon) for a given date.
 */
export function getMoonAge(date: Date): number {
  const daysSinceRef = (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
  const age = daysSinceRef % SYNODIC_PERIOD;
  return age < 0 ? age + SYNODIC_PERIOD : age;
}

/**
 * Returns the full MoonPhase object for a given date.
 */
export function getMoonPhaseForDate(date: Date): MoonPhase {
  const age = getMoonAge(date);
  const phaseIndex = Math.floor((age / SYNODIC_PERIOD) * 8) % 8;
  const illuminationRaw = (age <= SYNODIC_PERIOD / 2)
    ? (age / (SYNODIC_PERIOD / 2)) * 100
    : ((SYNODIC_PERIOD - age) / (SYNODIC_PERIOD / 2)) * 100;

  return {
    ...MOON_PHASES[phaseIndex],
    illumination: Math.round(illuminationRaw),
  };
}

/**
 * Returns the date of the next full moon after the given date.
 */
export function getNextFullMoon(from: Date = new Date()): Date {
  const age = getMoonAge(from);
  // Full moon is at phase index 4 → ~50% through synodic period
  const daysUntilFull = age <= SYNODIC_PERIOD / 2
    ? SYNODIC_PERIOD / 2 - age
    : SYNODIC_PERIOD - age + SYNODIC_PERIOD / 2;

  const next = new Date(from);
  next.setDate(next.getDate() + Math.ceil(daysUntilFull));
  return next;
}

/**
 * Returns the date of the next new moon after the given date.
 */
export function getNextNewMoon(from: Date = new Date()): Date {
  const age = getMoonAge(from);
  const daysUntilNew = SYNODIC_PERIOD - age;
  const next = new Date(from);
  next.setDate(next.getDate() + Math.ceil(daysUntilNew));
  return next;
}

/**
 * Returns all 8 moon phase milestones for the current lunar cycle from a given date.
 */
export function getLunarCycleForMonth(year: number, month: number): { date: Date; phase: MoonPhase }[] {
  const firstDay = new Date(year, month, 1);
  const results: { date: Date; phase: MoonPhase }[] = [];

  // Scan all days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let lastPhaseIndex = -1;
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const mp = getMoonPhaseForDate(d);
    if (mp.phase !== lastPhaseIndex) {
      results.push({ date: d, phase: mp });
      lastPhaseIndex = mp.phase;
    }
  }
  return results;
}

/**
 * Returns true if today is approximately a supermoon (moon age near 0 and perigee).
 * Uses a simplified approximation based on synodic position.
 */
export function isSupermoon(date: Date): boolean {
  const age = getMoonAge(date);
  // Supermoon typically occurs near full moon (age ~ 14.75) within ±2 days
  return Math.abs(age - SYNODIC_PERIOD / 2) < 2;
}
