'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// ─── Month / Year Overlay ─────────────────────────────────────────────────────
// Absolutely positioned text block over the bottom-right corner of the hero,
// displaying year (small/light) and month name (large/bold).
// Matches the reference image's editorial typographic treatment.

interface MonthYearOverlayProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function MonthYearOverlay({ date, onPrevMonth, onNextMonth }: MonthYearOverlayProps) {
  const year = format(date, 'yyyy');
  const month = format(date, 'MMMM').toUpperCase();

  return (
    <div className="absolute bottom-0 right-0 z-20 flex items-end gap-1 sm:gap-4 select-none">
      {/* Dark scrim behind text */}
      <div
        className="absolute inset-0 rounded-tl-2xl"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Navigation arrow — previous */}
      <motion.button
        whileHover={{ scale: 1.15, x: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrevMonth}
        className="relative z-10 text-white/70 hover:text-white transition-colors pb-5 sm:pb-6 pl-2 sm:pl-4"
        aria-label="Previous month"
      >
        <svg width="20" height="20" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </motion.button>

      {/* Year + Month text */}
      <motion.div
        key={date.toISOString()}
        className="relative z-10 text-right pb-4 sm:pb-5 pr-1 sm:pr-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-white/80 font-light leading-none"
          style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}
        >
          {year}
        </p>
        <h2
          className="text-white font-black leading-none"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', letterSpacing: '0.04em' }}
        >
          {month}
        </h2>
      </motion.div>

      {/* Navigation arrow — next */}
      <motion.button
        whileHover={{ scale: 1.15, x: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNextMonth}
        className="relative z-10 text-white/70 hover:text-white transition-colors pb-5 sm:pb-6 pr-2 sm:pr-4"
        aria-label="Next month"
      >
        <svg width="20" height="20" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>
    </div>
  );
}
