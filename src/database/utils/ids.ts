/**
 * Local id generation. Ids are generated on-device (offline-first) and must be globally
 * unique so a future cloud sync can merge rows from multiple devices without collisions.
 *
 * RFC-4122 v4 shape. `crypto.randomUUID` is used when the runtime exposes it (web, newer
 * Hermes); otherwise a Math.random fallback keeps things working on native. These ids are
 * identifiers, not security tokens, so the fallback's weaker entropy is acceptable.
 */
export function generateId(): string {
  const cryptoObj = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
    return value.toString(16);
  });
}

/** Deterministic id for seeded/system rows, e.g. `prefixedId('category', 'food')`. */
export function prefixedId(prefix: string, slug: string): string {
  return `${prefix}:${slug}`;
}
