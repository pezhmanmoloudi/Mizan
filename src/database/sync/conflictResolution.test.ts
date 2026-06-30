import type { SyncMeta } from '@/types';

import { lastWriteWins } from './conflictResolution';

const meta = (updatedAt: string, deletedAt: string | null = null): SyncMeta => ({
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt,
  deletedAt,
  syncStatus: 'pending',
});

describe('lastWriteWins', () => {
  it('keeps the more recently updated record', () => {
    const local = meta('2026-01-02T00:00:00.000Z');
    const remote = meta('2026-01-03T00:00:00.000Z');
    expect(lastWriteWins(local, remote)).toBe(remote);
    expect(lastWriteWins(remote, local)).toBe(remote);
  });

  it('prefers a tombstone on equal timestamps so deletes are not resurrected', () => {
    const ts = '2026-01-02T00:00:00.000Z';
    const localDeleted = meta(ts, ts);
    const remoteLive = meta(ts);
    expect(lastWriteWins(localDeleted, remoteLive)).toBe(localDeleted);
  });
});
