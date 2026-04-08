'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Range Notes Area ─────────────────────────────────────────────────────────
// A sticky-note style area specifically for date ranges.
// Stored in localStorage keyed by range ID.

interface RangeNotesAreaProps {
  rangeId: string;
  onClose?: () => void;
}

export default function RangeNotesArea({ rangeId, onClose }: RangeNotesAreaProps) {
  const [note, setNote] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem(`range-note-${rangeId}`);
      setNote(saved ?? '');
    }
  }, [rangeId, mounted]);

  const handleSave = () => {
    if (note.trim()) {
      localStorage.setItem(`range-note-${rangeId}`, note.trim());
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } else {
      localStorage.removeItem(`range-note-${rangeId}`);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-inner relative"
    >
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">
          Range Memo
        </label>
        {onClose && (
          <button onClick={onClose} className="text-amber-300 hover:text-amber-500 transition-colors">
            ✕
          </button>
        )}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a memo for this period..."
        className="w-full bg-transparent border-none outline-none text-sm text-gray-700 placeholder-amber-200 resize-none min-h-[80px]"
        style={{ fontFamily: "'Caveat', cursive", lineHeight: '1.5' }}
      />

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleSave}
          className="text-xs font-semibold px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-lg transition-colors"
        >
          Save Memo
        </button>
        <AnimatePresence>
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-amber-600 font-bold"
            >
              Saved!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Taped-on texture effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-sm rotate-1" />
    </motion.div>
  );
}
