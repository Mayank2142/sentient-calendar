'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Monthly Motivational Quote ───────────────────────────────────────────────
// Elegant quote strip between the hero and the calendar grid.
// Each month has a curated motivational quote.

const MONTHLY_QUOTES: { quote: string; author: string }[] = [
  { quote: "New beginnings are often disguised as painful endings.", author: "Lao Tzu" },                    // Jan
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },                  // Feb
  { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },                // Mar
  { quote: "The earth laughs in flowers.", author: "Ralph Waldo Emerson" },                                  // Apr
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },   // May
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }, // Jun
  { quote: "Keep your face always toward the sunshine — and shadows will fall behind you.", author: "Walt Whitman" },   // Jul
  { quote: "Everything you can imagine is real.", author: "Pablo Picasso" },                                  // Aug
  { quote: "Act as if what you do makes a difference. It does.", author: "William James" },                   // Sep
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },                         // Oct
  { quote: "What we think, we become.", author: "Buddha" },                                                    // Nov
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }, // Dec
];

interface MonthlyQuoteProps {
  month: number; // 0-11
}

export default function MonthlyQuote({ month }: MonthlyQuoteProps) {
  const { quote, author } = MONTHLY_QUOTES[month] ?? MONTHLY_QUOTES[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={month}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 py-3 border-b border-gray-100"
        style={{
          background: 'linear-gradient(135deg, rgba(26,86,219,0.03) 0%, rgba(168,85,247,0.03) 100%)',
        }}
      >
        <p
          className="text-center text-sm italic text-gray-500 leading-relaxed"
          style={{ fontFamily: "'Caveat', cursive", fontSize: '1.05rem' }}
        >
          "{quote}"
        </p>
        <p className="text-center text-[10px] tracking-widest uppercase text-gray-400 mt-0.5 font-medium">
          — {author}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
