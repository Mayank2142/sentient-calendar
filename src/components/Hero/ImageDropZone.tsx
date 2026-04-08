'use client';
import React, { useState, useCallback } from 'react';
import { extractDominantColor, applyAccentColor } from '@/utils/colorExtraction';

// ─── Image Drop Zone ──────────────────────────────────────────────────────────
// Accepts dragged image files from the user's filesystem.
// On drop: reads file as base64, applies to hero, extracts dominant color.

interface ImageDropZoneProps {
  onImageLoad: (dataUrl: string) => void;
  children: React.ReactNode;
}

export default function ImageDropZone({ onImageLoad, children }: ImageDropZoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const color = extractDominantColor(img);
        applyAccentColor(color);
        onImageLoad(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div
      className="relative w-full h-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}

      {/* Drop zone overlay — only shown while dragging */}
      {isDraggingOver && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-lg"
          style={{
            border: '3px dashed var(--accent-color, #1a56db)',
            background: 'rgba(26, 86, 219, 0.08)',
            animation: 'pulse 1.2s ease-in-out infinite',
          }}
        >
          <span className="text-4xl mb-2">🖼️</span>
          <p className="text-white text-lg font-bold drop-shadow-lg">Drop image to set hero</p>
          <p className="text-white/70 text-sm">Theme color will update automatically</p>
        </div>
      )}

      {/* Invisible file input for click-to-upload */}
      <label
        className="absolute top-3 right-3 z-50 cursor-pointer bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all flex items-center gap-1.5 select-none"
        title="Click to upload or drag an image onto the hero"
      >
        📷 Change Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
}
