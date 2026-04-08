import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  [key: string]: () => void;
}

/**
 * Hook for keyboard navigation and accessibility shortcuts
 */
export function useKeyboardNavigation(shortcuts: KeyboardShortcuts) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Check for Ctrl+Z (Undo) or Cmd+Z
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        shortcuts['undo']?.();
        return;
      }

      // Check for Ctrl+Shift+Z (Redo) or Cmd+Shift+Z
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') {
        event.preventDefault();
        shortcuts['redo']?.();
        return;
      }

      // Check for Escape key
      if (event.key === 'Escape') {
        shortcuts['escape']?.();
        return;
      }

      // Check for arrow keys
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        shortcuts['previousMonth']?.();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        shortcuts['nextMonth']?.();
        return;
      }

      // Check for Enter
      if (event.key === 'Enter') {
        shortcuts['selectDate']?.();
        return;
      }

      // Check for custom shortcuts
      const shortcutKey = event.key.toLowerCase();
      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey]?.();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Hook for focus trap within modal/dialog
 */
export function useFocusTrap(elementRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !elementRef.current) return;

      const focusableElements = elementRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    elementRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      elementRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef]);
}

/**
 * Get accessible key press string for display
 */
export function getKeyString(event: KeyboardEvent): string {
  const keys: string[] = [];

  if (event.ctrlKey) keys.push('Ctrl');
  if (event.shiftKey) keys.push('Shift');
  if (event.altKey) keys.push('Alt');
  if (event.metaKey) keys.push('Cmd');

  const keyName =
    event.key === ' '
      ? 'Space'
      : event.key.length > 1
        ? event.key
        : event.key.toUpperCase();

  keys.push(keyName);
  return keys.join('+');
}
