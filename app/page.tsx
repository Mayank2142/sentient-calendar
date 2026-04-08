'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import HangingHook from '@/components/Calendar/HangingHook';
import BindingStrip from '@/components/Calendar/BindingStrip';
import HeroSection from '@/components/Hero/HeroSection';
import CalendarGrid from '@/components/Calendar/CalendarGrid';
import InlineNotesArea from '@/components/Notes/InlineNotesArea';
import RangeInfoBanner from '@/components/UI/RangeInfoBanner';
import CountdownStrip from '@/components/Widgets/CountdownStrip';
import WeatherBar from '@/components/Widgets/WeatherBar';
import CommandPalette, { PaletteCommand } from '@/components/UI/CommandPalette';
import ContextMenu from '@/components/UI/ContextMenu';
import MonthlyQuote from '../src/components/UI/MonthlyQuote';
import { useCalendarStore } from '@/store/calendarStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useRangeSelection } from '@/hooks/useRangeSelection';
import { downloadSingleDayICS } from '@/utils/icsExporter';
import { ContextMenuPosition, ContextMenuItem } from '@/types';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{pos:ContextMenuPosition,date:Date}|null>(null);
  const { setCurrentDate: setStoreDate } = useCalendarStore();
  const { settings } = useSettingsStore();
  const rangeState = useRangeSelection();

  useEffect(() => { setMounted(true); }, []);

  // ── Keyboard shortcuts (only when NOT focused on an input/textarea) ──────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdPaletteOpen(true); return; }

      // Skip single-key shortcuts when the user is typing in an input
      if (isTyping) return;

      if (e.key === 'ArrowLeft' && !e.shiftKey) setCurrentDate((d) => subMonths(d, 1));
      if (e.key === 'ArrowRight' && !e.shiftKey) setCurrentDate((d) => addMonths(d, 1));
      if (e.key === 't' || e.key === 'T') setCurrentDate(new Date());
      if (e.key === 'Escape') { rangeState.clearAll(); setContextMenu(null); setCmdPaletteOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [rangeState]);

  const handlePrev = useCallback(() => setCurrentDate((d) => subMonths(d, 1)), []);
  const handleNext = useCallback(() => setCurrentDate((d) => addMonths(d, 1)), []);
  const handleDateSelect = useCallback((date: Date) => setStoreDate(date), [setStoreDate]);
  const handleWeatherDateSelect = useCallback((date: Date) => {
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setStoreDate(date);
  }, [setStoreDate]);

  // ── Context menu ────────────────────────────────────────────────────────────
  const handleContextMenu = useCallback((e: React.MouseEvent, date: Date) => {
    e.preventDefault();
    setContextMenu({ pos: { x: e.clientX, y: e.clientY }, date });
  }, []);

  const contextMenuItems = useMemo((): ContextMenuItem[] => {
    if (!contextMenu) return [];
    const date = contextMenu.date;
    return [
      { id: 'range-start', label: 'Set as Range Start', icon: '📍', action: () => rangeState.startDrag(date) },
      { id: 'copy-date', label: 'Copy Date', icon: '📋', action: () => {
        navigator.clipboard.writeText(date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
      }},
      { id: 'export-ics', label: 'Export This Day (.ics)', icon: '📅', action: () => downloadSingleDayICS(date.toISOString().split('T')[0]) },
    ];
  }, [contextMenu, rangeState]);

  // ── "Go to Date" handler for command palette ─────────────────────────────
  const handleGoToDate = useCallback((dateStr: string): boolean => {
    // Parse dd/mm/yyyy
    const parts = dateStr.trim().match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
    if (!parts) return false;
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10);
    const year = parseInt(parts[3], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;
    const target = new Date(year, month - 1, day);
    if (isNaN(target.getTime())) return false;
    setCurrentDate(new Date(year, month - 1, 1));
    setStoreDate(target);
    return true;
  }, [setStoreDate]);

  // ── Command Palette commands ─────────────────────────────────────────────────
  const paletteCommands = useMemo((): PaletteCommand[] => [
    { id: 'today', label: 'Go to Today', description: 'Navigate to the current month', icon: '📅', keywords: ['today', 'now', 'current'], action: () => setCurrentDate(new Date()) },
    { id: 'prev', label: 'Previous Month', icon: '◀️', keywords: ['back', 'previous', 'last month'], action: handlePrev },
    { id: 'next', label: 'Next Month', icon: '▶️', keywords: ['forward', 'next month'], action: handleNext },
    { id: 'clear', label: 'Clear Selection', description: 'Clear the current date range', icon: '✕', keywords: ['clear', 'reset', 'remove'], action: rangeState.clearAll },
  ], [handlePrev, handleNext, rangeState.clearAll]);

  if (!mounted) return null;

  return (
    <div className={`wall-bg min-h-screen flex flex-col items-center justify-center py-12 px-4 ${settings.highContrast ? 'high-contrast' : ''}`}>

      {/* ── Cmd+K Command Palette ── */}
      {cmdPaletteOpen && (
        <CommandPalette
          commands={paletteCommands}
          onClose={() => setCmdPaletteOpen(false)}
          onGoToDate={handleGoToDate}
        />
      )}

      {/* ── Context Menu ── */}
      {contextMenu && (
        <ContextMenu
          items={contextMenuItems}
          position={contextMenu.pos}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* ── Countdown strip (above the card) ── */}
      <div className="w-full max-w-3xl mb-6 no-print">
        <CountdownStrip />
      </div>

      {/* ── Calendar Card ── */}
      <div className="relative w-full max-w-3xl">
        {/* Hanging hook above card */}
        <HangingHook />

        <motion.div
          className="calendar-card bg-white w-full overflow-hidden relative mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 160 }}
        >
          {/* Spiral binding */}
          <BindingStrip />

          {/* Hero image (55% of card height) — per-month images */}
          <HeroSection
            date={currentDate}
            onPrevMonth={handlePrev}
            onNextMonth={handleNext}
          />

          {/* ── Motivational quote for the month ── */}
          <MonthlyQuote month={currentDate.getMonth()} />

          {/* ── Lower section: Notes + Calendar Grid ── */}
          <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6" style={{ minHeight: '360px' }}>
            {/* Left: Notes area (matches reference image) */}
            <div className="w-full md:w-44 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
              <InlineNotesArea />
            </div>

            {/* Right: Calendar grid */}
            <div className="flex-1 min-w-0">
              <CalendarGrid
                currentDate={currentDate}
                onDateSelect={handleDateSelect}
                onContextMenu={handleContextMenu}
                rangeState={rangeState}
              />
              <div className="range-banner">
                <RangeInfoBanner
                  range={rangeState.activeRange}
                  onClear={rangeState.clearAll}
                />
              </div>
            </div>
          </div>

          {/* ── Weather bar (all days of the month) ── */}
          <div className="border-t border-gray-100 px-5 py-2 weather-bar">
            <WeatherBar
              baseDate={new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)}
              onDateSelect={handleWeatherDateSelect}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Keyboard hint footer ── */}
      <p className="mt-5 text-xs text-gray-400 no-print">
        ← → navigate months · T go to today · Cmd+K command palette · right-click on a date for options
      </p>
    </div>
  );
}
