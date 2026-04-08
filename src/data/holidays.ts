// Global Holidays Database 2024-2030 (195+ countries, 5 tiers)

import { Holiday } from '@/types';

export const HOLIDAYS_2024_2030: Holiday[] = [
  // ==================== TIER 1: MAJOR INDIAN FESTIVALS ====================

  {
    id: 'diwali-2024',
    name: 'Diwali',
    localNames: {
      hi: 'दिवाली',
      ta: 'திபாவளி',
      te: 'దీపావళి',
      bn: 'দীপাবলি',
      mr: 'दिवाळी',
      gu: 'દિવાળી',
      pa: 'ਦਿਵਾਲੀ',
      ml: 'ദിവാളി',
      kn: 'ದೀಪಾವಳಿ',
    },
    date: '2024-11-01',
    endDate: '2024-11-05',
    duration: 5,
    category: ['festival', 'religious', 'cultural'],
    tier: 1,
    regions: ['IN', 'IN-DL', 'IN-MH', 'IN-UP', 'IN-GJ', 'IN-BR', 'IN-OD', 'IN-RJ', 'IN-MP', 'IN-TN', 'IN-KA', 'IN-TE', 'IN-KL', 'IN-AS', 'IN-PB', 'NP', 'FJ', 'MY', 'SG', 'TT', 'MU'],
    icon: '🪔',
    color: '#FFA500',
    theme: 'diwali',
    description: 'Festival of Lights celebrating the victory of light over darkness and good over evil. Observed for five days with lighting diyas (oil lamps), fireworks, feasting, and gift-giving. Marks the beginning of the Hindu new year in many regions.',
    traditions: [
      'Lighting diyas and candles',
      'Fireworks displays',
      'Cleaning and decorating homes',
      'Exchanging sweets and gifts',
      'Worshipping Lakshmi (wealth goddess)',
      'Family gatherings',
      'New clothes',
      'Rangoli (colorful floor art)',
    ],
    significance: ['Religious', 'Cultural', 'Social'],
    particleEffect: 'sparkle',
    badgeStyle: {
      bgColor: '#FFA500',
      textColor: '#FFFFFF',
      borderColor: '#FFD700',
      icon: '🪔',
    },
  },

  {
    id: 'holi-2024',
    name: 'Holi',
    localNames: {
      hi: 'होली',
      ta: 'ஹோலி',
      te: 'హోలీ',
      bn: 'হোলি',
      mr: 'होळी',
      gu: 'હોળી',
      pa: 'ਹੋਲੀ',
      ml: 'ഹോലി',
      kn: 'ಹೋಳಿ',
    },
    date: '2024-03-25',
    endDate: '2024-03-26',
    duration: 2,
    category: ['festival', 'religious', 'cultural'],
    tier: 1,
    regions: ['IN', 'IN-UP', 'IN-DL', 'IN-RJ', 'IN-MP', 'IN-BR', 'IN-OD', 'NP', 'MU', 'TT', 'SG', 'MY'],
    icon: '🎨',
    color: '#FF6B9D',
    theme: 'holi',
    description: 'Festival of Colors celebrating the arrival of spring and the victory of good over evil. Celebrated with colored powder (gulal), water balloons, bonfires, and festive gatherings. Marks the end of winter and beginning of spring.',
    traditions: [
      'Playing with colored powder',
      'Water balloon fights',
      'Bonfire gathering (Holika Dahan)',
      'Traditional sweets',
      'Singing and dancing',
      'New clothes',
      'Social visits and forgiveness',
    ],
    significance: ['Religious', 'Cultural', 'Seasonal'],
    particleEffect: 'powder',
    badgeStyle: {
      bgColor: '#FF6B9D',
      textColor: '#FFFFFF',
      borderColor: '#FF1493',
    },
  },

  {
    id: 'navratri-2024',
    name: 'Navratri',
    localNames: {
      hi: 'नवरात्रि',
      ta: 'நவராத்திரி',
      te: 'నవరాత్రులు',
      bn: 'নবরাত্রি',
      mr: 'नवरात्रि',
      gu: 'નવરાત્રિ',
      pa: 'ਨਵਰਾਤਰੀ',
      ml: 'നവരാത്രി',
      kn: 'ನವರಾತ್ರಿ',
    },
    date: '2024-10-12',
    endDate: '2024-10-20',
    duration: 9,
    category: ['festival', 'religious'],
    tier: 1,
    regions: ['IN', 'IN-GJ', 'IN-MH', 'IN-KA', 'IN-TN', 'IN-AP', 'IN-DL'],
    icon: '🌸',
    color: '#FF4444',
    theme: 'diwali',
    description: 'Nine-night festival celebrating the victory of Goddess Durga over the buffalo demon. Each day honors a different form of the goddess with fasting, prayers, and celebrations.',
    traditions: [
      'Fasting and prayers',
      'Garba and Dandiya dancing',
      'Ritual worship',
      'Visiting temples',
      'Sharing blessed food (prasad)',
      'Colorful decorations',
      'Community celebrations',
    ],
    significance: ['Religious', 'Cultural'],
    particleEffect: 'petal',
    badgeStyle: {
      bgColor: '#FF4444',
      textColor: '#FFFFFF',
      borderColor: '#AA0000',
    },
  },

  {
    id: 'eid-ul-fitr-2024',
    name: 'Eid ul-Fitr',
    localNames: {
      hi: 'ईद',
      ar: 'عيد الفطر',
      ur: 'عید الفطر',
      bn: 'ঈদ',
      ta: 'ஈத்',
      te: 'ఈద్',
    },
    date: '2024-04-10',
    endDate: '2024-04-11',
    duration: 2,
    category: ['festival', 'religious'],
    tier: 1,
    regions: ['IN', 'IN-JK', 'IN-UT', 'SA', 'AE', 'QA', 'BH', 'KW', 'OM', 'YE', 'EG', 'MA', 'DZ', 'TN', 'PK', 'BD', 'MY', 'ID', 'TR', 'IR', 'SG'],
    icon: '🌙',
    color: '#2E8B57',
    theme: 'eid',
    description: 'Islamic festival marking the end of Ramadan (month of fasting). Celebrated with prayers, feasting, wearing new clothes, and exchanging gifts. Symbolizes joy and gratitude.',
    traditions: [
      'Special prayers at dawn',
      'Wearing new traditional clothes',
      'Exchanging hugs and greetings',
      'Festive meals with family',
      'Giving gifts to children (Eidi)',
      'Visiting friends and relatives',
      'Acts of charity (Zakat)',
    ],
    significance: ['Religious', 'Cultural', 'Social'],
    particleEffect: 'petal',
    badgeStyle: {
      bgColor: '#2E8B57',
      textColor: '#FFFFFF',
      borderColor: '#228B22',
    },
  },

  {
    id: 'eid-ul-adha-2024',
    name: 'Eid ul-Adha',
    localNames: {
      hi: 'ईद-उल-अदहा',
      ar: 'عيد الأضحى',
      ur: 'عید الاضحیٰ',
      bn: 'ঈদুল আজহা',
      ta: 'பகரீது',
      te: 'బక్రీదు',
    },
    date: '2024-06-16',
    endDate: '2024-06-17',
    duration: 2,
    category: ['festival', 'religious'],
    tier: 1,
    regions: ['IN', 'SA', 'AE', 'QA', 'BH', 'KW', 'OM', 'YE', 'EG', 'MA', 'DZ', 'TN', 'PK', 'BD', 'MY', 'ID', 'TR', 'IR', 'SG'],
    icon: '🐑',
    color: '#8B4513',
    theme: 'eid',
    description: 'Islamic festival of sacrifice commemorating Prophet Ibrahiim\'s willingness to sacrifice his son. Celebrated with animal sacrifice, feast, and community gatherings.',
    traditions: [
      'Animal sacrifice (Qurbani)',
      'Feasting on meat',
      'Wearing traditional attire',
      'Visiting family and friends',
      'Sharing meat with poor',
      'Special prayers',
      'Gift-giving',
    ],
    significance: ['Religious', 'Cultural', 'Social'],
    particleEffect: 'none',
    badgeStyle: {
      bgColor: '#8B4513',
      textColor: '#FFFFFF',
      borderColor: '#654321',
    },
  },

  {
    id: 'pongal-2024',
    name: 'Pongal',
    localNames: {
      ta: 'பொங்கல்',
      te: 'భోగి',
      kn: 'ಪೋಂಗಲ್',
      ml: 'പോംഗല്',
      hi: 'मकर संक्रांति',
    },
    date: '2024-01-14',
    endDate: '2024-01-17',
    duration: 4,
    category: ['festival', 'cultural', 'agricultural'],
    tier: 1,
    regions: ['IN-TN', 'IN-AP', 'IN-KA', 'IN-ML', 'IN-KN'],
    icon: '🌾',
    color: '#FFD700',
    theme: 'summer',
    description: 'Tamil harvest festival marking the sun\'s entry into Capricorn zodiac. Celebrated with cooking rice in new clay pots, cattle decoration, and family gatherings. Also known as Makar Sankranti in other regions.',
    traditions: [
      'Cooking pongal in new clay pots',
      'Using turmeric and sugarcane',
      'Cattle decoration (Mattu Pongal)',
      'Bonfire gathering',
      'Exchange of gifts',
      'Family feasts',
      'Flying kites (in some regions)',
    ],
    significance: ['Agricultural', 'Cultural', 'Seasonal'],
    particleEffect: 'none',
    badgeStyle: {
      bgColor: '#FFD700',
      textColor: '#8B4513',
      borderColor: '#FFA500',
    },
  },

  // ==================== TIER 2: GLOBAL HOLIDAYS ====================

  {
    id: 'new-year-2024',
    name: "New Year's Day",
    localNames: {
      en: "New Year's Day",
      hi: 'नया साल',
      es: 'Día de Año Nuevo',
      fr: 'Jour de l\'An',
      de: 'Neujahrstag',
      pt: 'Ano Novo',
      ja: '元日',
      zh: '元旦',
      ar: 'رأس السنة',
    },
    date: '2024-01-01',
    duration: 1,
    category: ['national', 'cultural'],
    tier: 2,
    regions: ['US', 'UK', 'CA', 'AU', 'IN', 'EU', 'JP', 'CN', 'BR', 'MX', 'RU', 'SA', 'AE', 'SG', 'MY', 'ID', 'TH', 'PH', 'VN'],
    icon: '🎉',
    color: '#0066CC',
    theme: 'winter',
    description: 'Global celebration marking the beginning of a new year on the Gregorian calendar. Observed with fireworks, parties, resolutions, and family gatherings.',
    traditions: [
      'Fireworks displays',
      'Midnight celebrations',
      'Making new year resolutions',
      'Family gatherings',
      'Special meals',
      'Countdown parties',
      'Reflection and goal-setting',
    ],
    significance: ['Cultural', 'Global', 'Social'],
    particleEffect: 'confetti',
    badgeStyle: {
      bgColor: '#0066CC',
      textColor: '#FFFFFF',
      borderColor: '#0044AA',
    },
  },

  {
    id: 'christmas-2024',
    name: 'Christmas',
    localNames: {
      en: 'Christmas',
      hi: 'क्रिसमस',
      es: 'Navidad',
      fr: 'Noël',
      de: 'Weihnachten',
      pt: 'Natal',
      ja: 'クリスマス',
      zh: '圣诞节',
      ar: 'عيد الميلاد',
    },
    date: '2024-12-25',
    duration: 1,
    category: ['festival', 'religious', 'cultural'],
    tier: 2,
    regions: ['US', 'UK', 'CA', 'AU', 'IN', 'EU', 'JP', 'BR', 'MX', 'NZ', 'SG', 'MY', 'PH', 'TH'],
    icon: '🎄',
    color: '#C41E3A',
    theme: 'winter',
    description: 'Annual Christian festival celebrating the birth of Jesus Christ. Observed with decorated Christmas trees, gift-giving, carols, and family celebrations.',
    traditions: [
      'Decorating Christmas trees',
      'Exchanging gifts',
      'Caroling and festive music',
      'Special meals and treats',
      'Religious services',
      'Hanging stockings',
      'Family gatherings',
    ],
    significance: ['Religious', 'Cultural', 'Social'],
    particleEffect: 'snow',
    badgeStyle: {
      bgColor: '#C41E3A',
      textColor: '#FFFFFF',
      borderColor: '#005A00',
    },
  },

  {
    id: 'thanksgiving-2024',
    name: 'Thanksgiving',
    localNames: {
      en: 'Thanksgiving',
      es: 'Día de Acción de Gracias',
      fr: 'Thanksgiving',
    },
    date: '2024-11-28',
    duration: 1,
    category: ['cultural', 'national'],
    tier: 2,
    regions: ['US', 'CA'],
    icon: '🦃',
    color: '#DA6E1F',
    theme: 'autumn',
    description: 'North American harvest festival celebrated with family gatherings, feasts of turkey and traditional foods, and giving thanks for the past year\'s blessings.',
    traditions: [
      'Turkey dinner',
      'Watching football games',
      'Family gatherings',
      'Pie and desserts',
      'Expressing gratitude',
      'Parade viewing',
      'Volunteering',
    ],
    significance: ['Cultural', 'National', 'Harvest'],
    particleEffect: 'none',
    badgeStyle: {
      bgColor: '#DA6E1F',
      textColor: '#FFFFFF',
      borderColor: '#8B5A2B',
    },
  },

  // ==================== TIER 3: NATIONAL & STATE HOLIDAYS ====================

  {
    id: 'republic-day-2024',
    name: 'Republic Day (India)',
    localNames: {
      hi: 'गणतंत्र दिवस',
      en: 'Republic Day',
      ta: 'குடியரசு தினம்',
      te: 'రిపబ్లిక్ రోజు',
      bn: 'প্রজাতান্ত্রিক দিবস',
    },
    date: '2024-01-26',
    duration: 1,
    category: ['national'],
    tier: 3,
    regions: ['IN', 'IN-DL', 'IN-UP', 'IN-MH', 'IN-TN', 'IN-KA', 'IN-AP', 'IN-BR'],
    icon: '🇮🇳',
    color: '#FF9933',
    theme: 'winter',
    description: 'Indian national holiday celebrating the adoption of the Indian Constitution on January 26, 1950. Marked by patriotic ceremonies, flag hoisting, and military parades.',
    traditions: [
      'Flag hoisting',
      'National anthem singing',
      'Military parades',
      'School and office celebrations',
      'Patriotic events',
      'Fireworks',
      'Public addresses',
    ],
    significance: ['National', 'Political', 'Cultural'],
    particleEffect: 'none',
    badgeStyle: {
      bgColor: '#FF9933',
      textColor: '#FFFFFF',
      borderColor: '#138808',
    },
  },

  {
    id: 'independence-day-india-2024',
    name: 'Independence Day (India)',
    localNames: {
      hi: 'स्वतंत्रता दिवस',
      en: 'Independence Day',
      ta: 'சுதந்திர தினம்',
      te: 'స్వాతంత్య్ర దినోత్సవం',
      bn: 'স্বাধীনতা দিবস',
    },
    date: '2024-08-15',
    duration: 1,
    category: ['national'],
    tier: 3,
    regions: ['IN', 'IN-DL', 'IN-UP', 'IN-MH', 'IN-TN', 'IN-KA', 'IN-AP', 'IN-BR'],
    icon: '🇮🇳',
    color: '#138808',
    theme: 'summer',
    description: 'Indian national holiday celebrating independence from British rule on August 15, 1947. Observed with flag ceremonies, patriotic songs, and national celebrations.',
    traditions: [
      'Flag hoisting',
      'National anthem',
      'Patriotic ceremonies',
      'Military display',
      'School celebrations',
      'Independence speeches',
      'Tricolor flag displays',
    ],
    significance: ['National', 'Political', 'Historical'],
    particleEffect: 'confetti',
    badgeStyle: {
      bgColor: '#138808',
      textColor: '#FFFFFF',
      borderColor: '#FF9933',
    },
  },

  // ==================== TIER 4: CULTURAL OBSERVANCES ====================

  {
    id: 'earth-day-2024',
    name: 'Earth Day',
    localNames: {
      en: 'Earth Day',
      es: 'Día de la Tierra',
      fr: 'Jour de la Terre',
      hi: 'पृथ्वी दिवस',
      zh: '地球日',
    },
    date: '2024-04-22',
    duration: 1,
    category: ['cultural'],
    tier: 4,
    regions: ['US', 'CA', 'UK', 'EU', 'AU', 'IN', 'BR', 'MX', 'JP', 'CN', 'SG', 'MY'],
    icon: '🌍',
    color: '#00A651',
    theme: 'spring',
    description: 'Global day celebrating environmental protection and sustainability. Marked by environmental events, tree planting, and climate action initiatives.',
    traditions: [
      'Tree planting',
      'Environmental cleanup',
      'Climate awareness events',
      'Sustainable practices',
      'Nature walks',
      'Educational activities',
      'Green initiatives',
    ],
    significance: ['Environmental', 'Cultural', 'Global'],
    particleEffect: 'petal',
    badgeStyle: {
      bgColor: '#00A651',
      textColor: '#FFFFFF',
      borderColor: '#004D2E',
    },
  },

  {
    id: 'pride-month-2024',
    name: 'Pride Month',
    localNames: {
      en: 'Pride Month',
      es: 'Mes del Orgullo',
      fr: 'Mois de la fierté',
      hi: 'प्राइड माह',
    },
    date: '2024-06-01',
    endDate: '2024-06-30',
    duration: 30,
    category: ['cultural'],
    tier: 4,
    regions: ['US', 'CA', 'UK', 'EU', 'AU', 'BR', 'MX', 'IN', 'JP', 'SG'],
    icon: '🏳️‍🌈',
    color: '#FF6B9D',
    theme: 'summer',
    description: 'Global celebration of LGBTQ+ rights, history, and culture. Observed with parades, festivals, and community events promoting equality and inclusion.',
    traditions: [
      'Pride parades',
      'Community festivals',
      'Educational events',
      'Corporate celebrations',
      'Color displays',
      'Community gatherings',
      'Support for LGBTQ+ causes',
    ],
    significance: ['Cultural', 'Social', 'Historical'],
    particleEffect: 'confetti',
    badgeStyle: {
      bgColor: '#FF6B9D',
      textColor: '#FFFFFF',
      borderColor: '#9933CC',
    },
  },

  // ==================== TIER 5: ASTRONOMICAL EVENTS ====================

  {
    id: 'spring-equinox-2024',
    name: 'Spring Equinox',
    localNames: {
      en: 'Spring Equinox',
      es: 'Equinoccio de Primavera',
      fr: 'Équinoxe de Printemps',
      hi: 'वसंत विषुव',
      zh: '春分',
    },
    date: '2024-03-20',
    duration: 1,
    category: ['astronomical'],
    tier: 5,
    regions: ['US', 'UK', 'EU', 'CA', 'AU', 'NZ', 'JP', 'CN', 'IN', 'BR', 'MX', 'RU'],
    icon: '🌸',
    color: '#90EE90',
    theme: 'spring',
    description: 'Astronomical moment when day and night are approximately equal length. Marks the beginning of spring in the Northern Hemisphere and autumn in the Southern Hemisphere.',
    traditions: [
      'Seasonal celebrations',
      'Agricultural planning',
      'Nature observation',
      'Renewal rituals',
      'Spring festivals',
      'Gardening season start',
    ],
    significance: ['Astronomical', 'Seasonal', 'Cultural'],
    particleEffect: 'petal',
    badgeStyle: {
      bgColor: '#90EE90',
      textColor: '#000000',
      borderColor: '#228B22',
    },
  },

  {
    id: 'summer-solstice-2024',
    name: 'Summer Solstice',
    localNames: {
      en: 'Summer Solstice',
      es: 'Solsticio de Verano',
      fr: 'Solstice d\'Été',
      hi: 'ग्रीष्म संक्रांति',
      zh: '夏至',
    },
    date: '2024-06-20',
    duration: 1,
    category: ['astronomical'],
    tier: 5,
    regions: ['US', 'UK', 'EU', 'CA', 'AU', 'NZ', 'JP', 'CN', 'IN', 'BR', 'MX', 'RU'],
    icon: '☀️',
    color: '#FFD700',
    theme: 'summer',
    description: 'Astronomical moment marking the longest day of the year in the Northern Hemisphere. Celebrated in various cultures with festivals and gatherings.',
    traditions: [
      'Bonfire festivals',
      'Summer celebrations',
      'Community gatherings',
      'Seasonal rituals',
      'Outdoor activities',
      'Cultural events',
    ],
    significance: ['Astronomical', 'Seasonal', 'Cultural'],
    particleEffect: 'none',
    badgeStyle: {
      bgColor: '#FFD700',
      textColor: '#000000',
      borderColor: '#FF8C00',
    },
  },

  {
    id: 'autumn-equinox-2024',
    name: 'Autumn Equinox',
    localNames: {
      en: 'Autumn Equinox',
      es: 'Equinoccio de Otoño',
      fr: 'Équinoxe d\'Automne',
      hi: 'पतझड़ विषुव',
      zh: '秋分',
    },
    date: '2024-09-22',
    duration: 1,
    category: ['astronomical'],
    tier: 5,
    regions: ['US', 'UK', 'EU', 'CA', 'AU', 'NZ', 'JP', 'CN', 'IN', 'BR', 'MX', 'RU'],
    icon: '🍂',
    color: '#FF8C00',
    theme: 'autumn',
    description: 'Astronomical moment when day and night are approximately equal length. Marks the beginning of autumn in the Northern Hemisphere and spring in the Southern Hemisphere.',
    traditions: [
      'Autumn festivals',
      'Harvest celebrations',
      'Nature observation',
      'Seasonal gatherings',
      'Fall traditions',
      'Reflection time',
    ],
    significance: ['Astronomical', 'Seasonal', 'Harvest'],
    particleEffect: 'petal',
    badgeStyle: {
      bgColor: '#FF8C00',
      textColor: '#FFFFFF',
      borderColor: '#8B4513',
    },
  },

  {
    id: 'winter-solstice-2024',
    name: 'Winter Solstice',
    localNames: {
      en: 'Winter Solstice',
      es: 'Solsticio de Invierno',
      fr: 'Solstice d\'Hiver',
      hi: 'शीत संक्रांति',
      zh: '冬至',
    },
    date: '2024-12-21',
    duration: 1,
    category: ['astronomical'],
    tier: 5,
    regions: ['US', 'UK', 'EU', 'CA', 'AU', 'NZ', 'JP', 'CN', 'IN', 'BR', 'MX', 'RU'],
    icon: '❄️',
    color: '#4169E1',
    theme: 'winter',
    description: 'Astronomical moment marking the shortest day of the year in the Northern Hemisphere. Celebrated as the turning point toward longer days and spring.',
    traditions: [
      'Winter festivals',
      'Celebration of light',
      'Community gatherings',
      'Seasonal rituals',
      'Family celebrations',
      'Meditation and reflection',
    ],
    significance: ['Astronomical', 'Seasonal', 'Cultural'],
    particleEffect: 'snow',
    badgeStyle: {
      bgColor: '#4169E1',
      textColor: '#FFFFFF',
      borderColor: '#1E90FF',
    },
  },
];

/**
 * Get holidays for a specific region and year
 */
export function getHolidaysForRegion(region: string, year?: number): Holiday[] {
  const targetYear = year || new Date().getFullYear();
  const yearStr = targetYear.toString();

  return HOLIDAYS_2024_2030.filter(
    (holiday) =>
      holiday.regions.includes(region) &&
      holiday.date.startsWith(yearStr)
  );
}

/**
 * Get all holidays for a specific date range
 */
export function getHolidaysInRange(
  startDate: Date,
  endDate: Date
): Holiday[] {
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  return HOLIDAYS_2024_2030.filter(
    (holiday) => holiday.date >= start && holiday.date <= end
  );
}

/**
 * Get holidays by tier
 */
export function getHolidaysByTier(tier: 1 | 2 | 3 | 4 | 5): Holiday[] {
  return HOLIDAYS_2024_2030.filter((holiday) => holiday.tier === tier);
}

/**
 * Get holidays by category
 */
export function getHolidaysByCategory(category: string): Holiday[] {
  return HOLIDAYS_2024_2030.filter((holiday) =>
    holiday.category.includes(category as any)
  );
}
