/**
 * Gamification system: streaks, achievements, stats
 */

import { CalendarEvent, StickyNote, Achievement, CalendarStats } from '@/types';

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_event: {
    id: 'first_event',
    title: 'Getting Started',
    description: 'Create your first calendar event',
    icon: '📅',
    progress: 0,
    target: 1,
  },
  week_warrior: {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Add 7 events in a single week',
    icon: '⚔️',
    progress: 0,
    target: 7,
  },
  month_master: {
    id: 'month_master',
    title: 'Month Master',
    description: 'Add 30 events in a single month',
    icon: '👑',
    progress: 0,
    target: 30,
  },
  festival_explorer: {
    id: 'festival_explorer',
    title: 'Festival Explorer',
    description: 'Discover 10 different festivals',
    icon: '🎉',
    progress: 0,
    target: 10,
  },
  note_taker: {
    id: 'note_taker',
    title: 'Note Taker',
    description: 'Create 25 sticky notes',
    icon: '📝',
    progress: 0,
    target: 25,
  },
  perfect_attendance: {
    id: 'perfect_attendance',
    title: 'Perfect Attendance',
    description: 'Use the calendar 30 days in a row',
    icon: '🎯',
    progress: 0,
    target: 30,
  },
  global_citizen: {
    id: 'global_citizen',
    title: 'Global Citizen',
    description: 'Explore calendars from 5 different countries',
    icon: '🌍',
    progress: 0,
    target: 5,
  },
  lunar_enthusiast: {
    id: 'lunar_enthusiast',
    title: 'Lunar Enthusiast',
    description: 'Track 10 moon phases',
    icon: '🌙',
    progress: 0,
    target: 10,
  },
};

/**
 * Calculate current streak (days with events)
 */
export function calculateStreak(events: CalendarEvent[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (events.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Group events by date
  const eventsByDate = new Map<string, number>();
  events.forEach((event) => {
    const dateStr = event.startDate;
    eventsByDate.set(dateStr, (eventsByDate.get(dateStr) || 0) + 1);
  });

  // Sort dates
  const sortedDates = Array.from(eventsByDate.keys()).sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i - 1]);
      const dayDiff = Math.floor(
        (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  // Check if current streak is active (last event was today or yesterday)
  const lastEventDate = new Date(sortedDates[sortedDates.length - 1]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lastEventDate.setHours(0, 0, 0, 0);

  const daysSinceLastEvent = Math.floor(
    (today.getTime() - lastEventDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  currentStreak = daysSinceLastEvent <= 1 ? tempStreak : 0;

  return {
    currentStreak,
    longestStreak,
  };
}

/**
 * Update achievement progress
 */
export function updateAchievements(
  events: CalendarEvent[],
  notes: StickyNote[]
): Achievement[] {
  const achievements = Object.values(ACHIEVEMENTS);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // First event
  achievements.find((a) => a.id === 'first_event')!.progress = events.length > 0 ? 1 : 0;

  // Week warrior (events this week)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEvents = events.filter((e) => new Date(e.startDate) >= weekStart);
  achievements.find((a) => a.id === 'week_warrior')!.progress = weekEvents.length;

  // Month master (events this month)
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEvents = events.filter((e) => new Date(e.startDate) >= monthStart);
  achievements.find((a) => a.id === 'month_master')!.progress = monthEvents.length;

  // Festival explorer (unique festivals)
  const uniqueFestivals = new Set(events.map((e) => e.category));
  achievements.find((a) => a.id === 'festival_explorer')!.progress = uniqueFestivals.size;

  // Note taker
  achievements.find((a) => a.id === 'note_taker')!.progress = Math.min(notes.length, 25);

  // Perfect attendance (days with activity)
  const activeDays = new Set<string>();
  events.forEach((e) => activeDays.add(e.startDate));
  notes.forEach((n) => activeDays.add(n.date));
  achievements.find((a) => a.id === 'perfect_attendance')!.progress = activeDays.size;

  // Global citizen - would need region tracking (placeholder)
  achievements.find((a) => a.id === 'global_citizen')!.progress = 1;

  // Lunar enthusiast - would need moon phase tracking (placeholder)
  achievements.find((a) => a.id === 'lunar_enthusiast')!.progress = Math.min(events.length, 10);

  // Mark unlocked
  return achievements.map((achievement) => ({
    ...achievement,
    unlockedAt:
      achievement.progress >= achievement.target ? new Date().toISOString() : undefined,
  }));
}

/**
 * Calculate calendar statistics
 */
export function calculateStats(
  events: CalendarEvent[],
  notes: StickyNote[],
  achievements: Achievement[]
): CalendarStats {
  const { currentStreak, longestStreak } = calculateStreak(events);

  // Events per month
  const eventsPerMonth: Record<string, number> = {};
  events.forEach((event) => {
    const month = event.startDate.substring(0, 7); // YYYY-MM
    eventsPerMonth[month] = (eventsPerMonth[month] || 0) + 1;
  });

  // Unlocked achievements
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt);

  return {
    totalEvents: events.length,
    totalNotes: notes.length,
    currentStreak,
    longestStreak,
    achievements: unlockedAchievements,
    eventsPerMonth,
  };
}

/**
 * Get next achievement milestone
 */
export function getNextMilestone(achievements: Achievement[]): Achievement | null {
  const unachieved = achievements.filter(
    (a) => !a.unlockedAt && a.progress < a.target
  );

  if (unachieved.length === 0) return null;

  // Return closest to completion
  return unachieved.reduce((closest, current) => {
    const closestProgress = closest.progress / closest.target;
    const currentProgress = current.progress / current.target;
    return currentProgress > closestProgress ? current : closest;
  });
}

/**
 * Generate motivational message based on stats
 */
export function getMotivationalMessage(stats: CalendarStats): string {
  const messages: string[] = [];

  if (stats.currentStreak === 0) {
    messages.push('Start your streak today! Add an event to begin.');
  } else if (stats.currentStreak < 7) {
    messages.push(`Keep it up! You're on a ${stats.currentStreak}-day streak 🔥`);
  } else if (stats.currentStreak < 30) {
    messages.push(`Awesome! ${stats.currentStreak}-day streak! You're unstoppable 💪`);
  } else {
    messages.push(`Incredible! ${stats.currentStreak}-day streak! You're a legend 👑`);
  }

  if (stats.totalEvents < 5) {
    messages.push('Add more events to unlock achievements!');
  } else if (stats.achievements.length === Object.keys(ACHIEVEMENTS).length) {
    messages.push('You are a Sentient Calendar master! 🎓');
  } else {
    const nextMilestone = Object.values(ACHIEVEMENTS).find(
      (a) =>
        !stats.achievements.find((achieved) => achieved.id === a.id) &&
        a.progress >= a.target - 1
    );
    if (nextMilestone) {
      messages.push(`Almost there! Unlock "${nextMilestone.title}" ${nextMilestone.icon}`);
    }
  }

  return messages.join(' ');
}

/**
 * Export stats as summary
 */
export function getStatsSummary(stats: CalendarStats): string {
  return `
📊 Calendar Statistics

Events: ${stats.totalEvents}
Notes: ${stats.totalNotes}
Current Streak: ${stats.currentStreak} days
Longest Streak: ${stats.longestStreak} days
Achievements: ${stats.achievements.length}/${Object.keys(ACHIEVEMENTS).length}

Busiest Month: ${
    Object.entries(stats.eventsPerMonth).length > 0
      ? Object.entries(stats.eventsPerMonth).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A'
  }
  `.trim();
}
