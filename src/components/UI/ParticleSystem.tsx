'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ParticleConfig, ParticleEffect } from '@/types';
import { useSettingsStore } from '@/store/settingsStore';

interface ParticleSystemProps {
  config: ParticleConfig;
  isVisible: boolean;
}

/**
 * DOM-based particle effect system for festivals and interactions
 */
export const ParticleSystem = React.forwardRef<HTMLDivElement, ParticleSystemProps>(
  ({ config, isVisible }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { settings } = useSettingsStore();

    // Don't render particles if animations are disabled
    if (!settings.animationsEnabled) return null;

    // Generate particles based on effect type
    const generateParticles = (effect: ParticleEffect, count: number = 20) => {
      const particles = [];

      switch (effect) {
        case 'sparkle': {
          for (let i = 0; i < count; i++) {
            particles.push({
              id: i,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              delay: Math.random() * 0.3,
              duration: 0.8 + Math.random() * 0.4,
              size: 2 + Math.random() * 4,
              color: config.color || '#FFD700',
              emoji: '✨',
            });
          }
          break;
        }

        case 'powder': {
          for (let i = 0; i < count; i++) {
            particles.push({
              id: i,
              x: (Math.random() - 0.5) * 150,
              y: (Math.random() - 0.5) * 150,
              delay: Math.random() * 0.5,
              duration: 1.2 + Math.random() * 0.6,
              size: 8 + Math.random() * 12,
              color: ['#FF6B9D', '#FFD700', '#00D4FF', '#FF4444', '#00FF88'][
                Math.floor(Math.random() * 5)
              ],
              emoji: '💨',
            });
          }
          break;
        }

        case 'petal': {
          for (let i = 0; i < count; i++) {
            particles.push({
              id: i,
              x: (Math.random() - 0.5) * 120,
              y: (Math.random() - 0.5) * 120,
              delay: Math.random() * 0.4,
              duration: 1.0 + Math.random() * 0.5,
              size: 6 + Math.random() * 10,
              color: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493'][
                Math.floor(Math.random() * 4)
              ],
              emoji: '🌸',
            });
          }
          break;
        }

        case 'confetti': {
          for (let i = 0; i < count; i++) {
            particles.push({
              id: i,
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              delay: Math.random() * 0.2,
              duration: 1.5 + Math.random() * 0.8,
              size: 4 + Math.random() * 8,
              color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][
                Math.floor(Math.random() * 5)
              ],
              emoji: '🎉',
            });
          }
          break;
        }

        case 'snow': {
          for (let i = 0; i < count; i++) {
            particles.push({
              id: i,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              delay: Math.random() * 0.3,
              duration: 1.8 + Math.random() * 1.0,
              size: 3 + Math.random() * 6,
              color: '#FFFFFF',
              emoji: '❄️',
            });
          }
          break;
        }

        default:
          break;
      }

      return particles;
    };

    const particles = generateParticles(config.effect, config.count || 20);

    return (
      <div
        ref={ref || containerRef}
        className="absolute pointer-events-none overflow-visible"
        style={{
          left: `${config.position.x}px`,
          top: `${config.position.y}px`,
          width: '200px',
          height: '200px',
          marginLeft: '-100px',
          marginTop: '-100px',
        }}
      >
        {isVisible &&
          particles.map((particle) => (
            <Particle
              key={particle.id}
              particle={particle}
              duration={config.duration}
            />
          ))}
      </div>
    );
  }
);

ParticleSystem.displayName = 'ParticleSystem';

// Individual particle component
function Particle({
  particle,
  duration,
}: {
  particle: any;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute text-center"
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        x: particle.x,
        y: particle.y,
        opacity: 0,
        scale: 0.3,
        rotate: 360,
      }}
      transition={{
        duration: particle.duration || duration,
        delay: particle.delay,
        ease: 'easeOut',
      }}
      style={{
        fontSize: `${particle.size}px`,
        color: particle.color,
      }}
    >
      {particle.emoji}
    </motion.div>
  );
}

/**
 * Confetti effect - multiple bursts from screen corners
 */
export function ConfettiEffect() {
  const { settings } = useSettingsStore();

  if (!settings.animationsEnabled) return null;

  return (
    <>
      {/* Top-left */}
      <ParticleSystem
        config={{
          effect: 'confetti',
          duration: 2,
          position: { x: 0, y: 0 },
          count: 15,
        }}
        isVisible={true}
      />

      {/* Top-right */}
      <ParticleSystem
        config={{
          effect: 'confetti',
          duration: 2,
          position: { x: window.innerWidth, y: 0 },
          count: 15,
        }}
        isVisible={true}
      />

      {/* Center */}
      <ParticleSystem
        config={{
          effect: 'confetti',
          duration: 2,
          position: { x: window.innerWidth / 2, y: window.innerHeight / 4 },
          count: 20,
        }}
        isVisible={true}
      />
    </>
  );
}
