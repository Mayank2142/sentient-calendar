'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/calendarStore';
import { useNotesStore } from '@/store/notesStore';
import { calculateStreak, calculateStats, getMotivationalMessage, ACHIEVEMENTS } from '@/utils/gamification';

/**
 * Stats and achievements widget
 */
export default function StatsWidget() {
  const { events } = useCalendarStore();
  const { notes } = useNotesStore();

  const achievements = useMemo(() => {
    return Object.values(ACHIEVEMENTS);
  }, []);

  const stats = useMemo(() => {
    return calculateStats(events, notes, achievements);
  }, [events, notes, achievements]);

  const { currentStreak, longestStreak } = useMemo(() => {
    return calculateStreak(events);
  }, [events]);

  const motivationalMessage = useMemo(() => {
    return getMotivationalMessage(stats);
  }, [stats]);

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;
  const progressPercent = (unlockedCount / achievements.length) * 100;

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        Your Stats
      </h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-3xl font-bold">{events.length}</p>
          <p className="text-xs opacity-75 mt-1">Total Events</p>
        </motion.div>

        <motion.div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-3xl font-bold">{notes.length}</p>
          <p className="text-xs opacity-75 mt-1">Notes Created</p>
        </motion.div>

        <motion.div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-3xl font-bold text-yellow-300">{currentStreak}</p>
          <p className="text-xs opacity-75 mt-1">Day Streak</p>
        </motion.div>

        <motion.div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-3xl font-bold text-blue-300">{longestStreak}</p>
          <p className="text-xs opacity-75 mt-1">Longest Streak</p>
        </motion.div>
      </div>

      {/* Motivational Message */}
      <motion.div
        className="bg-white/10 rounded-lg p-3 mb-6 text-sm italic text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        "{motivationalMessage}"
      </motion.div>

      {/* Achievements Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Achievements</p>
          <p className="text-xs opacity-75">
            {unlockedCount} / {achievements.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Achievement Badges (Unlocked) */}
      {unlockedCount > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold opacity-75 mb-2">UNLOCKED</p>
          <div className="grid grid-cols-4 gap-2">
            {achievements
              .filter((a) => a.unlockedAt)
              .map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="bg-yellow-400/20 border border-yellow-400 rounded-lg p-2 text-center cursor-pointer hover:bg-yellow-400/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  title={achievement.title}
                >
                  <p className="text-2xl">{achievement.icon}</p>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Achievement Badges (Locked) */}
      {unlockedCount < achievements.length && (
        <div>
          <p className="text-xs font-semibold opacity-75 mb-2">UPCOMING</p>
          <div className="grid grid-cols-4 gap-2">
            {achievements
              .filter((a) => !a.unlockedAt)
              .slice(0, 4)
              .map((achievement) => {
                const progressPercent = Math.min(
                  (achievement.progress / achievement.target) * 100,
                  100
                );

                return (
                  <motion.div
                    key={achievement.id}
                    className="relative bg-white/10 rounded-lg p-2 text-center cursor-pointer hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    title={`${achievement.title} - ${achievement.progress}/${achievement.target}`}
                  >
                    <p className="text-2xl opacity-50">{achievement.icon}</p>
                    <div className="absolute bottom-1 left-1 right-1 bg-white/20 rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full bg-white/50"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
