import type { User } from '@/database';
import { userRepository } from '@/database';

import { useAuthStore } from './authStore';

jest.mock('@/database', () => ({
  userRepository: {
    findGuest: jest.fn(),
    create: jest.fn(),
  },
}));

const findGuest = userRepository.findGuest as jest.Mock;
const create = userRepository.create as jest.Mock;

const guest: User = {
  id: 'u1',
  name: 'Guest',
  email: null,
  isGuest: true,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
  deletedAt: null,
  syncStatus: 'local',
};

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().reset();
    findGuest.mockReset();
    create.mockReset();
  });

  it('adopts an existing guest user without creating one', async () => {
    findGuest.mockResolvedValue(guest);
    const user = await useAuthStore.getState().continueAsGuest();
    expect(user).toEqual(guest);
    expect(create).not.toHaveBeenCalled();
    expect(useAuthStore.getState().status).toBe('guest');
  });

  it('creates a guest user when none exists', async () => {
    findGuest.mockResolvedValue(null);
    create.mockResolvedValue(guest);
    await useAuthStore.getState().continueAsGuest();
    expect(create).toHaveBeenCalledWith({ name: 'Guest', isGuest: true });
    expect(useAuthStore.getState().user).toEqual(guest);
  });

  it('records an error and stays unknown when the repository throws', async () => {
    findGuest.mockRejectedValue(new Error('disk full'));
    const user = await useAuthStore.getState().continueAsGuest();
    expect(user).toBeNull();
    expect(useAuthStore.getState().status).toBe('unknown');
    expect(useAuthStore.getState().error).toBe('disk full');
  });

  it('signOut drops back to a guest session with no user', async () => {
    findGuest.mockResolvedValue(guest);
    await useAuthStore.getState().continueAsGuest();
    useAuthStore.getState().signOut();
    expect(useAuthStore.getState()).toMatchObject({ status: 'guest', user: null });
  });

  it('signIn is not implemented yet', async () => {
    await expect(useAuthStore.getState().signIn()).rejects.toThrow('not implemented');
  });
});
