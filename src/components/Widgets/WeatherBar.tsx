'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateWeatherForecast } from '@/utils/weatherSimulator';
import { format } from 'date-fns';

// ─── Simulated 14-Day Weather Bar ─────────────────────────────────────────────
// Horizontal scrolling strip of deterministic weather cards.
// Clicking a card selects that date on the calendar grid.

interface WeatherBarProps {
  baseDate?: Date;
  onDateSelect: (date: Date) => void;
}

export default function WeatherBar({ baseDate, onDateSelect }: WeatherBarProps) {
  const forecast = useMemo(() => generateWeatherForecast(baseDate ?? new Date()), [baseDate]);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2 touch-pan-x">
      <div className="flex gap-2 min-w-max px-1">
        {forecast.map((day, i) => (
          <motion.button
            key={day.date.toISOString()}
            onClick={() => onDateSelect(day.date)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-white/80 hover:bg-white shadow-sm border border-gray-100 transition-colors"
            style={{ width: 'clamp(56px, 15vw, 68px)', minWidth: '56px' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Day + Date */}
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              {format(day.date, 'EEE')}
            </span>
            <span className="text-xs font-bold text-gray-600">{day.dayNumber}</span>
            {/* Weather icon */}
            <span className="text-xl leading-none">{day.icon}</span>
            {/* Temperature */}
            <span className="text-xs font-semibold text-gray-700">{day.tempC}°</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
