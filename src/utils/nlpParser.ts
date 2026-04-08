import { NLPResult } from '@/types';

// ─── Natural Language Event Parser ───────────────────────────────────────────
// Pure regex and keyword matching — zero external NLP library.

const WEEKDAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'];

function getNextWeekday(targetDay: number, from: Date = new Date()): Date {
  const result = new Date(from);
  const dayOfWeek = result.getDay();
  const diff = (targetDay - dayOfWeek + 7) % 7 || 7;
  result.setDate(result.getDate() + diff);
  return result;
}

function parseTime(timeStr: string): string | null {
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const meridiem = match[3]?.toLowerCase();
  if (meridiem === 'pm' && hours < 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function normalizeInput(input: string): string {
  return input.toLowerCase().trim();
}

/**
 * Parse a natural language string into a structured NLPResult.
 * Handles expressions like:
 * - "Team meeting next Monday at 3pm"
 * - "Doctor appointment on the 15th"
 * - "Conference from March 20 to March 25"
 * - "Mom's birthday tomorrow"
 * - "Standup every weekday"
 */
export function parseNLP(input: string): NLPResult {
  const text = normalizeInput(input);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate: Date | null = null;
  let endDate: Date | null = null;
  let startTime: string | null = null;
  let isRecurring = false;
  let recurrenceRule: string | undefined;
  let confidence = 0.5;

  // ── Time extraction ─────────────────────────────────────────────────────
  const timeMatch = text.match(/\bat\s(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
  if (timeMatch) {
    startTime = parseTime(timeMatch[1]);
  }

  // ── Tomorrow ──────────────────────────────────────────────────────────
  if (/\btomorrow\b/.test(text)) {
    startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);
    confidence = 0.9;
  }

  // ── Today ─────────────────────────────────────────────────────────────
  else if (/\btoday\b/.test(text)) {
    startDate = new Date(today);
    confidence = 0.95;
  }

  // ── Next [weekday] ────────────────────────────────────────────────────
  else if (/\bnext\s+(\w+)\b/.test(text)) {
    const match = text.match(/\bnext\s+(\w+)/);
    if (match) {
      const dayIdx = WEEKDAY_NAMES.indexOf(match[1]);
      if (dayIdx !== -1) {
        startDate = getNextWeekday(dayIdx, today);
        confidence = 0.85;
      }
    }
  }

  // ── "on the Nth" ──────────────────────────────────────────────────────
  else if (/\bon\s+the\s+(\d{1,2})(?:st|nd|rd|th)?\b/.test(text)) {
    const match = text.match(/\bon\s+the\s+(\d{1,2})/);
    if (match) {
      const dayNum = parseInt(match[1]);
      startDate = new Date(today.getFullYear(), today.getMonth(), dayNum);
      if (startDate < today) startDate.setMonth(startDate.getMonth() + 1);
      confidence = 0.8;
    }
  }

  // ── From [Month Day] to [Month Day] ──────────────────────────────────
  else if (/\bfrom\s+(\w+\s+\d{1,2})\s+to\s+(\w+\s+\d{1,2})/.test(text)) {
    const match = text.match(/\bfrom\s+(\w+)\s+(\d{1,2})\s+to\s+(\w+)\s+(\d{1,2})/);
    if (match) {
      const startMonth = MONTH_NAMES.indexOf(match[1]);
      const endMonth = MONTH_NAMES.indexOf(match[3]);
      if (startMonth !== -1) {
        startDate = new Date(today.getFullYear(), startMonth, parseInt(match[2]));
        endDate = new Date(today.getFullYear(), endMonth !== -1 ? endMonth : startMonth, parseInt(match[4]));
        confidence = 0.9;
      }
    }
  }

  // ── On [Month Day] ────────────────────────────────────────────────────
  else {
    for (const monthName of MONTH_NAMES) {
      const regex = new RegExp(`\\b${monthName}\\s+(\\d{1,2})\\b`);
      const match = text.match(regex);
      if (match) {
        const monthIdx = MONTH_NAMES.indexOf(monthName);
        startDate = new Date(today.getFullYear(), monthIdx, parseInt(match[1]));
        confidence = 0.75;
        break;
      }
    }
  }

  // ── Recurring: every weekday ──────────────────────────────────────────
  if (/\bevery\s+weekday\b/.test(text)) {
    isRecurring = true;
    recurrenceRule = 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR';
    if (!startDate) startDate = new Date(today);
    confidence = 0.8;
  } else if (/\bevery\s+(\w+)\b/.test(text)) {
    const match = text.match(/\bevery\s+(\w+)/);
    if (match) {
      const dayIdx = WEEKDAY_NAMES.indexOf(match[1]);
      if (dayIdx !== -1) {
        isRecurring = true;
        const dayAbbr = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][dayIdx];
        recurrenceRule = `FREQ=WEEKLY;BYDAY=${dayAbbr}`;
        if (!startDate) startDate = getNextWeekday(dayIdx, today);
        confidence = 0.8;
      }
    }
  }

  // ── Extract title (remove date/time expressions) ──────────────────────
  let title = input
    .replace(/\b(next|every)\s+\w+/gi, '')
    .replace(/\bon\s+the\s+\d{1,2}(?:st|nd|rd|th)?\b/gi, '')
    .replace(/\b(from|to)\s+\w+\s+\d{1,2}/gi, '')
    .replace(/\b(tomorrow|today)\b/gi, '')
    .replace(/\bat\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!title) title = input.trim();

  return { title, startDate, endDate, startTime, isRecurring, recurrenceRule, confidence };
}

/**
 * Format an NLPResult preview string for display below the input.
 */
export function formatNLPPreview(result: NLPResult): string {
  if (!result.startDate) return '';
  const opts: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  let preview = `→ ${result.startDate.toLocaleDateString('en-US', opts)}`;
  if (result.startTime) preview += ` at ${result.startTime}`;
  if (result.endDate) {
    preview += ` – ${result.endDate.toLocaleDateString('en-US', opts)}`;
  }
  if (result.isRecurring) preview += ' (Recurring)';
  return preview;
}
