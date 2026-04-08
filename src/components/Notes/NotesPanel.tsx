'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pin } from 'lucide-react';
import { useNotesStore } from '@/store/notesStore';
import { useCalendarStore } from '@/store/calendarStore';
import { StickyNote as StickyNoteType } from '@/types';
import { Button } from '@/components/ui/button';
import StickyNote from './StickyNote';

const COLORS: Array<StickyNoteType['color']> = ['yellow', 'pink', 'green', 'blue', 'purple'];

/**
 * Notes panel for managing sticky notes
 */
export default function NotesPanel() {
  const { notes, addNote, getNotesByDate, deleteNote, pinNote } = useNotesStore();
  const { currentDate: selectedDate } = useCalendarStore();
  const [selectedColor, setSelectedColor] = useState<StickyNoteType['color']>('yellow');

  const dateStr = selectedDate.toISOString().split('T')[0];
  const notesForDate = getNotesByDate(dateStr);
  const pinnedNotes = notesForDate.filter((n) => n.pinned);
  const regularNotes = notesForDate.filter((n) => !n.pinned);

  const handleAddNote = () => {
    const newNote: StickyNoteType = {
      id: Date.now().toString(),
      date: dateStr,
      content: '',
      color: selectedColor,
      pinned: false,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addNote(newNote);
  };

  const handleTogglePin = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      pinNote(id, !note.pinned);
    }
  };

  const colorClasses: Record<StickyNoteType['color'], string> = {
    yellow: 'bg-yellow-100 border-yellow-300',
    pink: 'bg-pink-100 border-pink-300',
    green: 'bg-green-100 border-green-300',
    blue: 'bg-blue-100 border-blue-300',
    purple: 'bg-purple-100 border-purple-300',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Color Selector */}
      <div className="flex gap-2">
        {COLORS.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedColor(color)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              selectedColor === color ? 'border-gray-800' : 'border-transparent'
            } ${colorClasses[color]}`}
            aria-label={`${color} color`}
          />
        ))}
      </div>

      {/* Add Note Button */}
      <Button onClick={handleAddNote} className="w-full gap-2">
        <Plus size={18} />
        Add Note
      </Button>

      {/* Pinned Notes */}
      <AnimatePresence>
        {pinnedNotes.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Pinned</p>
            <div className="space-y-2">
              {pinnedNotes.map((note) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  onPin={() => handleTogglePin(note.id)}
                  onDelete={() => deleteNote(note.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regular Notes */}
      <AnimatePresence>
        {regularNotes.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {pinnedNotes.length > 0 && (
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</p>
            )}
            <div className="space-y-2">
              {regularNotes.map((note) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  onPin={() => handleTogglePin(note.id)}
                  onDelete={() => deleteNote(note.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {notesForDate.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <p>No notes for this date</p>
          <p className="text-sm">Create one above to get started</p>
        </motion.div>
      )}
    </div>
  );
}
