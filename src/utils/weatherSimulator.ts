import { WeatherDay } from '@/types';
import { getDaysInMonth } from 'date-fns';

// ─── Deterministic Weather Simulator ─────────────────────────────────────────
// Uses a seeded pseudo-random function based on date + month, so the weather
// is always consistent for the same date — never random on re-render.

const ICONS = ['☀️', '⛅', '🌤️', '🌧️', '⛈️', '🌫️', '❄️', '🌬️'];
const CONDITIONS = [
  'Sunny', 'Partly Cloudy', 'Mostly Sunny', 'Rainy', 'Thunderstorm',
  'Foggy', 'Snowy', 'Windy',
];

// Temperature ranges by month (min, max) in Celsius for typical Indian climate
const MONTH_TEMP_RANGE: [number, number][] = [
  [12, 24], // Jan
  [14, 27], // Feb
  [18, 33], // Mar
  [22, 38], // Apr
  [26, 42], // May
  [25, 37], // Jun
  [24, 33], // Jul
  [23, 31], // Aug
  [22, 32], // Sep
  [18, 30], // Oct
  [14, 27], // Nov
  [11, 23], // Dec
];

// Seasonal weather index preferences by month
const MONTH_WEATHER_PREFS: number[][] = [
  [0, 1, 6],     // Jan: sunny, cloudy, snow
  [0, 1, 2],     // Feb: sunny
  [0, 2, 1],     // Mar: sunny
  [0, 0, 2],     // Apr: very sunny
  [0, 1, 4],     // May: sunny, storms
  [3, 4, 1],     // Jun: rainy, storms
  [3, 3, 4],     // Jul: rainy, storms
  [3, 4, 1],     // Aug: rainy
  [1, 2, 3],     // Sep: mixed
  [0, 1, 2],     // Oct: sunny clearing
  [5, 1, 0],     // Nov: foggy
  [5, 6, 1],     // Dec: foggy, cold
];

/**
 * Seeded pseudo-random number generator.
 * Ensures same output for same seed (date-based).
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate a deterministic weather forecast for ALL days of the given month.
 */
export function generateWeatherForecast(baseDate: Date = new Date()): WeatherDay[] {
  const forecast: WeatherDay[] = [];
  const year = baseDate.getFullYear();
  const monthIdx = baseDate.getMonth();
  const totalDays = getDaysInMonth(baseDate);

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(year, monthIdx, i + 1);

    const month = date.getMonth();
    const seed = date.getFullYear() * 10000 + month * 100 + date.getDate();
    const rng = seededRandom(seed);

    const prefs = MONTH_WEATHER_PREFS[month];
    const conditionIdx = prefs[Math.floor(rng * prefs.length)];
    const [minTemp, maxTemp] = MONTH_TEMP_RANGE[month];
    const tempVariation = seededRandom(seed * 2);
    const temp = Math.round(minTemp + tempVariation * (maxTemp - minTemp));

    forecast.push({
      date,
      dayNumber: date.getDate(),
      icon: ICONS[conditionIdx],
      tempC: temp,
      condition: CONDITIONS[conditionIdx],
    });
  }

  return forecast;
}
