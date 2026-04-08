import { Achievement, BadgeId } from '@/types';

// ─── Achievement Badge Definitions ───────────────────────────────────────────
// All badge metadata — IDs, icons, descriptions, and unlock thresholds.

export const ACHIEVEMENT_BADGES: Achievement[] = [
  {
    id: 'festival_scholar' as BadgeId,
    title: 'Festival Scholar',
    description: 'Viewed holiday tooltip for 10 different festivals.',
    icon: '🎓',
    target: 10,
    progress: 0,
  },
  {
    id: 'event_planner' as BadgeId,
    title: 'Event Planner',
    description: 'Created 5 or more events.',
    icon: '📅',
    target: 5,
    progress: 0,
  },
  {
    id: 'note_taker' as BadgeId,
    title: 'Note Taker',
    description: 'Created 10 or more sticky notes.',
    icon: '🗒️',
    target: 10,
    progress: 0,
  },
  {
    id: 'time_traveler' as BadgeId,
    title: 'Time Traveler',
    description: 'Navigated more than 12 months into the future.',
    icon: '🌍',
    target: 12,
    progress: 0,
  },
  {
    id: 'voice_pioneer' as BadgeId,
    title: 'Voice Pioneer',
    description: 'Used voice input at least once.',
    icon: '🎙️',
    target: 1,
    progress: 0,
  },
  {
    id: 'art_director' as BadgeId,
    title: 'Art Director',
    description: 'Uploaded a custom hero image.',
    icon: '🎨',
    target: 1,
    progress: 0,
  },
];

export const BINGO_CELLS = [
  { id: 'diwali', name: 'Diwali', icon: '🪔', marked: false },
  { id: 'holi', name: 'Holi', icon: '🌈', marked: false },
  { id: 'eid', name: 'Eid', icon: '🌙', marked: false },
  { id: 'christmas', name: 'Christmas', icon: '🎄', marked: false },
  { id: 'new-year', name: 'New Year', icon: '🎉', marked: false },
  { id: 'independence', name: 'Independence Day', icon: '🇮🇳', marked: false },
  { id: 'republic', name: 'Republic Day', icon: '🗺️', marked: false },
  { id: 'valentine', name: "Valentine's Day", icon: '❤️', marked: false },
  { id: 'gandhi', name: 'Gandhi Jayanti', icon: '🕊️', marked: false },
  { id: 'navratri', name: 'Navratri', icon: '💃', marked: false },
  { id: 'janmashtami', name: 'Janmashtami', icon: '🦚', marked: false },
  { id: 'ganesh', name: 'Ganesh Chaturthi', icon: '🐘', marked: false },
  { id: 'dussehra', name: 'Dussehra', icon: '🎆', marked: false },
  { id: 'guru-nanak', name: 'Guru Nanak', icon: '🙏', marked: false },
  { id: 'bhai-dooj', name: 'Bhai Dooj', icon: '👫', marked: false },
  { id: 'makar', name: 'Makar Sankranti', icon: '🪁', marked: false },
  { id: 'halloween', name: 'Halloween', icon: '🎃', marked: false },
  { id: 'earth-day', name: 'Earth Day', icon: '🌍', marked: false },
  { id: 'womens-day', name: "Women's Day", icon: '♀️', marked: false },
  { id: 'ram-navami', name: 'Ram Navami', icon: '🏹', marked: false },
  { id: 'spring-eq', name: 'Spring Equinox', icon: '🌸', marked: false },
  { id: 'summer-sol', name: 'Summer Solstice', icon: '☀️', marked: false },
  { id: 'autumn-eq', name: 'Autumn Equinox', icon: '🍂', marked: false },
  { id: 'winter-sol', name: 'Winter Solstice', icon: '❄️', marked: false },
  { id: 'nye', name: "New Year's Eve", icon: '🥂', marked: false },
];
