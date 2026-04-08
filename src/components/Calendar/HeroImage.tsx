'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSeasonalTheme } from '@/hooks/useSeasonalTheme';

interface HeroImageProps {
  date?: Date;
}

/**
 * Seasonal hero SVG banner that morphs based on current month/festival
 */
export default function HeroImage({ date = new Date() }: HeroImageProps) {
  const { theme, themeConfig } = useSeasonalTheme(date);

  const renderThemeScene = () => {
    switch (theme) {
      case 'diwali':
        return <DiwaliScene colors={themeConfig.particleColors} />;
      case 'holi':
        return <HoliScene colors={themeConfig.particleColors} />;
      case 'monsoon':
        return <MonsoonScene colors={themeConfig.particleColors} />;
      case 'eid':
        return <EidScene colors={themeConfig.particleColors} />;
      case 'summer':
        return <SummerScene colors={themeConfig.particleColors} />;
      case 'winter':
        return <WinterScene colors={themeConfig.particleColors} />;
      case 'spring':
        return <SpringScene colors={themeConfig.particleColors} />;
      case 'autumn':
        return <AutumnScene colors={themeConfig.particleColors} />;
      default:
        return <DefaultScene />;
    }
  };

  return (
    <motion.div
      className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {renderThemeScene()}
      </svg>
    </motion.div>
  );
}

// Diwali Scene: Oil lamps with golden particles
function DiwaliScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="diwaaliGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d1b4e" />
          <stop offset="100%" stopColor="#1a0f2e" />
        </linearGradient>
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-30px) translateX(10px); }
            }
            @keyframes flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            .lamp { animation: flicker 2s ease-in-out infinite; }
            .particle { animation: float 3s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="1200" height="400" fill="url(#diwaaliGradient)" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 1200}
          cy={Math.random() * 200}
          r="1.5"
          fill="#fff"
          opacity={Math.random() * 0.7 + 0.3}
        />
      ))}

      {/* Diyas (oil lamps) */}
      {[200, 400, 600, 800, 1000].map((x, i) => (
        <g key={i} className="lamp">
          {/* Lamp */}
          <ellipse cx={x} cy="280" rx="30" ry="15" fill="#d4af37" />
          <path d={`M ${x - 30} 280 Q ${x - 35} 260 ${x - 20} 240 L ${x + 20} 240 Q ${x + 35} 260 ${x + 30} 280`} fill="#ffd700" />

          {/* Flame */}
          <motion.ellipse
            cx={x}
            cy="220"
            rx="8"
            ry="20"
            fill="#ff8c00"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx={x}
            cy="210"
            rx="5"
            ry="12"
            fill="#ffaa00"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 1200}
          cy="400"
          r="2"
          fill={colors[i % colors.length]}
          opacity="0.8"
          animate={{
            y: -400,
            x: Math.sin(i) * 100,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </g>
  );
}

// Holi Scene: Colored powder clouds
function HoliScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="holiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#fff8f0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#holiGradient)" />

      {/* Flowers */}
      {[200, 500, 800, 1000].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="300" r="3" fill="#2d5016" />
          {[...Array(5)].map((_, j) => {
            const angle = (j * 2 * Math.PI) / 5;
            const px = x + 20 * Math.cos(angle);
            const py = 300 + 20 * Math.sin(angle);
            return <circle key={j} cx={px} cy={py} r="8" fill={colors[(i + j) % colors.length]} />;
          })}
        </g>
      ))}

      {/* Colored powder clouds */}
      {[...Array(25)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 1200}
          cy={200 + Math.random() * 150}
          r={5 + Math.random() * 15}
          fill={colors[i % colors.length]}
          opacity="0.4"
          animate={{
            x: Math.sin(i) * 200,
            y: Math.cos(i) * 150,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </g>
  );
}

// Monsoon Scene: Rain, clouds, green landscape
function MonsoonScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="monsoonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a7c7e" />
          <stop offset="50%" stopColor="#7ba3a3" />
          <stop offset="100%" stopColor="#c1d5cc" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#monsoonGradient)" />

      {/* Hills */}
      <path d="M 0 250 Q 300 150 600 200 T 1200 250 L 1200 400 L 0 400 Z" fill="#2d6a4f" />
      <path d="M 0 300 Q 400 250 800 280 T 1200 300 L 1200 400 L 0 400 Z" fill="#40916c" />

      {/* Clouds */}
      {[100, 400, 700, 1000].map((x, i) => (
        <motion.g
          key={i}
          animate={{ x: Math.sin(i) * 50 }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <ellipse cx={x} cy="100" rx="60" ry="30" fill="#b0c4de" opacity="0.7" />
          <ellipse cx={x + 40} cy="85" rx="50" ry="25" fill="#a9b7cc" opacity="0.7" />
          <ellipse cx={x - 40} cy="90" rx="45" ry="28" fill="#b0c4de" opacity="0.7" />
        </motion.g>
      ))}

      {/* Rain */}
      {[...Array(30)].map((_, i) => (
        <motion.line
          key={i}
          x1={Math.random() * 1200}
          y1="0"
          x2={Math.random() * 1200 + 10}
          y2="400"
          stroke="#4fc3f7"
          strokeWidth="1.5"
          opacity="0.4"
          animate={{ y: 400 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </g>
  );
}

// Eid Scene: Crescent moon, mosque silhouette, stars
function EidScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="eidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a4d" />
          <stop offset="100%" stopColor="#2d5a6d" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#eidGradient)" />

      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 1200}
          cy={Math.random() * 300}
          r={1 + Math.random() * 2}
          fill="#fff"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
        />
      ))}

      {/* Crescent Moon */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="150" cy="80" r="50" fill="url(#eidGradient)" />
        <circle cx="170" cy="80" r="50" fill="url(#eidGradient)" />
        <circle cx="160" cy="75" r="8" fill="#ffd700" opacity="0.8" />
      </motion.g>

      {/* Mosque silhouette */}
      <path d="M 400 250 L 400 150 L 360 150 L 360 200 L 340 200 L 340 150 L 460 150 L 460 200 L 440 200 L 440 150 L 420 150 L 420 250 Z" fill="#1a3a52" />
      <circle cx="410" cy="130" r="15" fill="#2d5a6d" />

      {/* Stars/lights effect around mosque */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / 12;
        const x = 410 + 80 * Math.cos(angle);
        const y = 150 + 80 * Math.sin(angle);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#ffd700"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        );
      })}
    </g>
  );
}

// Summer Scene: Sunrise, warm landscape
function SummerScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <radialGradient id="summerGradient" cx="50%" cy="20%">
          <stop offset="0%" stopColor="#ff9966" />
          <stop offset="50%" stopColor="#ffaa77" />
          <stop offset="100%" stopColor="#fff8dc" />
        </radialGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#summerGradient)" />

      {/* Sun */}
      <motion.circle
        cx="600"
        cy="100"
        r="70"
        fill="#ff6b35"
        animate={{ y: [20, 40, 20] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Rays */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / 8;
        const x1 = 600 + 70 * Math.cos(angle);
        const y1 = 100 + 70 * Math.sin(angle);
        const x2 = 600 + 120 * Math.cos(angle);
        const y2 = 100 + 120 * Math.sin(angle);
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffaa00"
            strokeWidth="3"
            opacity="0.6"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      })}

      {/* Landscape hills */}
      <path d="M 0 250 Q 300 150 600 200 T 1200 250 L 1200 400 L 0 400 Z" fill="#d4a574" />
      <path d="M 0 300 Q 400 250 800 280 T 1200 300 L 1200 400 L 0 400 Z" fill="#b8860b" />

      {/* Birds */}
      {[200, 600, 1000].map((x, i) => (
        <motion.g
          key={i}
          animate={{ x: Math.sin(i) * 100 }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <text x={x} y="80" fontSize="24">
            🐦
          </text>
        </motion.g>
      ))}
    </g>
  );
}

// Winter Scene: Snow, trees, lanterns
function WinterScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="winterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8f4f8" />
          <stop offset="100%" stopColor="#c0e0e0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#winterGradient)" />

      {/* Snow flakes */}
      {[...Array(40)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 1200}
          cy="0"
          r={2 + Math.random() * 4}
          fill="#fff"
          animate={{ y: 400 }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Pine trees */}
      {[200, 400, 800, 1000].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},200 ${x - 40},280 ${x + 40},280`} fill="#1a5f2e" />
          <polygon points={`${x},250 ${x - 50},320 ${x + 50},320`} fill="#1a5f2e" opacity="0.8" />
          <rect x={x - 8} y="320" width="16" height="30" fill="#6b4423" />
        </g>
      ))}

      {/* Lanterns */}
      {[300, 900].map((x, i) => (
        <g key={i}>
          <rect x={x - 15} y="280" width="30" height="40" fill="#dc143c" />
          <motion.circle
            cx={x}
            cy="300"
            r="8"
            fill="#ffaa00"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>
      ))}
    </g>
  );
}

// Spring Scene: Flowers, green landscape
function SpringScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="springGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#90ee90" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#springGradient)" />

      {/* Grass hills */}
      <path d="M 0 300 Q 300 200 600 250 T 1200 300 L 1200 400 L 0 400 Z" fill="#90ee90" />

      {/* Flowers */}
      {[200, 400, 600, 800, 1000].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="350" x2={x} y2="300" stroke="#228b22" strokeWidth="2" />
          {[...Array(5)].map((_, j) => {
            const angle = (j * 2 * Math.PI) / 5;
            const px = x + 15 * Math.cos(angle);
            const py = 300 + 15 * Math.sin(angle);
            return (
              <circle
                key={j}
                cx={px}
                cy={py}
                r="8"
                fill={colors[(i + j) % colors.length]}
              />
            );
          })}
          <circle cx={x} cy="300" r="4" fill="#ffaa00" />
        </g>
      ))}
    </g>
  );
}

// Autumn Scene: Falling leaves, trees
function AutumnScene({ colors }: { colors: string[] }) {
  return (
    <g>
      <defs>
        <linearGradient id="autumnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#fffacd" />
        </linearGradient>
      </defs>

      <rect width="1200" height="400" fill="url(#autumnGradient)" />

      {/* Trees */}
      {[300, 900].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="150" r="60" fill={colors[(i * 2) % colors.length]} opacity="0.8" />
          <circle cx={x - 40} cy="180" r="50" fill={colors[(i * 2 + 1) % colors.length]} opacity="0.8" />
          <circle cx={x + 40} cy="180" r="50" fill={colors[(i * 2) % colors.length]} opacity="0.8" />
          <rect x={x - 10} y="250" width="20" height="80" fill="#8b4513" />
        </g>
      ))}

      {/* Falling leaves */}
      {[...Array(25)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 1200}
          cy="0"
          r={4 + Math.random() * 6}
          fill={colors[i % colors.length]}
          animate={{
            y: 400,
            x: Math.sin(i) * 100,
            rotate: 360,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </g>
  );
}

// Default Scene
function DefaultScene() {
  return (
    <g>
      <rect width="1200" height="400" fill="#f0f0f0" />
      <text x="600" y="200" textAnchor="middle" fontSize="24" fill="#999">
        Calendar View
      </text>
    </g>
  );
}
