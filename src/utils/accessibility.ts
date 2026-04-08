/**
 * Accessibility utilities and ARIA management
 */

export interface AccessibilityContext {
  ariaLabel: string;
  ariaDescription?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
  role?: string;
  tabIndex?: number;
}

/**
 * Generate ARIA labels for calendar events
 */
export function generateEventAriaLabel(event: {
  title: string;
  startDate: string;
  startTime?: string;
  category: string;
}): string {
  const date = new Date(event.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = event.startTime ? `, at ${event.startTime}` : '';
  const category = event.category ? ` (${event.category})` : '';

  return `${event.title}${category} on ${date}${time}`;
}

/**
 * Generate ARIA labels for notes
 */
export function generateNoteAriaLabel(note: { content: string; date: string }): string {
  const date = new Date(note.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `Note: "${note.content}" created on ${date}`;
}

/**
 * Get keyboard shortcut descriptions
 */
export const KEYBOARD_SHORTCUTS = {
  'Alt+N': 'Create new event',
  'Alt+S': 'Create sticky note',
  'Alt+E': 'Export data',
  'Alt+H': 'Toggle holiday view',
  'Alt+M': 'Toggle moon phases',
  'Alt+D': 'Toggle dark mode',
  'Alt+T': 'Toggle theme selector',
  'Escape': 'Close current dialog',
  'Enter': 'Confirm action',
  'Tab': 'Navigate to next element',
  'Shift+Tab': 'Navigate to previous element',
  'Arrow Keys': 'Navigate calendar dates',
};

/**
 * Handle keyboard navigation
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  options: {
    onEscape?: () => void;
    onEnter?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: (shiftKey: boolean) => void;
  }
): void {
  const { key, shiftKey, altKey } = event;

  // Only handle shortcuts if not typing in an input field
  const isInput = (event.target as HTMLElement).tagName === 'INPUT';
  const isTextArea = (event.target as HTMLElement).tagName === 'TEXTAREA';

  if (isInput || isTextArea) {
    // Allow Escape to close dialogs even in inputs
    if (key === 'Escape' && options.onEscape) {
      event.preventDefault();
      options.onEscape();
    }
    return;
  }

  switch (key) {
    case 'Escape':
      if (options.onEscape) {
        event.preventDefault();
        options.onEscape();
      }
      break;

    case 'Enter':
      if (options.onEnter) {
        event.preventDefault();
        options.onEnter();
      }
      break;

    case 'ArrowUp':
      if (options.onArrowUp) {
        event.preventDefault();
        options.onArrowUp();
      }
      break;

    case 'ArrowDown':
      if (options.onArrowDown) {
        event.preventDefault();
        options.onArrowDown();
      }
      break;

    case 'ArrowLeft':
      if (options.onArrowLeft) {
        event.preventDefault();
        options.onArrowLeft();
      }
      break;

    case 'ArrowRight':
      if (options.onArrowRight) {
        event.preventDefault();
        options.onArrowRight();
      }
      break;

    case 'Tab':
      if (options.onTab) {
        event.preventDefault();
        options.onTab(shiftKey);
      }
      break;

    default:
      // Handle Alt+Key shortcuts
      if (altKey) {
        switch (key.toUpperCase()) {
          case 'N':
            event.preventDefault();
            // Will be handled by component
            break;
          case 'S':
            event.preventDefault();
            // Will be handled by component
            break;
          case 'E':
            event.preventDefault();
            // Will be handled by component
            break;
        }
      }
  }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Remove any existing announcement div
  const existing = document.getElementById('a11y-announcement');
  if (existing) {
    existing.remove();
  }

  // Create new announcement
  const announcement = document.createElement('div');
  announcement.id = 'a11y-announcement';
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement (typically after 1 second)
  setTimeout(() => {
    announcement.remove();
  }, 1000);
}

/**
 * Focus management utilities
 */
export const FocusManager = {
  /**
   * Trap focus within a modal
   */
  trapFocus: (element: HTMLElement, onEscape?: () => void) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => element.removeEventListener('keydown', handleKeyDown);
  },

  /**
   * Restore focus after modal closes
   */
  saveFocus: () => {
    return document.activeElement as HTMLElement;
  },

  /**
   * Restore saved focus
   */
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },
};

/**
 * Get readable description for dates
 */
export function getDateDescription(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate.getTime() === today.getTime()) {
    return 'today';
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return 'yesterday';
  } else if (compareDate.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Create skip links for accessibility
 */
export const skipLinks = {
  mainContent: {
    href: '#main-content',
    label: 'Skip to main content',
  },
  sidebar: {
    href: '#sidebar',
    label: 'Skip to sidebar',
  },
  navigation: {
    href: '#navigation',
    label: 'Skip to navigation',
  },
};

/**
 * Validate ARIA attributes
 */
export function validateAria(attributes: Record<string, any>): string[] {
  const errors: string[] = [];

  // Check for proper ARIA label
  if (!attributes.ariaLabel && !attributes['aria-label'] && !attributes['aria-labelledby']) {
    errors.push('Element should have an ARIA label or aria-labelledby');
  }

  // Check for proper role
  if (attributes.role && !isValidRole(attributes.role)) {
    errors.push(`Invalid ARIA role: ${attributes.role}`);
  }

  // Check for aria-live usage
  if (
    attributes['aria-live'] &&
    !['polite', 'assertive', 'off'].includes(attributes['aria-live'])
  ) {
    errors.push('aria-live must be one of: polite, assertive, off');
  }

  return errors;
}

/**
 * Check if role is valid
 */
function isValidRole(role: string): boolean {
  const validRoles = [
    'alert',
    'application',
    'article',
    'button',
    'checkbox',
    'columnheader',
    'combobox',
    'complementary',
    'contentinfo',
    'definition',
    'dialog',
    'directory',
    'document',
    'feed',
    'figure',
    'form',
    'grid',
    'gridcell',
    'group',
    'heading',
    'img',
    'link',
    'list',
    'listbox',
    'listitem',
    'log',
    'main',
    'marquee',
    'math',
    'menu',
    'menubar',
    'menuitem',
    'navigation',
    'none',
    'note',
    'option',
    'presentation',
    'progressbar',
    'radio',
    'radiogroup',
    'region',
    'row',
    'rowheader',
    'scrollbar',
    'search',
    'searchbox',
    'separator',
    'slider',
    'spinbutton',
    'status',
    'switch',
    'tab',
    'table',
    'tablist',
    'tabpanel',
    'textbox',
    'timer',
    'toolbar',
    'tooltip',
    'tree',
    'treegrid',
    'treeitem',
  ];

  return validRoles.includes(role);
}
