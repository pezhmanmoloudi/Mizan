# Features

Each subfolder is a **self-contained vertical slice**. A feature owns its screens,
components, hooks, store and types and exposes a small public API via `index.ts`.

## Rules

- **No cross-feature imports.** A feature may import from `components`, `hooks`, `theme`,
  `utils`, `store`, `services`, `database`, `localization`, `constants`, `types` — never
  from another feature. Shared logic graduates upward into those layers.
- **Screens are presentational.** Business logic lives in feature hooks
  (`features/<f>/hooks`), data access in repositories. See `home/` as the reference slice.
- Only import a feature through its `index.ts`.

## Slice shape

```
features/<feature>/
  screens/      # presentational screens
  components/   # feature-local components
  hooks/        # business logic / data orchestration
  store/        # feature-local Zustand store (business state)
  types/        # feature-local types
  index.ts      # public surface
```
