'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useHolidays } from '@/hooks/useHolidays';
import { useCalendarStore } from '@/store/calendarStore';

/**
 * Holiday distribution heatmap for the year
 */
export default function HolidayHeatmap() {
  const { currentDate } = useCalendarStore();
  const { getMonthHolidays } = useHolidays();

  const months = useMemo(() => {
    const year = currentDate.getFullYear();
    const monthsData = [];

    for (let month = 0; month < 12; month++) {
      const holidays = getMonthHolidays(year, month);
      monthsData.push({
        month: new Date(year, month, 1).toLocaleDateString('en-US', {
          month: 'short',
        }),
        count: holidays.length,
        holidays: holidays,
      });
    }

    return monthsData;
  }, [currentDate]);

  const maxCount = Math.max(...months.map((m) => m.count));

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    const intensity = (count / maxCount) * 100;
    if (intensity < 20) return 'bg-green-100 dark:bg-green-900';
    if (intensity < 40) return 'bg-green-300 dark:bg-green-700';
    if (intensity < 60) return 'bg-green-500 dark:bg-green-600';
    if (intensity < 80) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-700 dark:bg-green-400';
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🗓️</span>
        Holiday Distribution
      </h3>

      {/* Heatmap */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {months.map((month, idx) => (
          <motion.div
            key={idx}
            className="text-center group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`h-12 rounded-lg mb-2 flex items-center justify-center font-semibold transition-colors ${getIntensity(month.count)}`}
            >
              {month.count > 0 && <span className="text-sm">{month.count}</span>}
            </div>
            <p className="text-xs font-medium">{month.month}</p>

            {/* Tooltip on hover */}
            {month.count > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 mt-1 hidden group-hover:block whitespace-nowrap z-10"
              >
                {month.count} festival{month.count > 1 ? 's' : ''}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xs font-semibold mb-2 opacity-75">INTENSITY SCALE</p>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
          <span className="opacity-75">None</span>

          <div className="flex gap-1 ml-2">
            {[
              'bg-green-100 dark:bg-green-900',
              'bg-green-300 dark:bg-green-700',
              'bg-green-500 dark:bg-green-600',
              'bg-green-600 dark:bg-green-500',
              'bg-green-700 dark:bg-green-400',
            ].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded ${color}`}></div>
            ))}
          </div>
          <span className="opacity-75 ml-2">Peak</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700 text-sm">
        <p className="font-semibold mb-2">Year {currentDate.getFullYear()} Overview</p>
        <p className="opacity-75">
          Total festivals: <span className="font-bold">{months.reduce((a, b) => a + b.count, 0)}</span>
        </p>
        <p className="opacity-75">
          Busiest month: <span className="font-bold">{months.sort((a, b) => b.count - a.count)[0]?.month}</span>
        </p>
      </div>
    </motion.div>
  );
}
