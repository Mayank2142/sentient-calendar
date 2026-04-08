import { create } from 'zustand';
import { CalendarEvent, UndoRedoState } from '@/types';

interface CalendarStoreState {
  // State
  currentDate: Date;
  events: CalendarEvent[];
  selectedDates: Date[];
  undoStack: UndoRedoState[];
  redoStack: UndoRedoState[];
  selectedEventId: string | null;

  // Actions
  setCurrentDate: (date: Date) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  selectDate: (date: Date) => void;
  toggleDateSelection: (date: Date) => void;
  clearSelection: () => void;
  setSelectedEvent: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  pushUndoState: (action: string, data: unknown) => void;
}

export const useCalendarStore = create<CalendarStoreState>((set, get) => ({
  // State
  currentDate: new Date(),
  events: [],
  selectedDates: [],
  undoStack: [],
  redoStack: [],
  selectedEventId: null,

  // Actions
  setCurrentDate: (date: Date) => {
    set({ currentDate: date });
  },

  addEvent: (event: CalendarEvent) => {
    const state = get();
    state.pushUndoState('addEvent', { event });
    set((s) => ({ events: [...s.events, event] }));
  },

  updateEvent: (id: string, updates: Partial<CalendarEvent>) => {
    const state = get();
    const event = state.events.find((e) => e.id === id);
    if (!event) return;

    state.pushUndoState('updateEvent', { id, oldEvent: event, newEvent: { ...event, ...updates } });

    set((s) => ({
      events: s.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  },

  deleteEvent: (id: string) => {
    const state = get();
    const event = state.events.find((e) => e.id === id);
    if (!event) return;

    state.pushUndoState('deleteEvent', { event });

    set((s) => ({
      events: s.events.filter((e) => e.id !== id),
      selectedEventId: s.selectedEventId === id ? null : s.selectedEventId,
    }));
  },

  selectDate: (date: Date) => {
    set({ selectedDates: [date] });
  },

  toggleDateSelection: (date: Date) => {
    set((s) => {
      const isSelected = s.selectedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      return {
        selectedDates: isSelected
          ? s.selectedDates.filter((d) => d.toDateString() !== date.toDateString())
          : [...s.selectedDates, date],
      };
    });
  },

  clearSelection: () => {
    set({ selectedDates: [] });
  },

  setSelectedEvent: (id: string | null) => {
    set({ selectedEventId: id });
  },

  pushUndoState: (action: string, data: unknown) => {
    set((s) => ({
      undoStack: [...s.undoStack, { action, timestamp: Date.now(), data }].slice(-50),
      redoStack: [],
    }));
  },

  undo: () => {
    const state = get();
    if (state.undoStack.length === 0) return;

    const lastAction = state.undoStack[state.undoStack.length - 1];
    set((s) => ({
      undoStack: s.undoStack.slice(0, -1),
      redoStack: [...s.redoStack, lastAction],
    }));

    // Implementation would restore previous state based on action type
  },

  redo: () => {
    const state = get();
    if (state.redoStack.length === 0) return;

    const lastAction = state.redoStack[state.redoStack.length - 1];
    set((s) => ({
      redoStack: s.redoStack.slice(0, -1),
      undoStack: [...s.undoStack, lastAction],
    }));

    // Implementation would restore next state based on action type
  },
}));
