'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Command Palette (Cmd+K) ──────────────────────────────────────────────────
// Spotlight-style overlay triggered by Ctrl+K / Cmd+K.
// Supports fuzzy-filtered commands, note search, and "Go to Date" (dd/mm/yyyy).

export interface PaletteCommand {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  commands: PaletteCommand[];
  onClose: () => void;
  onGoToDate?: (dateStr: string) => boolean;
}

// Check if query looks like a date (dd/mm/yyyy or dd-mm-yyyy or dd.mm.yyyy)
function looksLikeDate(query: string): boolean {
  return /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(query.trim());
}

export default function CommandPalette({ commands, onClose, onGoToDate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [dateError, setDateError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const isDateQuery = looksLikeDate(query);

  const filtered = query.trim()
    ? commands.filter((c) => {
        const q = query.toLowerCase();
        return c.label.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q)) ||
          (c.description?.toLowerCase().includes(q) ?? false);
      })
    : commands;

  const run = useCallback((cmd: PaletteCommand) => {
    cmd.action();
    onClose();
  }, [onClose]);

  const handleGoToDate = useCallback(() => {
    if (onGoToDate && onGoToDate(query)) {
      setDateError('');
      onClose();
    } else {
      setDateError('Invalid date. Use format: dd/mm/yyyy');
    }
  }, [query, onGoToDate, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }

    if (isDateQuery) {
      // When it looks like a date, Enter = go to that date
      if (e.key === 'Enter') { e.preventDefault(); handleGoToDate(); }
      return;
    }

    if (e.key === 'ArrowDown') { setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); e.preventDefault(); }
    if (e.key === 'ArrowUp')   { setActiveIdx((i) => Math.max(i - 1, 0)); e.preventDefault(); }
    if (e.key === 'Enter' && filtered[activeIdx]) { run(filtered[activeIdx]); }
  }, [filtered, activeIdx, onClose, run, isDateQuery, handleGoToDate]);

  // Reset active index when query changes
  useEffect(() => { setActiveIdx(0); setDateError(''); }, [query]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        {/* Palette box */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className="w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or date (dd/mm/yyyy) to jump…"
              className="flex-1 text-base bg-transparent outline-none placeholder-gray-400 text-gray-800"
              aria-label="Command palette search"
            />
            <kbd className="hidden sm:inline text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">ESC</kbd>
          </div>

          {/* Date jump UI (when query looks like a date) */}
          {isDateQuery ? (
            <div className="px-4 py-4">
              <button
                onClick={handleGoToDate}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
              >
                <span className="text-xl w-7 text-center">🗓️</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">Jump to {query.trim()}</p>
                  <p className="text-xs text-blue-500">Press Enter to navigate to this date</p>
                </div>
              </button>
              {dateError && (
                <p className="mt-2 text-xs text-red-500 text-center">{dateError}</p>
              )}
            </div>
          ) : (
            /* Results */
            <div className="max-h-80 overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">
                  No results found
                  <p className="mt-1 text-xs text-gray-300">Tip: Type a date like 25/12/2026 to jump</p>
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <motion.button
                    key={cmd.id}
                    role="option"
                    aria-selected={i === activeIdx}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                      ${i === activeIdx ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => run(cmd)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xl w-7 text-center">{cmd.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{cmd.label}</p>
                      {cmd.description && <p className="text-xs text-gray-400">{cmd.description}</p>}
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
