import { useMemo } from 'react';
import { SeasonalTheme } from '@/types';

interface ThemeConfig {
  theme: SeasonalTheme;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  particleColors: string[];
}

/**
 * Hook for automatic seasonal theme detection and morphing
 */
export function useSeasonalTheme(date: Date = new Date()) {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  const theme: SeasonalTheme = useMemo(() => {
    // January-February: Winter
    if (month === 0 || month === 1) {
      return 'winter';
    }
    // February-March: Holi approaching
    if ((month === 1 && day >= 15) || (month === 2 && day <= 31)) {
      return 'holi';
    }
    // March-April: Spring
    if (month === 2 || month === 3) {
      return 'spring';
    }
    // April-June: Summer
    if (month >= 3 && month <= 5) {
      return 'summer';
    }
    // June-September: Monsoon
    if (month >= 5 && month <= 8) {
      return 'monsoon';
    }
    // September-October: Pre-Diwali
    if (month === 8 || (month === 9 && day < 20)) {
      return 'autumn';
    }
    // October-November: Diwali approaching
    if ((month === 9 && day >= 20) || month === 10) {
      return 'diwali';
    }
    // November-December: Winter approaching
    return 'winter';
  }, [month, day]);

  const themeConfig: ThemeConfig = useMemo(() => {
    const configs: Record<SeasonalTheme, ThemeConfig> = {
      winter: {
        theme: 'winter',
        primaryColor: '#1a3a5c', // Deep navy
        secondaryColor: '#e8f4f8', // Icy light blue
        accentColor: '#4fc3f7', // Sky blue
        backgroundColor: '#0f2438',
        textColor: '#ffffff',
        borderColor: '#4fc3f7',
        particleColors: ['#ffffff', '#e8f4f8', '#4fc3f7'],
      },
      holi: {
        theme: 'holi',
        primaryColor: '#ff6b9d', // Hot pink
        secondaryColor: '#ffd700', // Gold
        accentColor: '#ff1493', // Deep pink
        backgroundColor: '#fff8f0',
        textColor: '#2d2d2d',
        borderColor: '#ff6b9d',
        particleColors: ['#ff6b9d', '#ffd700', '#00d4ff', '#ff4444', '#00ff88'],
      },
      spring: {
        theme: 'spring',
        primaryColor: '#90ee90', // Light green
        secondaryColor: '#dda15e', // Tan
        accentColor: '#bc6c25', // Brown
        backgroundColor: '#fffbf0',
        textColor: '#2d2d2d',
        borderColor: '#90ee90',
        particleColors: ['#ff69b4', '#90ee90', '#ffd700', '#87ceeb'],
      },
      summer: {
        theme: 'summer',
        primaryColor: '#ff9933', // Amber
        secondaryColor: '#d4a574', // Sand
        accentColor: '#ff6b35', // Rust
        backgroundColor: '#fff8dc',
        textColor: '#2d2d2d',
        borderColor: '#ff9933',
        particleColors: ['#ffd700', '#ff9933', '#ff6b35', '#ffb347'],
      },
      monsoon: {
        theme: 'monsoon',
        primaryColor: '#2d6a4f', // Dark green
        secondaryColor: '#74c0fc', // Rain blue
        accentColor: '#52b788', // Leaf green
        backgroundColor: '#e3f2fd',
        textColor: '#1a1a1a',
        borderColor: '#74c0fc',
        particleColors: ['#74c0fc', '#52b788', '#2d6a4f', '#1abc9c'],
      },
      diwali: {
        theme: 'diwali',
        primaryColor: '#ff6b35', // Deep saffron
        secondaryColor: '#ffd700', // Gold
        accentColor: '#c41e3a', // Crimson
        backgroundColor: '#fff3e0',
        textColor: '#2d2d2d',
        borderColor: '#ffd700',
        particleColors: ['#ffd700', '#ff6b35', '#ffaa00', '#ff4444'],
      },
      autumn: {
        theme: 'autumn',
        primaryColor: '#d4732f', // Burnt orange
        secondaryColor: '#8b4513', // Saddle brown
        accentColor: '#ff8c00', // Dark orange
        backgroundColor: '#fffacd',
        textColor: '#2d2d2d',
        borderColor: '#d4732f',
        particleColors: ['#ff8c00', '#d4732f', '#8b4513', '#ff6347'],
      },
      eid: {
        theme: 'eid',
        primaryColor: '#2e8b57', // Sea green
        secondaryColor: '#228b22', // Forest green
        accentColor: '#20b2aa', // Light sea green
        backgroundColor: '#f0fff0',
        textColor: '#1a1a1a',
        borderColor: '#2e8b57',
        particleColors: ['#ff69b4', '#ffd700', '#20b2aa', '#228b22'],
      },
    };

    return configs[theme];
  }, [theme]);

  /**
   * Get CSS variables for theme
   */
  const cssVariables = useMemo(
    () => ({
      '--primary-color': themeConfig.primaryColor,
      '--secondary-color': themeConfig.secondaryColor,
      '--accent-color': themeConfig.accentColor,
      '--bg-color': themeConfig.backgroundColor,
      '--text-color': themeConfig.textColor,
      '--border-color': themeConfig.borderColor,
    }),
    [themeConfig]
  );

  return {
    theme,
    themeConfig,
    cssVariables,
  };
}
