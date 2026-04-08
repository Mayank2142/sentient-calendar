'use client';
import React from 'react';

// ─── Spiral Wire Binding Strip ────────────────────────────────────────────────
// Renders a decorative horizontal strip simulating wire-o spiral binding.
// Each coil is an SVG ellipse repeated across the full width.

interface BindingStripProps {
  width?: number;  // logical units for the SVG viewBox
}

export default function BindingStrip({ width = 1000 }: BindingStripProps) {
  const coilCount = Math.floor(width / 22);
  const coilWidth = width / coilCount;

  return (
    <div className="w-full relative z-10" style={{ height: '36px', background: '#374151' }}>
      <svg
        width="100%"
        height="36"
        viewBox={`0 0 ${width} 36`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark backing strip */}
        <rect x="0" y="10" width={width} height="16" fill="#1F2937" />

        {/* Coil rings */}
        {Array.from({ length: coilCount }, (_, i) => {
          const cx = i * coilWidth + coilWidth / 2;
          return (
            <g key={i}>
              {/* Back half of ring (behind strip) */}
              <ellipse
                cx={cx}
                cy="18"
                rx={coilWidth * 0.38}
                ry="10"
                fill="none"
                stroke="#374151"
                strokeWidth="3"
                opacity="0.5"
              />
              {/* Front half of ring (on top of strip — lower arc) */}
              <path
                d={`
                  M ${cx - coilWidth * 0.38} 18
                  A ${coilWidth * 0.38} 10 0 0 0 ${cx + coilWidth * 0.38} 18
                `}
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Sheen line on front */}
              <ellipse
                cx={cx - coilWidth * 0.08}
                cy="21"
                rx={coilWidth * 0.1}
                ry="2.5"
                fill="white"
                opacity="0.3"
              />
            </g>
          );
        })}

        {/* Top edge highlight */}
        <line x1="0" y1="10" x2={width} y2="10" stroke="#4B5563" strokeWidth="1" />
        {/* Bottom edge shadow */}
        <line x1="0" y1="26" x2={width} y2="26" stroke="#111827" strokeWidth="1" />
      </svg>
    </div>
  );
}
