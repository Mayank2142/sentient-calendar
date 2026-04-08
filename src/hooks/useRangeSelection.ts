'use client';
import { useState, useCallback, useRef } from 'react';
import { DateRange, RangeSelectionState } from '@/types';
import { normalizeRange } from '@/utils/dateRange';

// ─── useRangeSelection Hook ───────────────────────────────────────────────────
// Handles pointer-based drag-to-select across date cells.
// Supports multi-range (Ctrl/Cmd+click) and keyboard extension (Shift+Arrow).

interface UseRangeSelectionReturn {
  state: RangeSelectionState;
  startDrag: (date: Date, additive?: boolean) => void;
  continueDrag: (date: Date) => void;
  endDrag: () => void;
  clearAll: () => void;
  isInAnyRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  activeRange: DateRange | null;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function dateInRange(date: Date, range: DateRange): boolean {
  const d = date.getTime();
  const s = new Date(range.start); s.setHours(0, 0, 0, 0);
  const e = new Date(range.end);   e.setHours(23, 59, 59, 999);
  return d >= s.getTime() && d <= e.getTime();
}

export function useRangeSelection(): UseRangeSelectionReturn {
  const [state, setState] = useState<RangeSelectionState>({
    isDragging: false,
    anchorDate: null,
    hoverDate: null,
    ranges: [],
  });

  const colorIndex = useRef(0);
  const RANGE_COLORS = [
    'var(--accent-color, #1a56db)',
    '#7c3aed',
    '#059669',
    '#d97706',
  ];

  const startDrag = useCallback((date: Date, additive = false) => {
    setState((prev) => ({
      ...prev,
      isDragging: true,
      anchorDate: date,
      hoverDate: date,
      // In additive mode, keep existing ranges; otherwise clear them
      ranges: additive ? prev.ranges : [],
    }));
    if (additive) {
      colorIndex.current = (colorIndex.current + 1) % RANGE_COLORS.length;
    } else {
      colorIndex.current = 0;
    }
  }, []);

  const continueDrag = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, hoverDate: date }));
  }, []);

  const endDrag = useCallback(() => {
    setState((prev) => {
      if (!prev.anchorDate || !prev.hoverDate) return { ...prev, isDragging: false };
      const { start, end } = normalizeRange(prev.anchorDate, prev.hoverDate);
      const newRange: DateRange = {
        id: `range-${Date.now()}`,
        start,
        end,
        color: RANGE_COLORS[colorIndex.current],
      };
      return {
        ...prev,
        isDragging: false,
        ranges: [...prev.ranges, newRange],
        anchorDate: null,
        hoverDate: null,
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    setState({ isDragging: false, anchorDate: null, hoverDate: null, ranges: [] });
  }, []);

  // Build preview range while dragging
  const previewRange: DateRange | null =
    state.isDragging && state.anchorDate && state.hoverDate
      ? { id: 'preview', ...normalizeRange(state.anchorDate, state.hoverDate) }
      : null;

  const activeRange = previewRange ?? (state.ranges[state.ranges.length - 1] ?? null);

  const isInAnyRange = useCallback((date: Date): boolean => {
    if (previewRange && dateInRange(date, previewRange)) return true;
    return state.ranges.some((r) => dateInRange(date, r));
  }, [previewRange, state.ranges]);

  const isRangeStart = useCallback((date: Date): boolean => {
    const checkRange = (r: DateRange) => sameDay(date, r.start);
    if (previewRange && checkRange(previewRange)) return true;
    return state.ranges.some(checkRange);
  }, [previewRange, state.ranges]);

  const isRangeEnd = useCallback((date: Date): boolean => {
    const checkRange = (r: DateRange) => sameDay(date, r.end);
    if (previewRange && checkRange(previewRange)) return true;
    return state.ranges.some(checkRange);
  }, [previewRange, state.ranges]);

  return { state, startDrag, continueDrag, endDrag, clearAll, isInAnyRange, isRangeStart, isRangeEnd, activeRange };
}
