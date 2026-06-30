import { MIGRATIONS } from '.';

describe('MIGRATIONS', () => {
  it('are ordered with unique, gap-free, 1-based versions', () => {
    const versions = MIGRATIONS.map((m) => m.version);
    expect(versions).toEqual([...versions].sort((a, b) => a - b));
    expect(new Set(versions).size).toBe(versions.length);
    versions.forEach((v, i) => expect(v).toBe(i + 1));
  });

  it('every migration has a name and an up function', () => {
    for (const m of MIGRATIONS) {
      expect(typeof m.name).toBe('string');
      expect(m.name.length).toBeGreaterThan(0);
      expect(typeof m.up).toBe('function');
    }
  });
});
