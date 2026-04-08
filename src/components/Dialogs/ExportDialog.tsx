'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/calendarStore';
import { useNotesStore } from '@/store/notesStore';
import {
  exportToICS,
  exportToCSV,
  exportToJSON,
  downloadFile,
  exportToPNG,
} from '@/utils/export';
import { Button } from '@/components/ui/button';
import { fadeInUpVariants } from '@/utils/animations';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const { events } = useCalendarStore();
  const { notes } = useNotesStore();
  const [selectedFormat, setSelectedFormat] = useState<'ics' | 'csv' | 'json' | 'png'>('ics');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus(null);

    try {
      const timestamp = new Date().toISOString().slice(0, 10);

      switch (selectedFormat) {
        case 'ics': {
          const icsContent = exportToICS(events);
          downloadFile(icsContent, `calendar-${timestamp}.ics`, 'text/calendar');
          setExportStatus('Calendar exported to iCalendar format');
          break;
        }

        case 'csv': {
          const csvContent = exportToCSV(events, notes);
          downloadFile(csvContent, `calendar-${timestamp}.csv`, 'text/csv');
          setExportStatus('Calendar exported to CSV format');
          break;
        }

        case 'json': {
          const jsonContent = exportToJSON(events, notes, {});
          downloadFile(jsonContent, `calendar-${timestamp}.json`, 'application/json');
          setExportStatus('Calendar exported to JSON format');
          break;
        }

        case 'png': {
          const calendarElement = document.getElementById('calendar-view');
          if (calendarElement) {
            await exportToPNG(calendarElement, `calendar-${timestamp}.png`);
            setExportStatus('Calendar exported as PNG image');
          }
          break;
        }
      }

      setTimeout(() => {
        onClose();
        setExportStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        variants={fadeInUpVariants}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Export Calendar</h2>

        {/* Format Selection */}
        <div className="space-y-4 mb-8">
          <p className="text-sm text-muted-foreground font-semibold">Select Format:</p>

          {[
            {
              id: 'ics',
              label: 'iCalendar (.ics)',
              description: 'Import into Apple Calendar, Google Calendar, Outlook',
              icon: '📅',
            },
            {
              id: 'csv',
              label: 'CSV Spreadsheet',
              description: 'Open in Excel, Google Sheets, Numbers',
              icon: '📊',
            },
            {
              id: 'json',
              label: 'JSON Backup',
              description: 'Complete data backup for restoration',
              icon: '💾',
            },
            {
              id: 'png',
              label: 'PNG Image',
              description: 'Share calendar as image',
              icon: '🖼️',
            },
          ].map((format) => (
            <motion.button
              key={format.id}
              className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                selectedFormat === format.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background hover:bg-accent'
              }`}
              onClick={() => setSelectedFormat(format.id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">{format.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{format.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{format.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Status Message */}
        {exportStatus && (
          <motion.div
            className="p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {exportStatus}
          </motion.div>
        )}

        {/* Info */}
        <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100 text-sm mb-6">
          <p className="font-semibold mb-2">What will be exported:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{events.length} calendar events</li>
            <li>{notes.length} sticky notes</li>
            {selectedFormat === 'json' && <li>All settings and preferences</li>}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isExporting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleExport}
            className="flex-1"
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
