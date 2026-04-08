'use client';
import React from 'react';
import { motion } from 'framer-motion';

// ─── Seasonal SVG Illustrations ───────────────────────────────────────────────
// 4 full-bleed animated SVG illustrations, one per season.
// Each features at least one looping CSS animation.

type Season = 'winter' | 'spring' | 'summer' | 'autumn';

function getSeason(month: number): Season {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

interface SeasonalSVGProps { date: Date; }

export default function SeasonalSVG({ date }: SeasonalSVGProps) {
  const season = getSeason(date.getMonth());
  const scenes: Record<Season, React.ReactNode> = {
    winter: <WinterScene />,
    spring: <SpringScene />,
    summer: <SummerScene />,
    autumn: <AutumnScene />,
  };
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes sw-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
          @keyframes sw-sway  { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
          @keyframes sw-drift { 0%{transform:translateX(0)} 100%{transform:translateX(60px)} }
          @keyframes sw-snow  { 0%{transform:translateY(-10px) translateX(0);opacity:0} 80%{opacity:0.8} 100%{transform:translateY(420px) translateX(20px);opacity:0} }
          @keyframes sw-leaf  { 0%{transform:translateY(-10px) rotate(0deg);opacity:0} 85%{opacity:0.7} 100%{transform:translateY(420px) rotate(360deg);opacity:0} }
          @keyframes sw-glow  { 0%,100%{opacity:0.8} 50%{opacity:1} }
          @keyframes sw-wave  { 0%,100%{d:path("M0 320 Q250 290 500 320 Q750 350 1000 320 L1000 400 L0 400 Z")} 50%{d:path("M0 330 Q250 310 500 330 Q750 350 1000 330 L1000 400 L0 400 Z")} }
        `}</style>
      </defs>
      {scenes[season]}
    </svg>
  );
}

function WinterScene() {
  return (
    <g>
      <defs>
        <linearGradient id="w-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
      </defs>
      <rect width="1000" height="400" fill="url(#w-sky)" />
      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <circle key={i} cx={(i * 97 + 23) % 1000} cy={(i * 53 + 11) % 200} r={i % 3 === 0 ? 2 : 1} fill="white" opacity={0.4 + (i % 5) * 0.1} />
      ))}
      {/* Mountains */}
      <polygon points="0,280 180,120 360,280" fill="#1e293b" />
      <polygon points="200,280 420,80 640,280" fill="#0f172a" />
      <polygon points="500,280 700,140 900,280" fill="#1e293b" />
      {/* Snow caps */}
      <polygon points="180,120 210,160 150,160" fill="white" opacity="0.9" />
      <polygon points="420,80 455,130 385,130" fill="white" opacity="0.9" />
      <polygon points="700,140 730,180 670,180" fill="white" opacity="0.9" />
      {/* Ground snow */}
      <path d="M0 310 Q250 295 500 310 Q750 325 1000 310 L1000 400 L0 400 Z" fill="white" opacity="0.9" />
      {/* Cabin glow */}
      <rect x="80" y="250" width="60" height="40" fill="#374151" />
      <polygon points="80,250 110,220 140,250" fill="#4B5563" />
      <rect x="95" y="265" width="14" height="18" fill="#FCD34D" opacity="0.9" />
      <circle cx="102" cy="258" r="18" fill="#FCD34D" opacity="0.15" style={{ animation: 'sw-glow 2s ease-in-out infinite' }} />
      {/* Snowflakes */}
      {[...Array(18)].map((_, i) => (
        <text key={i} x={(i * 73 + 30) % 980} y="-5" fontSize="14" fill="white" opacity="0.7"
          style={{ animation: `sw-snow ${2 + (i % 4)}s linear ${i * 0.3}s infinite` }}>❄</text>
      ))}
    </g>
  );
}

function SpringScene() {
  return (
    <g>
      <defs>
        <linearGradient id="sp-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="60%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
      </defs>
      <rect width="1000" height="400" fill="url(#sp-sky)" />
      {/* Rolling hills */}
      <path d="M0 280 Q250 200 500 260 Q750 320 1000 270 L1000 400 L0 400 Z" fill="#86efac" />
      <path d="M0 320 Q300 280 600 310 Q800 330 1000 305 L1000 400 L0 400 Z" fill="#4ade80" />
      {/* Cherry blossom trees */}
      {[150, 520, 850].map((x, i) => (
        <g key={i} style={{ transformOrigin: `${x}px 380px`, animation: `sw-sway ${3 + i * 0.5}s ease-in-out infinite` }}>
          <rect x={x - 6} y="230" width="12" height="80" fill="#92400e" />
          <circle cx={x} cy="200" r="55" fill="#fbcfe8" opacity="0.9" />
          <circle cx={x - 30} cy="215" r="40" fill="#f9a8d4" opacity="0.85" />
          <circle cx={x + 30} cy="215" r="40" fill="#f9a8d4" opacity="0.85" />
          {/* Petals */}
          {[...Array(6)].map((_, j) => (
            <circle key={j} cx={x + (j - 3) * 10} cy="210" r="5" fill="#fce7f3" opacity="0.6" />
          ))}
        </g>
      ))}
      {/* Sun */}
      <motion.circle cx="880" cy="70" r="45" fill="#FDE68A" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }} />
      <circle cx="880" cy="70" r="38" fill="#FCD34D" />
    </g>
  );
}

function SummerScene() {
  return (
    <g>
      <defs>
        <linearGradient id="su-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
        <linearGradient id="su-sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="1000" height="400" fill="url(#su-sky)" />
      {/* Ocean */}
      <path d="M0 270 Q250 250 500 270 Q750 290 1000 270 L1000 400 L0 400 Z" fill="url(#su-sea)" />
      {/* Animated wavy water highlight */}
      <path d="M0 285 Q125 275 250 285 Q375 295 500 285 Q625 275 750 285 Q875 295 1000 285" stroke="white" strokeWidth="2" fill="none" opacity="0.3"
        style={{ animation: 'sw-float 3s ease-in-out infinite' }} />
      {/* Sun */}
      <circle cx="500" cy="100" r="65" fill="#FDE68A" opacity="0.9" style={{ animation: 'sw-glow 4s ease-in-out infinite' }} />
      <circle cx="500" cy="100" r="52" fill="#FBBF24" />
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <line key={i} x1={500 + 55 * Math.cos(angle)} y1={100 + 55 * Math.sin(angle)}
            x2={500 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
            stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        );
      })}
      {/* Birds */}
      {[200, 600, 800].map((x, i) => (
        <text key={i} x={x} y={60 + i * 20} fontSize="20" style={{ animation: `sw-drift ${4 + i}s ease-in-out ${i * 0.5}s infinite alternate` }}>🐦</text>
      ))}
    </g>
  );
}

function AutumnScene() {
  return (
    <g>
      <defs>
        <linearGradient id="au-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
      <rect width="1000" height="400" fill="url(#au-sky)" />
      {/* Ground */}
      <path d="M0 320 Q500 290 1000 320 L1000 400 L0 400 Z" fill="#92400e" opacity="0.7" />
      <path d="M0 340 Q500 315 1000 340 L1000 400 L0 400 Z" fill="#78350f" />
      {/* Trees */}
      {[180, 500, 820].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="200" width="16" height="130" fill="#78350f" />
          <circle cx={x} cy="160" r="70" fill={['#EA580C', '#D97706', '#B45309'][i]} opacity="0.85" />
          <circle cx={x - 40} cy="190" r="50" fill={['#F97316', '#EAB308', '#D97706'][i]} opacity="0.8" />
          <circle cx={x + 40} cy="190" r="50" fill={['#FB923C', '#FBBF24', '#F59E0B'][i]} opacity="0.8" />
        </g>
      ))}
      {/* Falling leaves */}
      {[...Array(20)].map((_, i) => (
        <text key={i} x={(i * 67 + 30) % 960} y="-5" fontSize={10 + (i % 6) * 3} opacity="0.8"
          style={{ animation: `sw-leaf ${3 + (i % 4)}s linear ${i * 0.25}s infinite` }}>
          {['🍂', '🍁'][i % 2]}
        </text>
      ))}
    </g>
  );
}
