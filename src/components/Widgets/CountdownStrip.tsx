'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getUpcomingHolidays, getDaysUntilHoliday } from '@/utils/holidays/holidayCalculator';

// ─── Upcoming Holiday Countdown Strip ─────────────────────────────────────────
// Shows the next 3 holidays with live-updating countdown.
// Updates once per minute (parent component re-renders on clock, or static on mount).

export default function CountdownStrip() {
  const upcoming = useMemo(() => getUpcomingHolidays(3), []);

  return (
    <div className="flex flex-wrap gap-3 justify-center py-2">
      {upcoming.map((holiday, i) => {
        const days = getDaysUntilHoliday(holiday);
        return (
          <motion.div
            key={holiday.id}
            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
          >
            <span className="text-xl">{holiday.icon}</span>
            <div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">{holiday.name}</p>
              <p className="text-[10px] text-gray-400">
                {days === 0 ? '🎉 Today!' : days === 1 ? 'Tomorrow' : `in ${days} days`}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
