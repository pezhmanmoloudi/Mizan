// Public surface for the state layer. Stores are organized as small per-domain slices under
// store/<domain>; consume them through the selector hooks re-exported here.
export * from './app';
export * from './auth';
export * from './categories';
export * from './settings';
export * from './shared';
export { persistStorage } from './storage';
export * from './transactions';
export * from './ui';
