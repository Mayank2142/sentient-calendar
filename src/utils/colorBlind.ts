/**
 * Color-blind mode utilities and filters
 * Supports Protanopia, Deuteranopia, and Tritanopia
 */

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

/**
 * Get CSS filter for color-blind mode
 */
export function getColorBlindFilter(mode: ColorBlindMode): string {
  switch (mode) {
    case 'protanopia':
      // Red-blind: simulate by adjusting RGB channels
      return `url(#protanopia-filter)`;
    case 'deuteranopia':
      // Green-blind
      return `url(#deuteranopia-filter)`;
    case 'tritanopia':
      // Blue-yellow blind
      return `url(#tritanopia-filter)`;
    default:
      return 'none';
  }
}

/**
 * Get SVG filter definitions for color blindness simulation
 */
export function getColorBlindSVGFilters(): string {
  return `
    <svg style="display: none;">
      <defs>
        <!-- Protanopia (Red-blind) Filter -->
        <filter id="protanopia-filter">
          <feColorMatrix type="matrix" values="
            0.567 0.433 0.000 0 0
            0.558 0.442 0.000 0 0
            0.000 0.242 0.758 0 0
            0.000 0.000 0.000 1 0
          "/>
        </filter>

        <!-- Deuteranopia (Green-blind) Filter -->
        <filter id="deuteranopia-filter">
          <feColorMatrix type="matrix" values="
            0.625 0.375 0.000 0 0
            0.700 0.300 0.000 0 0
            0.000 0.300 0.700 0 0
            0.000 0.000 0.000 1 0
          "/>
        </filter>

        <!-- Tritanopia (Blue-yellow blind) Filter -->
        <filter id="tritanopia-filter">
          <feColorMatrix type="matrix" values="
            0.950 0.050 0.000 0 0
            0.000 0.433 0.567 0 0
            0.000 0.475 0.525 0 0
            0.000 0.000 0.000 1 0
          "/>
        </filter>
      </defs>
    </svg>
  `;
}

/**
 * Get accessible color palette for color-blind mode
 */
export function getAccessibleColors(mode: ColorBlindMode): Record<string, string> {
  const baseColors = {
    none: {
      primary: '#0066CC',
      secondary: '#FF6B35',
      success: '#2E8B57',
      warning: '#FF9933',
      danger: '#C41E3A',
      info: '#4169E1',
      neutral: '#666666',
    },
    protanopia: {
      // Red-blind friendly
      primary: '#0066CC',
      secondary: '#1B9CFC',
      success: '#2E8B57',
      warning: '#FFB347',
      danger: '#5D4E37',
      info: '#4169E1',
      neutral: '#666666',
    },
    deuteranopia: {
      // Green-blind friendly
      primary: '#0066CC',
      secondary: '#FF6B35',
      success: '#1F77B4',
      warning: '#FF9933',
      danger: '#D62728',
      info: '#4169E1',
      neutral: '#666666',
    },
    tritanopia: {
      // Blue-yellow blind friendly
      primary: '#EE7733',
      secondary: '#0077BB',
      success: '#33BBEE',
      warning: '#EE3377',
      danger: '#CC3311',
      info: '#009988',
      neutral: '#666666',
    },
  };

  return baseColors[mode] || baseColors.none;
}

/**
 * Pattern fill options for data visualization
 * Used as fallback when colors alone are insufficient
 */
export const PATTERN_FILLS = {
  pattern1: 'url(#diagonal-hatch)',
  pattern2: 'url(#cross-hatch)',
  pattern3: 'url(#dots)',
  pattern4: 'url(#stripes)',
  pattern5: 'url(#grid)',
};

/**
 * Get SVG pattern definitions
 */
export function getPatternDefinitions(): string {
  return `
    <svg style="display: none;">
      <defs>
        <!-- Diagonal Hatch Pattern -->
        <pattern id="diagonal-hatch" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#333" stroke-width="0.5"/>
        </pattern>

        <!-- Cross Hatch Pattern -->
        <pattern id="cross-hatch" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#333" stroke-width="0.5"/>
          <path d="M0,0 l0,4 M4,0 l0,4" stroke="#333" stroke-width="0.5"/>
        </pattern>

        <!-- Dots Pattern -->
        <pattern id="dots" patternUnits="userSpaceOnUse" width="4" height="4">
          <circle cx="2" cy="2" r="1" fill="#333"/>
        </pattern>

        <!-- Stripes Pattern -->
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="2" height="2">
          <line x1="0" y1="0" x2="0" y2="2" stroke="#333" stroke-width="1"/>
        </pattern>

        <!-- Grid Pattern -->
        <pattern id="grid" patternUnits="userSpaceOnUse" width="4" height="4">
          <line x1="0" y1="0" x2="4" y2="0" stroke="#333" stroke-width="0.5"/>
          <line x1="0" y1="0" x2="0" y2="4" stroke="#333" stroke-width="0.5"/>
        </pattern>
      </defs>
    </svg>
  `;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Apply color-blind simulation matrix to RGB values
 */
export function applyColorBlindMatrix(
  rgb: { r: number; g: number; b: number },
  mode: ColorBlindMode
): { r: number; g: number; b: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  let newR, newG, newB;

  switch (mode) {
    case 'protanopia':
      newR = 0.567 * r + 0.433 * g + 0 * b;
      newG = 0.558 * r + 0.442 * g + 0 * b;
      newB = 0 * r + 0.242 * g + 0.758 * b;
      break;

    case 'deuteranopia':
      newR = 0.625 * r + 0.375 * g + 0 * b;
      newG = 0.7 * r + 0.3 * g + 0 * b;
      newB = 0 * r + 0.3 * g + 0.7 * b;
      break;

    case 'tritanopia':
      newR = 0.95 * r + 0.05 * g + 0 * b;
      newG = 0 * r + 0.433 * g + 0.567 * b;
      newB = 0 * r + 0.475 * g + 0.525 * b;
      break;

    default:
      return rgb;
  }

  return {
    r: Math.round(Math.max(0, Math.min(255, newR * 255))),
    g: Math.round(Math.max(0, Math.min(255, newG * 255))),
    b: Math.round(Math.max(0, Math.min(255, newB * 255))),
  };
}

/**
 * Get description for color-blind mode
 */
export function getColorBlindModeDescription(mode: ColorBlindMode): string {
  const descriptions = {
    none: 'Standard colors',
    protanopia: 'Red-blind (1% of males)',
    deuteranopia: 'Green-blind (1% of males)',
    tritanopia: 'Blue-yellow blind (<0.001%)',
  };

  return descriptions[mode] || 'Unknown';
}

/**
 * Get contrast ratio between two colors
 * Used to ensure accessibility compliance (WCAG AA requires 4.5:1)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const luminance1 = getRelativeLuminance(rgb1);
  const luminance2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate relative luminance (for WCAG contrast calculations)
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  let [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
