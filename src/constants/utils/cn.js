/**
 * Merge Tailwind classes with conflict resolution.
 * Use for all component className composition — never concatenate strings.
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(...inputs));
