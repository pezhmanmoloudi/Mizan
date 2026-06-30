import { DEFAULT_CATEGORIES } from './defaultCategories';

describe('DEFAULT_CATEGORIES', () => {
  it('covers the seven required default categories', () => {
    const slugs = DEFAULT_CATEGORIES.map((c) => c.nameKey.replace('categories.defaults.', ''));
    expect(slugs).toEqual([
      'food',
      'transport',
      'shopping',
      'bills',
      'health',
      'entertainment',
      'other',
    ]);
  });

  it('has unique, deterministic ids', () => {
    const ids = DEFAULT_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith('category:'))).toBe(true);
  });

  it('uses localization keys (not literal names) and valid hex colors', () => {
    for (const c of DEFAULT_CATEGORIES) {
      expect(c.nameKey).toMatch(/^categories\.defaults\.[a-z]+$/);
      expect(c.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(c.type).toBe('expense');
      expect(c.icon.length).toBeGreaterThan(0);
    }
  });
});
