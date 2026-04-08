import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StickyNote } from '@/types';

// ─── Notes Store (with localStorage persistence) ──────────────────────────────

interface NotesStoreState {
  notes: StickyNote[];
  selectedNoteId: string | null;
  addNote: (note: StickyNote) => void;
  updateNote: (id: string, updates: Partial<StickyNote>) => void;
  deleteNote: (id: string) => void;
  setSelectedNote: (id: string | null) => void;
  getNotesByDate: (date: string) => StickyNote[];
  getNotesByTag: (tag: string) => StickyNote[];
  pinNote: (id: string, pinned: boolean) => void;
}

export const useNotesStore = create<NotesStoreState>()(
  persist(
    (set, get) => ({
      notes: [],
      selectedNoteId: null,

      addNote: (note) => set((s) => ({ notes: [...s.notes, note] })),

      updateNote: (id, updates) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n)),
        })),

      deleteNote: (id) =>
        set((s) => ({
          notes: s.notes.filter((n) => n.id !== id),
          selectedNoteId: s.selectedNoteId === id ? null : s.selectedNoteId,
        })),

      setSelectedNote: (id) => set({ selectedNoteId: id }),

      getNotesByDate: (date) => get().notes.filter((n) => n.date === date),

      getNotesByTag: (tag) => get().notes.filter((n) => n.tags?.includes(tag)),

      pinNote: (id, pinned) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, pinned } : n)),
        })),
    }),
    {
      name: 'sentient-calendar-notes', // localStorage key
    }
  )
);
