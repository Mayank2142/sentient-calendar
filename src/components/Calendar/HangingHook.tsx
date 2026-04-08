'use client';
import React from 'react';

// ─── Hanging Hook SVG ─────────────────────────────────────────────────────────
// Renders a realistic nail/hook visible at the very top center of the calendar.

export default function HangingHook() {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      {/* The hook wire loop */}
      <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nail head */}
        <ellipse cx="30" cy="6" rx="10" ry="5" fill="#9CA3AF" />
        <ellipse cx="30" cy="6" rx="7" ry="3.5" fill="#D1D5DB" />

        {/* Nail shaft */}
        <rect x="28" y="5" width="4" height="18" rx="2" fill="#6B7280" />

        {/* Wire loop */}
        <path
          d="M 30 22 C 30 22, 20 26, 16 34 C 14 38, 18 42, 24 40 C 28 38, 30 34, 30 34"
          stroke="#4B5563"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 30 22 C 30 22, 40 26, 44 34 C 46 38, 42 42, 36 40 C 32 38, 30 34, 30 34"
          stroke="#4B5563"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Glint on nail head */}
        <ellipse cx="26" cy="4" rx="2.5" ry="1.2" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
}
