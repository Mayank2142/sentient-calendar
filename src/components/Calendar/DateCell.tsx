'use client';
import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Holiday, CalendarEvent } from '@/types';
import { useCalendarStore } from '@/store/calendarStore';

// ─── Date Cell ────────────────────────────────────────────────────────────────
// Individual date in the 7-column calendar grid.
// Memoized so only cells with changed props re-render.
// Shows: day number, moon phase, holiday dot+emoji, range highlight, today ring.

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  holiday?: Holiday;
  events: CalendarEvent[];
  rowIndex: number;
  colIndex: number;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isWeekend: boolean;
  tabIndex: number;
  onDateSelect: (date: Date) => void;
  onPointerDown: (date: Date, additive: boolean) => void;
  onPointerEnter: (date: Date) => void;
  onPointerUp: () => void;
  onContextMenu: (e: React.MouseEvent, date: Date) => void;
}

const categoryDotColor: Record<string, string> = {
  national: '#ef4444',
  festival: '#f97316',
  religious: '#8b5cf6',
  astronomical: '#a855f7',
  cultural: '#06b6d4',
};

function DateCellInner({
  date, isCurrentMonth, isToday, holiday, events,
  rowIndex, colIndex, isInRange, isRangeStart, isRangeEnd, isWeekend,
  tabIndex, onDateSelect, onPointerDown, onPointerEnter, onPointerUp, onContextMenu,
}: DateCellProps) {
  const { selectDate } = useCalendarStore();
  const day = format(date, 'd');
  const dateLabel = format(date, 'EEEE, MMMM d, yyyy');

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    onPointerDown(date, e.ctrlKey || e.metaKey);
  }, [date, onPointerDown]);

  const handlePointerEnter = useCallback(() => {
    onPointerEnter(date);
  }, [date, onPointerEnter]);

  const handleClick = useCallback(() => {
    selectDate(date);
    onDateSelect(date);
  }, [date, selectDate, onDateSelect]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu(e, date);
  }, [date, onContextMenu]);

  const delay = (rowIndex * 7 + colIndex) * 0.013;

  // ── Range styling ──────────────────────────────────────────────────────
  let rangeBg = '';
  if (isInRange) {
    if (isRangeStart && isRangeEnd) rangeBg = 'range-single';
    else if (isRangeStart) rangeBg = 'range-start';
    else if (isRangeEnd) rangeBg = 'range-end';
    else rangeBg = 'range-middle';
  }

  return (
    <motion.div
      role="gridcell"
      aria-label={`${dateLabel}${holiday ? '. ' + holiday.name : ''}${isInRange ? '. In selected range.' : ''}`}
      tabIndex={tabIndex}
      className={`relative select-none cursor-pointer focus:outline-none group
        ${isCurrentMonth ? 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300' : 'opacity-30 pointer-events-none'}
        ${rangeBg}
      `}
      data-date={format(date, 'yyyy-MM-dd')}
      style={{ minHeight: '52px', padding: '6px 4px 4px' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isCurrentMonth ? 1 : 0.3, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, delay }}
      whileHover={isCurrentMonth ? { scale: 1.06, y: -3 } : {}}
      whileTap={{ scale: 0.96 }}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerUp={onPointerUp}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* ── Day number ── */}
      <div className={`
        relative z-10 text-sm font-medium leading-none w-7 h-7 flex items-center justify-center mx-auto rounded-full
        ${isToday ? 'text-white' : isWeekend ? 'text-[var(--accent-color,#1a56db)]' : 'text-gray-800'}
        ${isToday ? 'ring-2 ring-[var(--accent-color,#1a56db)] ring-offset-1' : ''}
      `}
        style={isToday ? { background: 'var(--accent-color, #1a56db)', color: 'white' } : {}}
      >
        {day}
      </div>

      {/* ── Holiday dot + emoji ── */}
      {holiday && (
        <div
          className="absolute top-1 right-1 text-xs leading-none"
          title={holiday.name}
        >
          <span>{holiday.icon}</span>
          <span
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white"
            style={{ background: categoryDotColor[holiday.category] ?? '#6b7280' }}
          />
        </div>
      )}

      {/* ── Event dots ── */}
      {events.length > 0 && (
        <div className="flex justify-center gap-0.5 mt-1">
          {events.slice(0, 3).map((ev, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: ev.color ?? 'var(--accent-color, #1a56db)' }} />
          ))}
          {events.length > 3 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
        </div>
      )}

      {/* ── Focus ring ── */}
      <div className="absolute inset-0 rounded opacity-0 group-focus-visible:opacity-100 pointer-events-none"
        style={{ outline: '2px solid var(--accent-color,#1a56db)', outlineOffset: '2px' }} />
    </motion.div>
  );
}

export default memo(DateCellInner);
