import type { Direction } from './types';

/**
 * Logical-layout helpers. Components express layout in start/end terms and resolve them
 * against the active direction here, so RTL support never requires duplicated styles.
 */
export function startEnd<T>(direction: Direction, start: T, end: T): { left: T; right: T } {
  return direction === 'rtl' ? { left: end, right: start } : { left: start, right: end };
}

export function textAlignStart(direction: Direction): 'left' | 'right' {
  return direction === 'rtl' ? 'right' : 'left';
}

export function rowDirection(direction: Direction): 'row' | 'row-reverse' {
  return direction === 'rtl' ? 'row-reverse' : 'row';
}
