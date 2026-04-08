// ─── Core Enum-like Types ────────────────────────────────────────────────────
export type HolidayCategory = 'festival' | 'national' | 'religious' | 'cultural' | 'astronomical';
export type ParticleEffect = 'diwali' | 'holi' | 'newyear' | 'christmas' | 'eid' | 'snow' | 'confetti' | 'none';
export type SeasonalTheme = 'diwali' | 'holi' | 'monsoon' | 'eid' | 'summer' | 'winter' | 'spring' | 'autumn' | 'default';
export type CalendarType = 'gregorian' | 'panchang' | 'hijri' | 'lunar';
export type WeekStartDay = 'sunday' | 'monday';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type NoteColor = 'yellow' | 'pink' | 'green' | 'blue' | 'purple';
export type BadgeId =
  | 'festival_scholar' | 'event_planner' | 'note_taker'
  | 'time_traveler' | 'voice_pioneer' | 'art_director';

// ─── Holidays ────────────────────────────────────────────────────────────────
export interface BadgeStyle {
  bgColor: string;
  textColor: string;
  borderColor?: string;
  icon?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;       // YYYY-MM-DD
  endDate?: string;
  duration: number;
  category: HolidayCategory;
  regions: string[];
  icon: string;
  color: string;
  description: string;
  particleEffect: ParticleEffect;
}

// ─── Events ──────────────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  category: 'work' | 'personal' | 'holiday' | 'birthday' | 'anniversary';
  color?: string;
  tags?: string[];
  isRecurring?: boolean;
  recurrenceRule?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Notes ───────────────────────────────────────────────────────────────────
export interface BoardPosition {
  x: number;
  y: number;
  rotate: number;
}

export interface StickyNote {
  id: string;
  date: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  tags: string[];
  position?: BoardPosition;
  createdAt: string;
  updatedAt: string;
}

export interface VoiceNote {
  id: string;
  transcript: string;
  duration: number;
  createdAt: string;
}

// ─── Range Selection ─────────────────────────────────────────────────────────
export interface DateRange {
  start: Date;
  end: Date;
  id: string;
  color?: string;  // for multi-range (Ctrl+click)
}

export interface RangeSelectionState {
  isDragging: boolean;
  anchorDate: Date | null;
  hoverDate: Date | null;
  ranges: DateRange[];
}

export interface RangeSummary {
  totalDays: number;
  weekdays: number;
  weekends: number;
  holidays: Holiday[];
}

// ─── Moon Phase ──────────────────────────────────────────────────────────────
export interface MoonPhase {
  phase: number;   // 0-7
  emoji: string;
  name: string;
  illumination: number;  // 0-100
}

// ─── Weather ─────────────────────────────────────────────────────────────────
export interface WeatherDay {
  date: Date;
  dayNumber: number;
  icon: string;
  tempC: number;
  condition: string;
}

// ─── Settings ────────────────────────────────────────────────────────────────
export interface UserSettings {
  theme: SeasonalTheme | 'auto';
  language: string;
  weekStartDay: WeekStartDay;
  timeFormat: '12h' | '24h';
  animationsEnabled: boolean;
  highContrast: boolean;
  colorBlindMode: ColorBlindMode;
  showMoonPhase: boolean;
  showWeather: boolean;
  showCountdown: boolean;
  lastVisitedMonth: string;  // YYYY-MM
  uploadedHeroImage?: string;  // base64
  accentColor?: string;
}

// ─── Gamification ────────────────────────────────────────────────────────────
export interface Achievement {
  id: BadgeId;
  title: string;
  description: string;
  icon: string;
  target: number;
  progress: number;
  unlockedAt?: string;
}

export interface BingoCell {
  id: string;
  name: string;
  icon: string;
  marked: boolean;
}

// ─── NLP ─────────────────────────────────────────────────────────────────────
export interface NLPResult {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string | null;
  isRecurring: boolean;
  recurrenceRule?: string;
  confidence: number;
}

// ─── Command Palette ─────────────────────────────────────────────────────────
export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
  keywords: string[];
}

// ─── Context Menu ────────────────────────────────────────────────────────────
export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

// ─── Undo/Redo ───────────────────────────────────────────────────────────────
export interface UndoRedoCommand {
  id: string;
  description: string;
  timestamp: number;
  undo: () => void;
  redo: () => void;
}

export interface UndoRedoState {
  action: string;
  timestamp: number;
  data: unknown;
}

// ─── Export ──────────────────────────────────────────────────────────────────
export interface ExportOptions {
  format: 'ics' | 'csv' | 'png' | 'pdf';
  startDate?: string;
  endDate?: string;
  includeNotes?: boolean;
  includeEvents?: boolean;
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export interface CalendarStats {
  totalEvents: number;
  totalNotes: number;
  achievements: Achievement[];
  eventsPerMonth: Record<string, number>;
}
