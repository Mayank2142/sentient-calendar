'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── Focal Point Picker ───────────────────────────────────────────────────────
// A draggable crosshair that lets the user set which part of the uploaded
// image stays centred when the container crops to a fixed aspect ratio.
// Updates CSS `object-position` on the sibling <img> element via a callback.

interface FocalPointPickerProps {
  onPositionChange: (x: number, y: number) => void; // 0–100 percentages
}

export default function FocalPointPicker({ onPositionChange }: FocalPointPickerProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [visible] = useState(true);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setPos({ x, y });
      onPositionChange(x, y);
    },
    [onPositionChange]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setPos({ x, y });
      onPositionChange(x, y);
    },
    [onPositionChange]
  );

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-10 cursor-crosshair"
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      {/* Crosshair marker */}
      <motion.div
        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white shadow-lg" />
        {/* Cross lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white -translate-x-1/2" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Instruction label */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap pointer-events-none">
        Click to set focal point
      </div>
    </div>
  );
}
