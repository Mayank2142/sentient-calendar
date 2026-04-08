import { Holiday } from '@/types';

// ─── Global & Astronomical Holidays 2024–2028 ────────────────────────────────
export const globalHolidays: Holiday[] = [
  // ── New Year (all years) ──────────────────────────────────────────────────
  { id: 'new-year-2024', name: "New Year's Day", date: '2024-01-01', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎉', color: '#8B5CF6', description: "The first day of the Gregorian New Year.", particleEffect: 'newyear' },
  { id: 'new-year-2025', name: "New Year's Day", date: '2025-01-01', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎉', color: '#8B5CF6', description: "The first day of the Gregorian New Year.", particleEffect: 'newyear' },
  { id: 'new-year-2026', name: "New Year's Day", date: '2026-01-01', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎉', color: '#8B5CF6', description: "The first day of the Gregorian New Year.", particleEffect: 'newyear' },
  { id: 'new-year-2027', name: "New Year's Day", date: '2027-01-01', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎉', color: '#8B5CF6', description: "The first day of the Gregorian New Year.", particleEffect: 'newyear' },
  { id: 'new-year-2028', name: "New Year's Day", date: '2028-01-01', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎉', color: '#8B5CF6', description: "The first day of the Gregorian New Year.", particleEffect: 'newyear' },

  // ── Valentine's Day ───────────────────────────────────────────────────────
  { id: 'valentine-2024', name: "Valentine's Day", date: '2024-02-14', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '❤️', color: '#EC4899', description: "Day celebrating love and affection.", particleEffect: 'none' },
  { id: 'valentine-2025', name: "Valentine's Day", date: '2025-02-14', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '❤️', color: '#EC4899', description: "Day celebrating love and affection.", particleEffect: 'none' },
  { id: 'valentine-2026', name: "Valentine's Day", date: '2026-02-14', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '❤️', color: '#EC4899', description: "Day celebrating love and affection.", particleEffect: 'none' },
  { id: 'valentine-2027', name: "Valentine's Day", date: '2027-02-14', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '❤️', color: '#EC4899', description: "Day celebrating love and affection.", particleEffect: 'none' },
  { id: 'valentine-2028', name: "Valentine's Day", date: '2028-02-14', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '❤️', color: '#EC4899', description: "Day celebrating love and affection.", particleEffect: 'none' },

  // ── International Women's Day ─────────────────────────────────────────────
  { id: 'womens-day-2024', name: "International Women's Day", date: '2024-03-08', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '♀️', color: '#7C3AED', description: "Global day celebrating women's rights.", particleEffect: 'confetti' },
  { id: 'womens-day-2025', name: "International Women's Day", date: '2025-03-08', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '♀️', color: '#7C3AED', description: "Global day celebrating women's rights.", particleEffect: 'confetti' },
  { id: 'womens-day-2026', name: "International Women's Day", date: '2026-03-08', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '♀️', color: '#7C3AED', description: "Global day celebrating women's rights.", particleEffect: 'confetti' },
  { id: 'womens-day-2027', name: "International Women's Day", date: '2027-03-08', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '♀️', color: '#7C3AED', description: "Global day celebrating women's rights.", particleEffect: 'confetti' },
  { id: 'womens-day-2028', name: "International Women's Day", date: '2028-03-08', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '♀️', color: '#7C3AED', description: "Global day celebrating women's rights.", particleEffect: 'confetti' },

  // ── Earth Day ─────────────────────────────────────────────────────────────
  { id: 'earth-day-2024', name: 'Earth Day', date: '2024-04-22', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🌍', color: '#16A34A', description: "Annual event to demonstrate support for environmental protection.", particleEffect: 'none' },
  { id: 'earth-day-2025', name: 'Earth Day', date: '2025-04-22', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🌍', color: '#16A34A', description: "Annual event to demonstrate support for environmental protection.", particleEffect: 'none' },
  { id: 'earth-day-2026', name: 'Earth Day', date: '2026-04-22', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🌍', color: '#16A34A', description: "Annual event to demonstrate support for environmental protection.", particleEffect: 'none' },

  // ── Halloween ─────────────────────────────────────────────────────────────
  { id: 'halloween-2024', name: 'Halloween', date: '2024-10-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎃', color: '#F97316', description: "Celebrated with costumes and trick-or-treating.", particleEffect: 'none' },
  { id: 'halloween-2025', name: 'Halloween', date: '2025-10-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎃', color: '#F97316', description: "Celebrated with costumes and trick-or-treating.", particleEffect: 'none' },
  { id: 'halloween-2026', name: 'Halloween', date: '2026-10-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎃', color: '#F97316', description: "Celebrated with costumes and trick-or-treating.", particleEffect: 'none' },
  { id: 'halloween-2027', name: 'Halloween', date: '2027-10-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🎃', color: '#F97316', description: "Celebrated with costumes and trick-or-treating.", particleEffect: 'none' },

  // ── New Year's Eve ────────────────────────────────────────────────────────
  { id: 'nye-2024', name: "New Year's Eve", date: '2024-12-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🥂', color: '#8B5CF6', description: "Last day of the year, celebrated worldwide.", particleEffect: 'newyear' },
  { id: 'nye-2025', name: "New Year's Eve", date: '2025-12-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🥂', color: '#8B5CF6', description: "Last day of the year, celebrated worldwide.", particleEffect: 'newyear' },
  { id: 'nye-2026', name: "New Year's Eve", date: '2026-12-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🥂', color: '#8B5CF6', description: "Last day of the year, celebrated worldwide.", particleEffect: 'newyear' },
  { id: 'nye-2027', name: "New Year's Eve", date: '2027-12-31', duration: 1, category: 'cultural', regions: ['GLOBAL'], icon: '🥂', color: '#8B5CF6', description: "Last day of the year, celebrated worldwide.", particleEffect: 'newyear' },

  // ── Astronomical Events ───────────────────────────────────────────────────
  { id: 'spring-eq-2024', name: 'Spring Equinox', date: '2024-03-20', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🌸', color: '#A78BFA', description: 'Day and night are equal in length. Spring begins.', particleEffect: 'none' },
  { id: 'summer-sol-2024', name: 'Summer Solstice', date: '2024-06-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '☀️', color: '#FB923C', description: 'Longest day of the year. Summer begins.', particleEffect: 'none' },
  { id: 'autumn-eq-2024', name: 'Autumn Equinox', date: '2024-09-22', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🍂', color: '#D97706', description: 'Day and night are equal in length. Autumn begins.', particleEffect: 'none' },
  { id: 'winter-sol-2024', name: 'Winter Solstice', date: '2024-12-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '❄️', color: '#60A5FA', description: 'Shortest day of the year. Winter begins.', particleEffect: 'snow' },
  { id: 'spring-eq-2025', name: 'Spring Equinox', date: '2025-03-20', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🌸', color: '#A78BFA', description: 'Day and night are equal in length. Spring begins.', particleEffect: 'none' },
  { id: 'summer-sol-2025', name: 'Summer Solstice', date: '2025-06-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '☀️', color: '#FB923C', description: 'Longest day of the year. Summer begins.', particleEffect: 'none' },
  { id: 'autumn-eq-2025', name: 'Autumn Equinox', date: '2025-09-22', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🍂', color: '#D97706', description: 'Day and night are equal in length. Autumn begins.', particleEffect: 'none' },
  { id: 'winter-sol-2025', name: 'Winter Solstice', date: '2025-12-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '❄️', color: '#60A5FA', description: 'Shortest day of the year. Winter begins.', particleEffect: 'snow' },
  { id: 'spring-eq-2026', name: 'Spring Equinox', date: '2026-03-20', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🌸', color: '#A78BFA', description: 'Day and night are equal in length. Spring begins.', particleEffect: 'none' },
  { id: 'summer-sol-2026', name: 'Summer Solstice', date: '2026-06-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '☀️', color: '#FB923C', description: 'Longest day of the year. Summer begins.', particleEffect: 'none' },
  { id: 'autumn-eq-2026', name: 'Autumn Equinox', date: '2026-09-22', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '🍂', color: '#D97706', description: 'Day and night are equal in length. Autumn begins.', particleEffect: 'none' },
  { id: 'winter-sol-2026', name: 'Winter Solstice', date: '2026-12-21', duration: 1, category: 'astronomical', regions: ['GLOBAL'], icon: '❄️', color: '#60A5FA', description: 'Shortest day of the year. Winter begins.', particleEffect: 'snow' },
];
