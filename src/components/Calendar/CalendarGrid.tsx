'use client';
import React, { useMemo, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import DateCell from './DateCell';
import { useRangeSelection } from '@/hooks/useRangeSelection';
import { getHolidayForDate } from '@/utils/holidays/holidayCalculator';
import { useCalendarStore } from '@/store/calendarStore';
import { useSettingsStore } from '@/store/settingsStore';

// ─── Weekday header labels ─────────────────────────────────────────────────────
const WEEKDAYS_SUN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const WEEKDAYS_MON = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface CalendarGridProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onContextMenu?: (e: React.MouseEvent, date: Date) => void;
  rangeState: ReturnType<typeof useRangeSelection>;
}

export default function CalendarGrid({ currentDate, onDateSelect, onContextMenu, rangeState }: CalendarGridProps) {
  const { events } = useCalendarStore();
  const { settings } = useSettingsStore();
  const weekStartsMonday = settings.weekStartDay === 'monday';
  const WEEKDAYS = weekStartsMonday ? WEEKDAYS_MON : WEEKDAYS_SUN;

  // ── Month flip animation direction ────────────────────────────────────────
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const prevMonth = useRef(currentDate.getMonth());
  if (currentDate.getMonth() !== prevMonth.current) {
    setDirection(currentDate.getMonth() > prevMonth.current || (currentDate.getMonth() === 0 && prevMonth.current === 11) ? 1 : -1);
    prevMonth.current = currentDate.getMonth();
  }

  // ── Range selection ────────────────────────────────────────────────────────
  const range = rangeState;

  // ── Build calendar days ────────────────────────────────────────────────────
  const calendar = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Padding for start of month
    let startDow = getDay(start);
    if (weekStartsMonday) startDow = (startDow + 6) % 7;
    const prev = subMonths(currentDate, 1);
    const prevEnd = endOfMonth(prev);
    const prevPad = Array.from({ length: startDow }, (_, i) => {
      const d = new Date(prevEnd);
      d.setDate(prevEnd.getDate() - (startDow - 1 - i));
      return d;
    });

    // Padding for end of month
    let endDow = getDay(end);
    if (weekStartsMonday) endDow = (endDow + 6) % 7;
    const nextPad = Array.from({ length: endDow === 6 ? 0 : 6 - endDow }, (_, i) => {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1);
      return d;
    });

    const allDays = [...prevPad, ...days, ...nextPad];
    const weeks: Date[][] = [];
    for (let i = 0; i < allDays.length; i += 7) weeks.push(allDays.slice(i, i + 7));
    return weeks;
  }, [currentDate, weekStartsMonday]);

  const today = useMemo(() => new Date(), []);

  const getEventsForDate = useCallback((date: Date): typeof events => {
    const ds = date.toISOString().split('T')[0];
    return events.filter((e) => e.startDate.startsWith(ds));
  }, [events]);

  const handleContextMenu = useCallback((e: React.MouseEvent, date: Date) => {
    if (onContextMenu) onContextMenu(e, date);
  }, [onContextMenu]);

  return (
    <div
      className="w-full select-none"
      onPointerLeave={range.endDrag}
    >
      {/* ── Weekday header ── */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => {
          const isWeekendCol = weekStartsMonday ? i >= 5 : i === 0 || i === 6;
          return (
            <div key={d} className={`text-center text-xs font-semibold tracking-wider py-2 uppercase
              ${isWeekendCol ? 'text-[var(--accent-color,#1a56db)]' : 'text-gray-500'}`}>
              {d}
            </div>
          );
        })}
      </div>

      {/* ── Animated grid pages ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          initial={{ rotateX: direction * 45, opacity: 0, scale: 0.95 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          exit={{ rotateX: direction * -45, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          style={{ perspective: '1200px', transformOrigin: 'top' }}
        >
          <div
            className="grid grid-cols-7"
            role="grid"
            aria-label={`Calendar grid for ${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}
          >
            {calendar.map((week, rowIndex) =>
              week.map((date, colIndex) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = date.toDateString() === today.toDateString();
                const dow = weekStartsMonday ? (date.getDay() + 6) % 7 : date.getDay();
                const isWeekend = weekStartsMonday ? dow >= 5 : dow === 0 || dow === 6;
                const holiday = getHolidayForDate(date.toISOString().split('T')[0]);
                const dateEvents = getEventsForDate(date);

                return (
                  <DateCell
                    key={date.toISOString()}
                    date={date}
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                    holiday={holiday}
                    events={dateEvents}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isInRange={range.isInAnyRange(date)}
                    isRangeStart={range.isRangeStart(date)}
                    isRangeEnd={range.isRangeEnd(date)}
                    isWeekend={isWeekend}
                    tabIndex={isCurrentMonth && isToday ? 0 : -1}
                    onDateSelect={onDateSelect}
                    onPointerDown={range.startDrag}
                    onPointerEnter={range.continueDrag}
                    onPointerUp={range.endDrag}
                    onContextMenu={handleContextMenu}
                  />
                );
              })
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Range Clear button ── */}
      <AnimatePresence>
        {range.state.ranges.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            onClick={range.clearAll}
            className="mt-2 text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <span>✕</span> Clear selection
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
