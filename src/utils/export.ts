/**
 * Export utilities for calendar data (ICS, CSV, PNG, JSON)
 */

import { CalendarEvent, StickyNote } from '@/types';
import { format } from 'date-fns';

/**
 * Export events to iCalendar (ICS) format
 */
export function exportToICS(events: CalendarEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sentient Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Sentient Calendar',
    'X-WR-TIMEZONE:UTC',
  ];

  events.forEach((event) => {
    lines.push('BEGIN:VEVENT');

    // UID (unique identifier)
    lines.push(`UID:${event.id}@sentient-calendar.local`);

    // Created date
    lines.push(`DTSTAMP:${formatICSDate(new Date(event.createdAt))}`);

    // Event start
    lines.push(`DTSTART:${formatICSDate(new Date(event.startDate))}`);

    // Event end (if multi-day)
    if (event.endDate && event.endDate !== event.startDate) {
      lines.push(`DTEND:${formatICSDate(new Date(event.endDate))}`);
    } else if (event.startTime) {
      const [hour, minute] = event.startTime.split(':');
      const endTime = event.endTime || '23:59';
      const startDate = new Date(event.startDate);
      startDate.setHours(parseInt(hour), parseInt(minute));
      lines.push(`DTSTART:${formatICSDateTime(startDate)}`);

      const endDate = new Date(event.startDate);
      const [endHour, endMinute] = endTime.split(':');
      endDate.setHours(parseInt(endHour), parseInt(endMinute));
      lines.push(`DTEND:${formatICSDateTime(endDate)}`);
    }

    // Summary (title)
    lines.push(`SUMMARY:${escapeICSText(event.title)}`);

    // Description
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeICSText(event.description)}`);
    }

    // Location
    if (event.location) {
      lines.push(`LOCATION:${escapeICSText(event.location)}`);
    }

    // Categories
    lines.push(`CATEGORIES:${event.category.toUpperCase()}`);

    // Status
    lines.push('STATUS:CONFIRMED');

    // Reminders
    if (event.reminders && event.reminders.length > 0) {
      event.reminders.forEach((minutes) => {
        lines.push('BEGIN:VALARM');
        lines.push('ACTION:DISPLAY');
        lines.push(`TRIGGER:-PT${minutes}M`);
        lines.push(`DESCRIPTION:${event.title}`);
        lines.push('END:VALARM');
      });
    }

    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Export events to CSV format
 */
export function exportToCSV(
  events: CalendarEvent[],
  notes: StickyNote[] = []
): string {
  const lines: string[] = [
    ['Date', 'Title', 'Description', 'Category', 'Time', 'Location', 'Notes'].join(','),
  ];

  events.forEach((event) => {
    const row = [
      event.startDate,
      `"${event.title.replace(/"/g, '""')}"`,
      `"${(event.description || '').replace(/"/g, '""')}"`,
      event.category,
      event.startTime || '',
      `"${(event.location || '').replace(/"/g, '""')}"`,
      '',
    ];
    lines.push(row.join(','));
  });

  // Add notes
  if (notes.length > 0) {
    lines.push('');
    lines.push(['Date', 'Note', 'Color', 'Tags'].join(','));

    notes.forEach((note) => {
      const row = [
        note.date,
        `"${note.content.replace(/"/g, '""')}"`,
        note.color,
        note.tags?.join(';') || '',
      ];
      lines.push(row.join(','));
    });
  }

  return lines.join('\n');
}

/**
 * Export to JSON format (for backup)
 */
export function exportToJSON(
  events: CalendarEvent[],
  notes: StickyNote[],
  settings: any
): string {
  return JSON.stringify(
    {
      version: '1.0',
      exportDate: new Date().toISOString(),
      data: {
        events,
        notes,
        settings,
      },
    },
    null,
    2
  );
}

/**
 * Download file to browser
 */
export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export calendar as PNG (requires html2canvas)
 */
export async function exportToPNG(element: HTMLElement, filename: string = 'calendar.png'): Promise<void> {
  try {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export PNG:', error);
  }
}

/**
 * Import events from ICS file
 */
export async function importFromICS(file: File): Promise<CalendarEvent[]> {
  const text = await file.text();
  const events: CalendarEvent[] = [];

  // Simple ICS parser (basic implementation)
  const eventBlocks = text.split('BEGIN:VEVENT');

  eventBlocks.slice(1).forEach((block) => {
    const lines = block.split('\r\n');
    const eventData: any = {};

    lines.forEach((line) => {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':');

      if (key === 'SUMMARY') eventData.title = value;
      if (key === 'DESCRIPTION') eventData.description = value;
      if (key === 'DTSTART') eventData.startDate = parseICSDate(value);
      if (key === 'DTEND') eventData.endDate = parseICSDate(value);
      if (key === 'LOCATION') eventData.location = value;
      if (key === 'CATEGORIES') eventData.category = value.toLowerCase();
    });

    if (eventData.title && eventData.startDate) {
      events.push({
        id: Date.now().toString() + Math.random(),
        title: eventData.title,
        description: eventData.description || '',
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        category: eventData.category || 'personal',
        location: eventData.location,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  return events;
}

/**
 * Import events from CSV file
 */
export async function importFromCSV(file: File): Promise<CalendarEvent[]> {
  const text = await file.text();
  const lines = text.split('\n');
  const events: CalendarEvent[] = [];

  // Skip header
  lines.slice(1).forEach((line) => {
    if (!line.trim()) return;

    const [date, title, description, category, time, location] = parseCSVLine(line);

    if (date && title) {
      events.push({
        id: Date.now().toString() + Math.random(),
        title,
        description,
        startDate: date,
        startTime: time,
        location,
        category: (category.toLowerCase() as any) || 'personal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  return events;
}

// Helper functions

function formatICSDate(date: Date): string {
  return format(date, 'yyyyMMdd');
}

function formatICSDateTime(date: Date): string {
  return format(date, "yyyyMMdd'T'HHmmss'Z'");
}

function parseICSDate(dateStr: string): string {
  // Convert from ICS format (yyyyMMdd or yyyyMMddTHHmmssZ) to ISO
  if (dateStr.includes('T')) {
    const [date, time] = dateStr.split('T');
    return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  }
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}
