import { CalendarEvent, StickyNote } from '@/types';

// ─── ICS Calendar Export ──────────────────────────────────────────────────────
// Builds a valid iCalendar (.ics) string entirely client-side.
// The exported file includes all events and optionally notes as VJOURNAL entries.

function formatICSDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICS(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Generate a valid VCALENDAR string from a list of events and notes.
 */
export function generateICS(events: CalendarEvent[], notes: StickyNote[] = []): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sentient Calendar//Ultimate Wall Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Sentient Calendar',
  ];

  for (const event of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}@sentient-calendar`);
    lines.push(`DTSTAMP:${formatICSDate(event.createdAt)}`);
    lines.push(`DTSTART:${formatICSDate(event.startDate)}`);
    if (event.endDate) {
      lines.push(`DTEND:${formatICSDate(event.endDate)}`);
    } else {
      lines.push(`DTEND:${formatICSDate(event.startDate)}`);
    }
    lines.push(`SUMMARY:${escapeICS(event.title)}`);
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeICS(event.description)}`);
    }
    if (event.isRecurring && event.recurrenceRule) {
      lines.push(`RRULE:${event.recurrenceRule}`);
    }
    if (event.tags && event.tags.length > 0) {
      lines.push(`CATEGORIES:${event.tags.map(escapeICS).join(',')}`);
    }
    lines.push('END:VEVENT');
  }

  for (const note of notes) {
    if (!note.content.trim()) continue;
    lines.push('BEGIN:VJOURNAL');
    lines.push(`UID:note-${note.id}@sentient-calendar`);
    lines.push(`DTSTAMP:${formatICSDate(note.createdAt)}`);
    lines.push(`DTSTART;VALUE=DATE:${note.date.replace(/-/g, '')}`);
    lines.push(`DESCRIPTION:${escapeICS(note.content)}`);
    if (note.tags && note.tags.length > 0) {
      lines.push(`CATEGORIES:${note.tags.map(escapeICS).join(',')}`);
    }
    lines.push('END:VJOURNAL');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Triggers a client-side download of an .ics file.
 */
export function downloadICS(events: CalendarEvent[], notes: StickyNote[] = [], filename = 'sentient-calendar.ics'): void {
  const content = generateICS(events, notes);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate a single-day ICS VEVENT for a given date string (quick export).
 */
export function downloadSingleDayICS(dateStr: string, title = 'Calendar Note'): void {
  const event: CalendarEvent = {
    id: `quick-${Date.now()}`,
    title,
    startDate: dateStr,
    category: 'personal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  downloadICS([event]);
}
