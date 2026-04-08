'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMoonPhase } from '@/hooks/useMoonPhase';
import { useCalendarStore } from '@/store/calendarStore';

/**
 * Moon phase visualization and information widget
 */
export default function MoonPhaseWidget() {
  const { currentDate } = useCalendarStore();
  const {
    getMoonPhaseForDate,
    getNextFullMoon,
    getNextNewMoon,
    getMoonAge,
    isSupermoon,
  } = useMoonPhase();

  const today = useMemo(() => new Date(), []);
  const moonPhase = useMemo(() => getMoonPhaseForDate(today), [today]);
  const nextFullMoon = useMemo(() => getNextFullMoon(), []);
  const nextNewMoon = useMemo(() => getNextNewMoon(), []);
  const moonAge = useMemo(() => getMoonAge(today), [today]);
  const isSuper = useMemo(() => isSupermoon(today), [today]);

  const daysUntilFull = Math.ceil(
    (nextFullMoon.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysUntilNew = Math.ceil(
    (nextNewMoon.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 text-white shadow-lg"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">🌙</span>
        Moon Phase
      </h3>

      {/* Current Moon Phase */}
      <div className="mb-6 text-center">
        <motion.div
          className="text-6xl mb-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {moonPhase.emoji}
        </motion.div>
        <p className="font-semibold text-lg">{moonPhase.name}</p>
        <p className="text-sm opacity-75 mt-1">
          {moonPhase.illumination}% illuminated
        </p>
        {isSuper && (
          <p className="text-sm text-yellow-300 mt-2 font-medium">✨ Supermoon!</p>
        )}
      </div>

      {/* Moon Age */}
      <div className="mb-4 p-2 bg-white/10 rounded text-sm">
        <p className="opacity-75">Moon Age</p>
        <p className="font-semibold text-base">
          {moonAge.toFixed(1)} / 29.5 days
        </p>
        <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
            style={{ width: `${(moonAge / 29.5) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(moonAge / 29.5) * 100}%` }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>

      {/* Next Events */}
      <div className="space-y-3 text-sm">
        <div className="p-2 bg-white/10 rounded">
          <p className="opacity-75">Next Full Moon</p>
          <p className="font-semibold">{daysUntilFull} days</p>
          <p className="text-xs opacity-50">
            {nextFullMoon.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="p-2 bg-white/10 rounded">
          <p className="opacity-75">Next New Moon</p>
          <p className="font-semibold">{daysUntilNew} days</p>
          <p className="text-xs opacity-50">
            {nextNewMoon.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Lunar Cycle Info */}
      <div className="mt-4 pt-3 border-t border-white/20 text-xs opacity-75">
        <p>Lunar Cycle: 29.53 days</p>
        <p className="mt-1">Current Phase: {moonPhase.phase + 1}/8</p>
      </div>
    </motion.div>
  );
}
