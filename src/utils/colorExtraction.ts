/**
 * Canvas-based dominant color extraction.
 * Draws an image onto a hidden canvas, samples pixels in a grid pattern,
 * and returns the most dominant color as a hex string.
 */

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function colorDistance(c1: [number, number, number], c2: [number, number, number]): number {
  return Math.sqrt(
    Math.pow(c1[0] - c2[0], 2) +
    Math.pow(c1[1] - c2[1], 2) +
    Math.pow(c1[2] - c2[2], 2)
  );
}

function quantizeColor(r: number, g: number, b: number, step = 32): [number, number, number] {
  return [
    Math.round(r / step) * step,
    Math.round(g / step) * step,
    Math.round(b / step) * step,
  ];
}

/**
 * Extract the dominant accent color from an HTMLImageElement.
 * Uses pixel sampling and basic color quantization.
 *
 * @param img - The loaded HTMLImageElement
 * @param sampleSize - Number of pixels to sample (lower = faster)
 * @returns Dominant color as a hex string, e.g. '#1a56db'
 */
export function extractDominantColor(img: HTMLImageElement, sampleSize = 80): string {
  const canvas = document.createElement('canvas');
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '#1a56db';

  ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);

  const colorMap: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue; // skip transparent pixels

    // Skip near-white, near-black, and near-gray pixels
    const brightness = (r + g + b) / 3;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    if (brightness > 220 || brightness < 30 || saturation < 40) continue;

    const [qr, qg, qb] = quantizeColor(r, g, b);
    const key = `${qr},${qg},${qb}`;
    colorMap[key] = (colorMap[key] ?? 0) + 1;
  }

  let dominantKey = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!dominantKey) return '#1a56db';

  const [dr, dg, db] = dominantKey.split(',').map(Number);
  return rgbToHex(dr, dg, db);
}

/**
 * Apply an accent color to CSS custom properties on :root.
 * Generates lighter/darker variants automatically.
 */
export function applyAccentColor(hexColor: string): void {
  const root = document.documentElement;
  root.style.setProperty('--accent-color', hexColor);

  // Generate a lighter tint for range bands
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const tint = `rgba(${r}, ${g}, ${b}, 0.15)`;
  const mid = `rgba(${r}, ${g}, ${b}, 0.4)`;
  root.style.setProperty('--accent-tint', tint);
  root.style.setProperty('--accent-mid', mid);
}
