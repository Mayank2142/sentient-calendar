'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Pin } from 'lucide-react';
import { StickyNote as StickyNoteType } from '@/types';
import { useNotesStore } from '@/store/notesStore';

interface StickyNoteProps {
  note: StickyNoteType;
  onPin?: () => void;
  onDelete?: () => void;
}

/**
 * Individual sticky note component with inline editing
 */
export default function StickyNote({ note, onPin, onDelete }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const { updateNote } = useNotesStore();

  const colorClasses: Record<StickyNoteType['color'], string> = {
    yellow: 'bg-yellow-100 border-yellow-300 hover:shadow-yellow-200',
    pink: 'bg-pink-100 border-pink-300 hover:shadow-pink-200',
    green: 'bg-green-100 border-green-300 hover:shadow-green-200',
    blue: 'bg-blue-100 border-blue-300 hover:shadow-blue-200',
    purple: 'bg-purple-100 border-purple-300 hover:shadow-purple-200',
  };

  const handleSave = () => {
    updateNote(note.id, { content, updatedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(note.content);
    setIsEditing(false);
  };

  return (
    <motion.div
      className={`p-3 rounded-lg border-2 ${colorClasses[note.color]} shadow-md hover:shadow-lg transition-shadow`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
    >
      {isEditing ? (
        <textarea
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 text-sm bg-white border rounded resize-none focus:outline-none focus:ring-2 focus:ring-offset-0"
          placeholder="Write your note..."
          rows={3}
        />
      ) : (
        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{content || 'Tap to add content'}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-xs bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-600 hover:text-gray-800 transition-colors flex-1 text-left"
            >
              Click to edit
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPin}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Pin note"
            >
              <Pin size={14} className={note.pinned ? 'text-gray-700' : 'text-gray-400'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Delete note"
            >
              <Trash2 size={14} className="text-red-400 hover:text-red-600" />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
