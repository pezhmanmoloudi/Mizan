# Mizan — Engineering Guide

Mizan is a modern, **offline-first** fintech expense tracking app.

> **Expo has changed.** Read the versioned docs at https://docs.expo.dev/versions/v56.0.0/
> before writing any code. See `AGENTS.md`.

## Stack

- Expo SDK 56, React Native 0.85, React 19
- TypeScript (strict + `noUncheckedIndexedAccess`)
- Zustand (state) · expo-sqlite (persistence) · React Navigation (native-stack)
- i18next + react-i18next (en/fa, RTL) · react-native-reanimated
- StyleSheet + design tokens (no NativeWind)
- Jest (`jest-expo`) + React Native Testing Library

## Architecture Decisions

- **Token-driven styling.** A typed theme is consumed via `useTheme()`; raw colors/spacing
  live only in `src/theme/tokens`. No hardcoded colors/spacing in components.
- **Feature-based modular slices.** Vertical features under `src/features/*` own their
  screens/components/hooks/store. Features never import each other.
- **Layered, dependency-inverted services.** Sync and AI are defined as interfaces in
  `src/services`; concrete implementations (and the choice of AI/Claude model) are deferred.
- **Offline-first + sync-ready DB.** Every table carries `created_at/updated_at/deleted_at/
sync_status` so a future cloud sync needs no schema changes. Soft-delete via tombstones.
- **Path alias `@/` → `src/`.** Resolved by Metro from `tsconfig` `paths`.

## Folder Structure (`src/`)

| Folder          | Responsibility                                                    |
| --------------- | ----------------------------------------------------------------- |
| `app/`          | Root composition: providers, error boundary, bootstrap, `App.tsx` |
| `components/`   | Cross-feature UI: `ui/` primitives, `feedback/` state views       |
| `features/`     | Self-contained vertical slices (see `features/README.md`)         |
| `navigation/`   | Navigators, route param types, navigation theme mapping           |
| `services/`     | External integrations behind interfaces (sync, ai)                |
| `database/`     | SQLite client, migrations, models, repositories, service, sync    |
| `store/`        | Cross-cutting Zustand stores + persistence adapter                |
| `hooks/`        | Cross-feature reusable hooks (`useAsync`, `useDebouncedValue`)    |
| `theme/`        | Design tokens, themes, `useTheme`, RTL helpers                    |
| `constants/`    | App constants + typed env access                                  |
| `utils/`        | Pure helpers (logger, result, format)                             |
| `localization/` | i18n init + en/fa resources                                       |
| `types/`        | Shared/global types                                               |
| `test/`         | Test utilities (`renderWithProviders`)                            |

The root `App.tsx` is a thin re-export of `@/app`. Entry is `index.ts` → `registerRootComponent`.

## Engineering Rules

- Use Expo-compatible libraries only.
- Small, focused files and components — no giant files. Split when a file grows past a
  single clear responsibility.
- Separate UI from business logic. **No inline business logic in screens** — it lives in
  feature hooks; data access lives in repositories.
- Typed props everywhere; export prop types alongside components.
- Reuse hooks and utilities before adding new ones.
- One barrel `index.ts` per public module boundary (not deep internals).
- Prefer composition over inheritance. Avoid tight coupling between features.

### Naming

- Components: `PascalCase.tsx` · Hooks: `useX.ts` · utils/services: `camelCase.ts`
- Types files: `X.types.ts` or `types.ts` · Tests: `*.test.ts(x)` colocated.

## Design System Rules

- Tokens live in `src/theme/tokens`: `palette` (only literal hex), `colors` (semantic,
  per-scheme), `spacing`, `typography`, `radius`, `shadows`, `animation`, `zIndex`.
- Components consume tokens **only** via `useTheme()` (or `makeStyles`). Never hardcode a
  color, spacing, radius, or zIndex value.
- Add new design values as tokens, not inline literals.

## Theme & RTL Rules

- `buildTheme(scheme, direction)` produces the active `Theme`. Light/dark are structurally
  identical (only `colors` differ). Add a theme by registering it in `theme/themes.ts`.
- `ThemeProvider` resolves scheme from user preference + device, and direction from locale
  (`expo-localization`) or override, then memoizes the theme.
- For layout, use logical helpers in `theme/rtl.ts` (`startEnd`, `rowDirection`,
  `textAlignStart`) instead of hardcoding left/right.

## State Management Conventions

- **UI/preference state** → `src/store` (e.g. `uiStore`). **Business state** → inside the
  owning feature (`features/<f>/store`).
- Stores hold only **serializable, sync-friendly** values; actions are colocated and pure.
- Export **selector hooks** (e.g. `useThemePreference`); components never subscribe to the
  whole store.
- Persistence via the `persist` middleware + `persistStorage` (AsyncStorage), with
  `partialize` to whitelist keys and `version`/`migrate` for schema evolution.
- `uiStore` is the canonical reference.

## Database & Sync Conventions

- Access the DB only through **repositories** (`database/repositories`) — the single place
  SQL is written. Repositories map snake_case rows ↔ camelCase models and return typed
  models. `Category` is the reference entity.
- Migrations are ordered, append-only files in `database/migrations`, applied by the
  `user_version`-based runner. Never edit a shipped migration.
- `databaseService.init()` (run at bootstrap) opens the DB and runs migrations.
- All tables include the sync columns (`database/sync/syncColumns.ts`). Use soft-delete.

## Developer Experience

- **Logging:** `createLogger('scope')` / `logger` — never bare `console`. Silent below
  `warn` in production.
- **Async:** `useAsync` for the `{ status, data, error, isLoading, run }` pattern; render
  it with `<AsyncBoundary>`. `Result`/`tryCatch` in `utils` for non-throwing flows.
- **Errors:** `ErrorBoundary` wraps the app with a themed, recoverable fallback.
- **Env:** typed access via `@/constants` (`env`); only `EXPO_PUBLIC_*` is bundled. See
  `.env.example`.

## Testing Strategy

- `jest-expo` preset; setup in `jest.setup.ts` (mocks AsyncStorage).
- Use `renderWithProviders` (`src/test`) to render components with theme + safe-area.
- Colocate tests as `*.test.ts(x)`. References: `components/ui/Button.test.tsx`,
  `store/uiStore.test.ts`.
- Scripts: `npm run typecheck | lint | test | format`.

## UI/UX Rules

- Minimal fintech design; rounded corners (12–16px), calm spacing.
- Bottom navigation; a single Floating Action Button for Add Transaction; secondary actions
  in overflow menus.
- Full RTL support for Persian; dark and light modes.

## Design Tokens (reference)

Primary `#4F7CFF` · Success `#2ED573` · Error `#FF4757` · Warning `#FFA502` ·
Dark bg `#0F1115` · Light bg `#F7F8FA`. (Authoritative source: `src/theme/tokens`.)
