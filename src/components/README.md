# Mizan UI Architecture

This is the cross-feature UI system: **tokenized**, **RTL-aware**, **dark/light-consistent**
primitives and templates. Features compose these; they never hardcode colors, spacing, or
`left/right`. Everything below is derived from the product mockups and the design tokens in
`src/theme/tokens`.

## Module map

| Module       | Holds                                                              |
| ------------ | ----------------------------------------------------------------- |
| `ui/`        | Stateless primitives (Text, Button, Card, Chip, IconTile, …)      |
| `layout/`    | Composition + screen templates (Stack, Row, Grid, Section, ScrollScreen) |
| `finance/`   | Domain patterns that recur across features (summary, tx row, …)   |
| `feedback/`  | Async/empty/error state views                                     |

Import from the barrels: `@/components` (everything) or a submodule
(`@/components/ui`, `@/components/layout`, `@/components/finance`).

## Design language (extracted from the mockups)

- **Surfaces.** Cards use `radius.lg` (16) with a hairline border and `shadow.sm`. The brand
  balance hero uses `radius.xl` (24) on a `primary` fill with `shadow.md`.
- **Spacing.** 4pt scale. Screen padding `lg` (16). Section rhythm: `lg` above a section,
  `sm` between header and body. Rows breathe with `md` vertical padding.
- **Typography.** `title` for screen titles, `heading` for section/stat values, `amount` for
  money, `bodyStrong` for row titles, `caption`/`label` (muted) for secondary text.
- **Pills vs chips.** `Pill` = non-interactive status badge (soft tint). `Chip` = selectable
  filter / category (fills `primary` when selected; supports a `leadingIcon` for categories).
- **Lists.** Rows live inside a `ListCard` that inserts hairline `Divider`s between them.
- **Elevation.** Only three depths in use: `sm` (cards), `md` (hero card, FAB), reserved `lg`.
- **Navigation.** Bottom tabs with a center-docked FAB reserved exclusively for Add
  Transaction. Modals present as bottom sheets. Secondary actions go in an overflow
  (`ellipsis-vertical`), never as competing primary buttons.
- **RTL.** Row direction, text alignment, and disclosure chevrons all resolve from
  `theme.direction` via `theme/rtl.ts` — never hardcoded.

## Screen templates (composition recipes)

Templates are **compositions, not rigid components** — assemble them from `layout` + the
right patterns. `HomeScreen` is the reference dashboard implementation.

- **Dashboard** — `ScrollScreen` (pinned `Header`) → `FinancialSummaryCard` hero →
  `Section`s (`AnalyticsChartCard`/`BarChart`, then `ListCard` of `TransactionListItem`).
- **List** — `ScrollScreen` → filter `Chip` row → `Section` per date group → `ListCard` of
  `TransactionListItem`. Empty → `EmptyFinanceState`.
- **Analytics** — `ScrollScreen` → period `Chip` row → `AnalyticsChartCard` (headline metric
  + chart + legend) → `Section` budgets (`ListRow` + `ProgressBar`).
- **Settings** — `ScrollScreen` → `Section` per group → `ListCard` of `ListRow`
  (`trailing` = `Switch` / value / chevron).
- **Detail** — `ScrollScreen` (back + overflow `Header`) → centered hero → `ListCard` of
  `KeyValueRow` → primary/destructive `Button`s.

## Conventions

- New visual value → add a **token**, never an inline literal.
- A new pattern earns a component only when it **recurs**; otherwise compose existing pieces.
- Keep components presentational. Data shape and logic live in feature hooks.
- Co-locate a `*.test.tsx` rendered via `renderWithProviders`.
