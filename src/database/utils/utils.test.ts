import { boolToInt, generateId, intToBool, mapSyncMeta, prefixedId, resolveCategoryName } from '.';

describe('database/utils', () => {
  describe('generateId', () => {
    it('produces unique RFC-4122 v4 ids', () => {
      const a = generateId();
      const b = generateId();
      expect(a).not.toBe(b);
      expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
  });

  it('prefixedId joins prefix and slug', () => {
    expect(prefixedId('category', 'food')).toBe('category:food');
  });

  describe('boolean <-> int', () => {
    it('round-trips', () => {
      expect(boolToInt(true)).toBe(1);
      expect(boolToInt(false)).toBe(0);
      expect(intToBool(1)).toBe(true);
      expect(intToBool(0)).toBe(false);
    });
  });

  it('mapSyncMeta maps snake_case columns to camelCase meta', () => {
    expect(
      mapSyncMeta({
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-02T00:00:00.000Z',
        deleted_at: null,
        sync_status: 'pending',
      }),
    ).toEqual({
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-02T00:00:00.000Z',
      deletedAt: null,
      syncStatus: 'pending',
    });
  });

  describe('resolveCategoryName', () => {
    const t = (key: string) => `translated:${key}`;

    it('translates default categories via their key', () => {
      expect(resolveCategoryName({ name: 'categories.defaults.food', isDefault: true }, t)).toBe(
        'translated:categories.defaults.food',
      );
    });

    it('returns the literal name for user categories', () => {
      expect(resolveCategoryName({ name: 'Coffee', isDefault: false }, t)).toBe('Coffee');
    });
  });
});
