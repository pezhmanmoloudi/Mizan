import { getDatabase } from './client';
import { databaseService } from './databaseService';
import { runMigrations } from './migrations';

jest.mock('./client', () => ({
  getDatabase: jest.fn().mockResolvedValue({ withTransactionAsync: jest.fn() }),
}));
jest.mock('./migrations', () => ({ runMigrations: jest.fn().mockResolvedValue(undefined) }));

describe('databaseService', () => {
  it('opens the database and runs migrations once, idempotently', async () => {
    expect(databaseService.isReady()).toBe(false);

    await databaseService.init();
    await databaseService.init();

    expect(getDatabase).toHaveBeenCalledTimes(1);
    expect(runMigrations).toHaveBeenCalledTimes(1);
    expect(databaseService.isReady()).toBe(true);
  });
});
