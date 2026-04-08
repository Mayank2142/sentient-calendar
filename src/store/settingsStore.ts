import { create } from 'zustand';
import { UserSettings } from '@/types';

// ─── Settings Store ───────────────────────────────────────────────────────────

interface SettingsStoreState {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  toggleHighContrast: () => void;
  toggleAnimations: () => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'auto',
  language: 'en',
  weekStartDay: 'sunday',
  timeFormat: '12h',
  animationsEnabled: true,
  highContrast: false,
  colorBlindMode: 'none',
  showMoonPhase: true,
  showWeather: true,
  showCountdown: true,
  lastVisitedMonth: new Date().toISOString().slice(0, 7),
};

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  settings: DEFAULT_SETTINGS,

  updateSettings: (updates) => {
    set((s) => ({ settings: { ...s.settings, ...updates } }));
  },

  toggleHighContrast: () => {
    set((s) => ({ settings: { ...s.settings, highContrast: !s.settings.highContrast } }));
  },

  toggleAnimations: () => {
    set((s) => ({ settings: { ...s.settings, animationsEnabled: !s.settings.animationsEnabled } }));
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS });
  },
}));
