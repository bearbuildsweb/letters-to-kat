import { Letter } from '../types';

/**
 * Returns today's date in local time as YYYY-MM-DD
 */
export function getLocalTodayString(referenceDate: Date = new Date()): string {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse a YYYY-MM-DD string into a safe local Date object
 */
export function parseDateString(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

/**
 * Editorial full date format: "12 September 2026"
 */
export function formatEditorialDate(dateStr: string): string {
  const d = parseDateString(dateStr);
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Date parts for navigation pill: { day: "12", month: "SEP", year: "2026" }
 */
export function formatNavDate(dateStr: string): { day: string; month: string; year: string } {
  const d = parseDateString(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTH_SHORT[d.getMonth()];
  const year = String(d.getFullYear());
  return { day, month, year };
}

/**
 * Checks if a date string is in the future relative to the reference date
 */
export function isFutureDate(dateStr: string, referenceDate: Date = new Date()): boolean {
  const todayStr = getLocalTodayString(referenceDate);
  return dateStr > todayStr;
}

/**
 * Filters out future letters and returns only available letters,
 * sorted chronologically.
 */
export function getAvailableLetters(letters: Letter[], referenceDate: Date = new Date()): Letter[] {
  const todayStr = getLocalTodayString(referenceDate);
  
  return letters
    .filter((letter) => letter.date <= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Finds the default letter to display: the oldest available letter (first in chronological order).
 */
export function getDefaultLetter(availableLetters: Letter[], _referenceDate: Date = new Date()): Letter | null {
  if (availableLetters.length === 0) return null;

  // Oldest available letter (first in chronological array)
  return availableLetters[0];
}
