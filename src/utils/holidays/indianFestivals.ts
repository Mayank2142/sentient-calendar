import { Holiday } from '@/types';

// ─── Indian National Holidays & Festivals 2024–2028 ─────────────────────────
// All dates are hardcoded per year per the exact specification.
// Dates for lunar festivals (Holi, Diwali, Eid) are approximated based on
// published astronomical calendars.

export const indianFestivals: Holiday[] = [
  // ── 2024 ─────────────────────────────────────────────────────────────────
  { id: 'in-republic-2024', name: 'Republic Day', date: '2024-01-26', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#FF9933', description: 'India\'s Republic Day marks the Constitution coming into effect in 1950.', particleEffect: 'confetti' },
  { id: 'in-makar-2024', name: 'Makar Sankranti', date: '2024-01-14', duration: 1, category: 'festival', regions: ['IN'], icon: '🪁', color: '#F59E0B', description: 'Harvest festival marking the sun\'s transition into Capricorn.', particleEffect: 'confetti' },
  { id: 'in-holi-2024', name: 'Holi', date: '2024-03-25', duration: 2, category: 'festival', regions: ['IN'], icon: '🌈', color: '#EC4899', description: 'The festival of colors celebrating the arrival of spring.', particleEffect: 'holi' },
  { id: 'in-ram-nav-2024', name: 'Ram Navami', date: '2024-04-17', duration: 1, category: 'religious', regions: ['IN'], icon: '🏹', color: '#F97316', description: 'Birthday of Lord Rama, celebrated with devotion.', particleEffect: 'none' },
  { id: 'in-eid-fitr-2024', name: 'Eid ul-Fitr', date: '2024-04-10', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival marking the end of Ramadan fasting.', particleEffect: 'eid' },
  { id: 'in-eid-adha-2024', name: 'Eid ul-Adha', date: '2024-06-17', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival of Sacrifice commemorating Ibrahim\'s devotion.', particleEffect: 'eid' },
  { id: 'in-janmashtami-2024', name: 'Janmashtami', date: '2024-08-26', duration: 1, category: 'festival', regions: ['IN'], icon: '🦚', color: '#7C3AED', description: 'Birth anniversary of Lord Krishna.', particleEffect: 'none' },
  { id: 'in-independence-2024', name: 'Independence Day', date: '2024-08-15', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#16A34A', description: 'India\'s Independence from British rule in 1947.', particleEffect: 'confetti' },
  { id: 'in-ganesh-2024', name: 'Ganesh Chaturthi', date: '2024-09-07', duration: 10, category: 'festival', regions: ['IN'], icon: '🐘', color: '#F97316', description: 'Birthday of Lord Ganesha, celebrated with grand processions.', particleEffect: 'confetti' },
  { id: 'in-gandhi-2024', name: 'Gandhi Jayanti', date: '2024-10-02', duration: 1, category: 'national', regions: ['IN'], icon: '🕊️', color: '#6B7280', description: 'Birth anniversary of Mahatma Gandhi.', particleEffect: 'none' },
  { id: 'in-navratri-2024', name: 'Navratri', date: '2024-10-03', duration: 9, category: 'festival', regions: ['IN'], icon: '🪔', color: '#DC2626', description: 'Nine-night festival dedicated to Goddess Durga.', particleEffect: 'confetti' },
  { id: 'in-dussehra-2024', name: 'Dussehra', date: '2024-10-12', duration: 1, category: 'festival', regions: ['IN'], icon: '🎆', color: '#EAB308', description: 'Victory of good over evil, celebrating Rama\'s triumph over Ravana.', particleEffect: 'confetti' },
  { id: 'in-diwali-2024', name: 'Diwali', date: '2024-11-01', duration: 5, category: 'festival', regions: ['IN'], icon: '🪔', color: '#F59E0B', description: 'The Festival of Lights, one of the most celebrated festivals in India.', particleEffect: 'diwali' },
  { id: 'in-bhai-dooj-2024', name: 'Bhai Dooj', date: '2024-11-03', duration: 1, category: 'festival', regions: ['IN'], icon: '👫', color: '#EC4899', description: 'Celebration of brother–sister bond.', particleEffect: 'none' },
  { id: 'in-guru-nanak-2024', name: 'Guru Nanak Jayanti', date: '2024-11-15', duration: 1, category: 'religious', regions: ['IN'], icon: '🙏', color: '#F97316', description: 'Birthday of Guru Nanak Dev Ji, first Sikh Guru.', particleEffect: 'none' },

  // ── 2025 ─────────────────────────────────────────────────────────────────
  { id: 'in-republic-2025', name: 'Republic Day', date: '2025-01-26', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#FF9933', description: 'India\'s Republic Day marks the Constitution coming into effect in 1950.', particleEffect: 'confetti' },
  { id: 'in-makar-2025', name: 'Makar Sankranti', date: '2025-01-14', duration: 1, category: 'festival', regions: ['IN'], icon: '🪁', color: '#F59E0B', description: 'Harvest festival marking the sun\'s transition into Capricorn.', particleEffect: 'confetti' },
  { id: 'in-holi-2025', name: 'Holi', date: '2025-03-14', duration: 2, category: 'festival', regions: ['IN'], icon: '🌈', color: '#EC4899', description: 'The festival of colors celebrating the arrival of spring.', particleEffect: 'holi' },
  { id: 'in-independence-2025', name: 'Independence Day', date: '2025-08-15', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#16A34A', description: 'India\'s Independence from British rule in 1947.', particleEffect: 'confetti' },
  { id: 'in-gandhi-2025', name: 'Gandhi Jayanti', date: '2025-10-02', duration: 1, category: 'national', regions: ['IN'], icon: '🕊️', color: '#6B7280', description: 'Birth anniversary of Mahatma Gandhi.', particleEffect: 'none' },
  { id: 'in-diwali-2025', name: 'Diwali', date: '2025-10-20', duration: 5, category: 'festival', regions: ['IN'], icon: '🪔', color: '#F59E0B', description: 'The Festival of Lights.', particleEffect: 'diwali' },
  { id: 'in-eid-fitr-2025', name: 'Eid ul-Fitr', date: '2025-03-30', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival marking the end of Ramadan fasting.', particleEffect: 'eid' },
  { id: 'in-eid-adha-2025', name: 'Eid ul-Adha', date: '2025-06-06', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival of Sacrifice.', particleEffect: 'eid' },
  { id: 'in-guru-nanak-2025', name: 'Guru Nanak Jayanti', date: '2025-11-05', duration: 1, category: 'religious', regions: ['IN'], icon: '🙏', color: '#F97316', description: 'Birthday of Guru Nanak Dev Ji.', particleEffect: 'none' },

  // ── 2026 ─────────────────────────────────────────────────────────────────
  { id: 'in-republic-2026', name: 'Republic Day', date: '2026-01-26', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#FF9933', description: 'India\'s Republic Day marks the Constitution coming into effect in 1950.', particleEffect: 'confetti' },
  { id: 'in-makar-2026', name: 'Makar Sankranti', date: '2026-01-14', duration: 1, category: 'festival', regions: ['IN'], icon: '🪁', color: '#F59E0B', description: 'Harvest festival marking the sun\'s transition into Capricorn.', particleEffect: 'confetti' },
  { id: 'in-holi-2026', name: 'Holi', date: '2026-03-03', duration: 2, category: 'festival', regions: ['IN'], icon: '🌈', color: '#EC4899', description: 'The festival of colors celebrating the arrival of spring.', particleEffect: 'holi' },
  { id: 'in-independence-2026', name: 'Independence Day', date: '2026-08-15', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#16A34A', description: 'India\'s Independence from British rule in 1947.', particleEffect: 'confetti' },
  { id: 'in-gandhi-2026', name: 'Gandhi Jayanti', date: '2026-10-02', duration: 1, category: 'national', regions: ['IN'], icon: '🕊️', color: '#6B7280', description: 'Birth anniversary of Mahatma Gandhi.', particleEffect: 'none' },
  { id: 'in-diwali-2026', name: 'Diwali', date: '2026-11-08', duration: 5, category: 'festival', regions: ['IN'], icon: '🪔', color: '#F59E0B', description: 'The Festival of Lights.', particleEffect: 'diwali' },
  { id: 'in-eid-fitr-2026', name: 'Eid ul-Fitr', date: '2026-03-20', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival marking the end of Ramadan fasting.', particleEffect: 'eid' },
  { id: 'in-eid-adha-2026', name: 'Eid ul-Adha', date: '2026-05-27', duration: 1, category: 'religious', regions: ['IN'], icon: '🌙', color: '#059669', description: 'Festival of Sacrifice.', particleEffect: 'eid' },

  // ── 2027 ─────────────────────────────────────────────────────────────────
  { id: 'in-republic-2027', name: 'Republic Day', date: '2027-01-26', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#FF9933', description: 'India\'s Republic Day.', particleEffect: 'confetti' },
  { id: 'in-holi-2027', name: 'Holi', date: '2027-03-22', duration: 2, category: 'festival', regions: ['IN'], icon: '🌈', color: '#EC4899', description: 'The festival of colors.', particleEffect: 'holi' },
  { id: 'in-independence-2027', name: 'Independence Day', date: '2027-08-15', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#16A34A', description: 'India\'s Independence Day.', particleEffect: 'confetti' },
  { id: 'in-gandhi-2027', name: 'Gandhi Jayanti', date: '2027-10-02', duration: 1, category: 'national', regions: ['IN'], icon: '🕊️', color: '#6B7280', description: 'Birth anniversary of Mahatma Gandhi.', particleEffect: 'none' },
  { id: 'in-diwali-2027', name: 'Diwali', date: '2027-10-29', duration: 5, category: 'festival', regions: ['IN'], icon: '🪔', color: '#F59E0B', description: 'The Festival of Lights.', particleEffect: 'diwali' },

  // ── 2028 ─────────────────────────────────────────────────────────────────
  { id: 'in-republic-2028', name: 'Republic Day', date: '2028-01-26', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#FF9933', description: 'India\'s Republic Day.', particleEffect: 'confetti' },
  { id: 'in-holi-2028', name: 'Holi', date: '2028-03-11', duration: 2, category: 'festival', regions: ['IN'], icon: '🌈', color: '#EC4899', description: 'The festival of colors.', particleEffect: 'holi' },
  { id: 'in-independence-2028', name: 'Independence Day', date: '2028-08-15', duration: 1, category: 'national', regions: ['IN'], icon: '🇮🇳', color: '#16A34A', description: 'India\'s Independence Day.', particleEffect: 'confetti' },
  { id: 'in-gandhi-2028', name: 'Gandhi Jayanti', date: '2028-10-02', duration: 1, category: 'national', regions: ['IN'], icon: '🕊️', color: '#6B7280', description: 'Birth anniversary of Mahatma Gandhi.', particleEffect: 'none' },
  { id: 'in-diwali-2028', name: 'Diwali', date: '2028-11-16', duration: 5, category: 'festival', regions: ['IN'], icon: '🪔', color: '#F59E0B', description: 'The Festival of Lights.', particleEffect: 'diwali' },

  // ── Year-invariant pan-India ──────────────────────────────────────────────
  { id: 'in-christmas', name: 'Christmas', date: '2024-12-25', duration: 1, category: 'cultural', regions: ['IN'], icon: '🎄', color: '#16A34A', description: 'Christmas celebrated across India.', particleEffect: 'christmas' },
  { id: 'in-christmas-25', name: 'Christmas', date: '2025-12-25', duration: 1, category: 'cultural', regions: ['IN'], icon: '🎄', color: '#16A34A', description: 'Christmas celebrated across India.', particleEffect: 'christmas' },
  { id: 'in-christmas-26', name: 'Christmas', date: '2026-12-25', duration: 1, category: 'cultural', regions: ['IN'], icon: '🎄', color: '#16A34A', description: 'Christmas celebrated across India.', particleEffect: 'christmas' },
  { id: 'in-christmas-27', name: 'Christmas', date: '2027-12-25', duration: 1, category: 'cultural', regions: ['IN'], icon: '🎄', color: '#16A34A', description: 'Christmas celebrated across India.', particleEffect: 'christmas' },
  { id: 'in-christmas-28', name: 'Christmas', date: '2028-12-25', duration: 1, category: 'cultural', regions: ['IN'], icon: '🎄', color: '#16A34A', description: 'Christmas celebrated across India.', particleEffect: 'christmas' },
];
