'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useCalendarStore } from '@/store/calendarStore';
import { useNotesStore } from '@/store/notesStore';
import { localStorage_Wrapper } from '@/utils/persistence';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/utils/animations';

interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  showWeekends: boolean;
  weekStart: 'sunday' | 'monday';
  timeFormat: '12h' | '24h';
  defaultCategory: string;
  notifications: boolean;
  soundEnabled: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  autoSave: boolean;
  language: 'en' | 'es' | 'fr' | 'de';
}

const defaultPreferences: Preferences = {
  theme: 'auto',
  showWeekends: true,
  weekStart: 'sunday',
  timeFormat: '24h',
  defaultCategory: 'personal',
  notifications: true,
  soundEnabled: true,
  colorBlindMode: 'none',
  autoSave: true,
  language: 'en',
};

interface PreferencesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesPanel({ isOpen, onClose }: PreferencesPanelProps) {
  const { theme, setTheme } = useTheme();
  const { events } = useCalendarStore();
  const { notes } = useNotesStore();

  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage_Wrapper.getItem<Preferences>('preferences');
    return saved || defaultPreferences;
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'display' | 'behavior' | 'data'>('display');

  const handlePreferenceChange = useCallback(
    <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
      setHasChanges(true);
    },
    []
  );

  const handleSave = () => {
    localStorage_Wrapper.setItem('preferences', preferences);
    setHasChanges(false);
    // Trigger theme update if theme changed
    if (preferences.theme !== theme) {
      setTheme(preferences.theme);
    }
  };

  const handleReset = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  const handleExportData = () => {
    const data = {
      events,
      notes,
      preferences,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calendar-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (
      confirm(
        'Are you sure? This will delete all calendar events and notes. This action cannot be undone.'
      )
    ) {
      localStorage_Wrapper.clear();
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Preferences</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl"
            aria-label="Close preferences"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {['display', 'behavior', 'data'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="p-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Display Tab */}
          {activeTab === 'display' && (
            <>
              <PreferenceSetting
                label="Theme"
                description="Choose your preferred color scheme"
              >
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    handlePreferenceChange(
                      'theme',
                      e.target.value as 'light' | 'dark' | 'auto'
                    )
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </PreferenceSetting>

              <PreferenceSetting
                label="Week Start"
                description="Choose which day your week starts on"
              >
                <select
                  value={preferences.weekStart}
                  onChange={(e) =>
                    handlePreferenceChange('weekStart', e.target.value as 'sunday' | 'monday')
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </select>
              </PreferenceSetting>

              <PreferenceSetting
                label="Time Format"
                description="Choose 12-hour or 24-hour format"
              >
                <select
                  value={preferences.timeFormat}
                  onChange={(e) =>
                    handlePreferenceChange('timeFormat', e.target.value as '12h' | '24h')
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
              </PreferenceSetting>

              <PreferenceSetting
                label="Color-blind Mode"
                description="Optimize colors for color-blind vision"
              >
                <select
                  value={preferences.colorBlindMode}
                  onChange={(e) =>
                    handlePreferenceChange(
                      'colorBlindMode',
                      e.target.value as any
                    )
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Red-blind (Protanopia)</option>
                  <option value="deuteranopia">Green-blind (Deuteranopia)</option>
                  <option value="tritanopia">Blue-yellow blind (Tritanopia)</option>
                </select>
              </PreferenceSetting>

              <PreferenceSetting
                label="Show Weekends"
                description="Display Saturday and Sunday in calendar view"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.showWeekends}
                    onChange={(e) => handlePreferenceChange('showWeekends', e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                  <span className="text-foreground">Show weekends</span>
                </label>
              </PreferenceSetting>
            </>
          )}

          {/* Behavior Tab */}
          {activeTab === 'behavior' && (
            <>
              <PreferenceSetting
                label="Default Category"
                description="Category for new events"
              >
                <select
                  value={preferences.defaultCategory}
                  onChange={(e) => handlePreferenceChange('defaultCategory', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="holiday">Holiday</option>
                </select>
              </PreferenceSetting>

              <PreferenceSetting
                label="Notifications"
                description="Receive event reminders"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                  <span className="text-foreground">Enable notifications</span>
                </label>
              </PreferenceSetting>

              <PreferenceSetting
                label="Sound Effects"
                description="Play sounds for interactions"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.soundEnabled}
                    onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                  <span className="text-foreground">Enable sound effects</span>
                </label>
              </PreferenceSetting>

              <PreferenceSetting
                label="Auto-save"
                description="Automatically save changes"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.autoSave}
                    onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                  <span className="text-foreground">Auto-save enabled</span>
                </label>
              </PreferenceSetting>
            </>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <motion.div className="space-y-4" variants={containerVariants}>
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Storage:</strong> {events.length} events and {notes.length} notes
                </p>
              </div>

              <Button
                onClick={handleExportData}
                className="w-full"
                variant="outline"
              >
                Export All Data
              </Button>

              <Button
                onClick={handleClearData}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Clear All Data
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-border p-6 flex gap-4 justify-end">
          {activeTab !== 'data' && (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
              >
                Reset to Default
              </Button>

              <Button
                onClick={handleSave}
                disabled={!hasChanges}
              >
                Save Changes
              </Button>
            </>
          )}

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface PreferenceSettingProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

function PreferenceSetting({ label, description, children }: PreferenceSettingProps) {
  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">{label}</label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
