'use client';
import React, { useState, useCallback, useEffect } from 'react';
import SeasonalSVG from './SeasonalSVG';
import ImageDropZone from './ImageDropZone';
import FocalPointPicker from './FocalPointPicker';
import MonthYearOverlay from './MonthYearOverlay';

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Occupies the upper ~55% of the CalendarCard.
// Shows a full-bleed image (uploaded or seasonal SVG fallback).
// Images are stored PER MONTH so each month can have its own hero.

interface HeroSectionProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

// Key format: "hero-2026-3" for April 2026
function getMonthKey(date: Date): string {
  return `hero-${date.getFullYear()}-${date.getMonth()}`;
}

interface StoredHero {
  dataUrl: string;
  focalX: number;
  focalY: number;
}

export default function HeroSection({ date, onPrevMonth, onNextMonth }: HeroSectionProps) {
  const [heroImages, setHeroImages] = useState<Record<string, StoredHero>>({});
  const [focalPoint, setFocalPoint] = useState({ x: 50, y: 50 });
  const [showFocalPicker, setShowFocalPicker] = useState(false);

  const monthKey = getMonthKey(date);
  const currentHero = heroImages[monthKey];

  // Load saved images from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('calendar-hero-images');
      if (saved) {
        setHeroImages(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Sync focal point when month changes
  useEffect(() => {
    if (currentHero) {
      setFocalPoint({ x: currentHero.focalX, y: currentHero.focalY });
      setShowFocalPicker(false);
    }
  }, [monthKey]);

  const handleImageLoad = useCallback((dataUrl: string) => {
    setHeroImages((prev) => {
      const updated = {
        ...prev,
        [monthKey]: { dataUrl, focalX: 50, focalY: 50 },
      };
      try {
        localStorage.setItem('calendar-hero-images', JSON.stringify(updated));
      } catch {
        // localStorage might be full for large images — silently fail
      }
      return updated;
    });
    setFocalPoint({ x: 50, y: 50 });
    setShowFocalPicker(true);
  }, [monthKey]);

  const handleFocalPointChange = useCallback((x: number, y: number) => {
    setFocalPoint({ x, y });
    setHeroImages((prev) => {
      if (!prev[monthKey]) return prev;
      const updated = {
        ...prev,
        [monthKey]: { ...prev[monthKey], focalX: x, focalY: y },
      };
      try {
        localStorage.setItem('calendar-hero-images', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, [monthKey]);

  const handleRemoveImage = useCallback(() => {
    setHeroImages((prev) => {
      const updated = { ...prev };
      delete updated[monthKey];
      try {
        localStorage.setItem('calendar-hero-images', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setShowFocalPicker(false);
  }, [monthKey]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '55%', minHeight: '220px' }}>
      <ImageDropZone onImageLoad={handleImageLoad}>
        {/* ── Uploaded photo (month-specific) ── */}
        {currentHero ? (
          <img
            src={currentHero.dataUrl}
            alt="Calendar hero"
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: `${focalPoint.x}% ${focalPoint.y}%`,
            }}
          />
        ) : (
          /* ── Default seasonal SVG ── */
          <div className="w-full h-full">
            <SeasonalSVG date={date} />
          </div>
        )}

        {/* ── Focal point picker (only after image upload) ── */}
        {currentHero && showFocalPicker && (
          <FocalPointPicker onPositionChange={handleFocalPointChange} />
        )}

        {/* ── Controls for uploaded image ── */}
        {currentHero && showFocalPicker && (
          <div className="absolute top-3 left-3 z-30 flex gap-2">
            <button
              onClick={() => setShowFocalPicker(false)}
              className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              ✓ Done
            </button>
            <button
              onClick={handleRemoveImage}
              className="bg-red-500/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm hover:bg-red-600/80 transition-colors"
            >
              ✕ Remove
            </button>
          </div>
        )}

        {/* ── Re-show focal picker button ── */}
        {currentHero && !showFocalPicker && (
          <button
            onClick={() => setShowFocalPicker(true)}
            className="absolute top-3 left-3 z-30 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            ✎ Adjust focus
          </button>
        )}
      </ImageDropZone>

      {/* ── Month / Year overlay (bottom-right, always visible) ── */}
      <MonthYearOverlay
        date={date}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
    </div>
  );
}
