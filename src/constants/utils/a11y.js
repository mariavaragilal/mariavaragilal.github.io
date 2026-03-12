/**
 * Shared a11y utilities — used across pages and components.
 * Avoid re-creating on every render.
 */

/* a11y: reusable sr-only class for screen-reader-only text */
export const srOnly = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';

/* a11y: focus ring utility — visible on keyboard focus, hidden on mouse click */
export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
