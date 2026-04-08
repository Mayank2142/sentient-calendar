'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotesStore } from '@/store/notesStore';
import { useCalendarStore } from '@/store/calendarStore';
import { getUpcomingHolidays } from '@/utils/holidays/holidayCalculator';
import { allHolidays } from '@/utils/holidays/holidayCalculator';

const RULED_LINES = 5;

export default function InlineNotesArea() {
  const { notes, addNote, updateNote } = useNotesStore();
  const { currentDate: selectedDate } = useCalendarStore();
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const dateStr = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync text when date changes or store hydrates
  useEffect(() => {
    if (mounted) {
      const savedNote = localStorage.getItem(`calendar-note-${dateStr}`);
      setText(savedNote ?? '');
      setIsTyping(false);
      setShowSavedMessage(false);
    }
  }, [dateStr, mounted]);

  const handleFocus = () => setIsTyping(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setShowSavedMessage(false);
  };

  const handleSave = () => {
    if (!text.trim()) {
      localStorage.removeItem(`calendar-note-${dateStr}`);
    } else {
      localStorage.setItem(`calendar-note-${dateStr}`, text.trim());
    }
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 2000);
  };

  const handleBlur = useCallback(() => {
    setIsTyping(false);
  }, []);

  // Next upcoming holiday from selected date
  const nextHoliday = allHolidays
    .filter((h) => new Date(h.date) >= new Date(dateStr))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const daysUntil = nextHoliday
    ? Math.ceil((new Date(nextHoliday.date).getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Label */}
      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Notes</p>

      {/* Ruled lines container */}
      <div className="relative" style={{ minHeight: `${RULED_LINES * 32}px` }}>
        {Array.from({ length: RULED_LINES }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-b border-gray-200"
            style={{ top: `${(i + 1) * 32 - 2}px` }}
          />
        ))}

        <textarea
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Add a note…"
          rows={RULED_LINES}
          className="absolute inset-0 w-full h-full resize-none bg-transparent border-none outline-none text-sm leading-8 text-gray-700 placeholder-gray-300 z-10"
          style={{
            fontFamily: isTyping ? "'Caveat', cursive" : 'inherit',
            lineHeight: '32px',
            paddingTop: '2px',
          }}
          aria-label={`Notes for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
        />
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-medium rounded shadow-sm transition-colors cursor-pointer"
        >
          Save Note
        </button>
        <AnimatePresence>
          {showSavedMessage && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-green-600 flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Saved!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Next upcoming holiday from selected date ── */}
      {nextHoliday && (
        <motion.div
          key={nextHoliday.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-2"
        >
          <p className="text-[10px] uppercase tracking-wider text-orange-400 font-semibold mb-0.5">
            Next Holiday
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-base">{nextHoliday.icon}</span>
            <div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{nextHoliday.name}</p>
              <p className="text-[10px] text-gray-400">
                {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `in ${daysUntil} days`}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
