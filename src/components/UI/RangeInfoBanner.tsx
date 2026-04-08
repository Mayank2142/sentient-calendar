'use client';
import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateRange, computeRangeSummary } from '@/utils/dateRange';
import { DateRange } from '@/types';

// ─── Range Info Banner ────────────────────────────────────────────────────────
// Slides up below the calendar grid when a range is selected.
// Shows total days, weekdays, weekends, and any overlapping holidays.

import RangeNotesArea from '@/components/Notes/RangeNotesArea';

interface RangeInfoBannerProps {
  range: DateRange | null;
  onClear: () => void;
}

function RangeInfoBannerInner({ range, onClear }: RangeInfoBannerProps) {
  const [showMemo, setShowMemo] = React.useState(false);

  // Reset memo visibility when range changes
  React.useEffect(() => {
    setShowMemo(false);
  }, [range?.id]);

  if (!range) return null;

  const summary = computeRangeSummary(range.start, range.end);
  const label = formatDateRange(range.start, range.end);

  return (
    <AnimatePresence>
      {range && (
        <motion.div
          key="range-banner"
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="mt-3 rounded-xl border overflow-hidden"
          style={{
            borderColor: 'var(--accent-color, #1a56db)',
            background: 'var(--accent-tint, rgba(26,86,219,0.06))',
          }}
        >
          <div className="px-4 py-3">
            {/* Range label */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-color, #1a56db)' }}>
                📅 {label}
              </span>
              <button
                onClick={onClear}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                aria-label="Clear range"
              >
                ✕
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-600">
              <span className="bg-white rounded-full px-2.5 py-1 shadow-sm font-medium">
                📆 {summary.totalDays} day{summary.totalDays !== 1 ? 's' : ''}
              </span>
              <span className="bg-white rounded-full px-2.5 py-1 shadow-sm font-medium">
                💼 {summary.weekdays} weekday{summary.weekdays !== 1 ? 's' : ''}
              </span>
              <span className="bg-white rounded-full px-2.5 py-1 shadow-sm font-medium">
                🎉 {summary.weekends} weekend{summary.weekends !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Holiday warnings */}
            {summary.holidays.length > 0 && (
              <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">
                ⚠️ Range includes: {summary.holidays.map((h) => `${h.icon} ${h.name}`).join(', ')}
              </div>
            )}

            {/* Toggle memo button */}
            <button
              onClick={() => setShowMemo(!showMemo)}
              className="mt-2 text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--accent-color, #1a56db)' }}
            >
              {showMemo ? '▴ Hide Memo' : '+ Add Memo for Period'}
            </button>

            {/* Range Memo Area */}
            <AnimatePresence>
              {showMemo && (
                <RangeNotesArea
                  rangeId={range.id}
                  onClose={() => setShowMemo(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(RangeInfoBannerInner);
