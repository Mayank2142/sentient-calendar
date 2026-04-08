'use client';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContextMenuPosition, ContextMenuItem } from '@/types';

// ─── Custom Right-Click Context Menu ─────────────────────────────────────────
// Replaces the native browser context menu on calendar date cells.
// Smart-positions itself near the cursor while staying within the viewport.

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: ContextMenuPosition;
  onClose: () => void;
}

export default function ContextMenu({ items, position, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or clicking outside the menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const handlePointerDown = (e: PointerEvent) => {
      // Only close if the click is OUTSIDE the menu
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    // Use a slight delay so the initial right-click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerDown);
    }, 50);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointerDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  // Smart positioning: flip if near right/bottom edge
  const menuWidth = 220;
  const menuHeight = items.length * 38 + 16;
  const left = position.x + menuWidth > window.innerWidth ? position.x - menuWidth : position.x;
  const top  = position.y + menuHeight > window.innerHeight ? position.y - menuHeight : position.y;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        role="menu"
        aria-label="Date context menu"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[100] bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden"
        style={{ top, left, minWidth: menuWidth }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="menuitem"
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
            onClick={() => { item.action(); onClose(); }}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <kbd className="text-xs text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">{item.shortcut}</kbd>
            )}
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
