# FlexPrice — Frontend Intern Assignment

**Storybook Component Library** extracted from the [FlexPrice](https://flexprice.io) production codebase.

**Live Storybook:** [https://flexprice-front-hm05.vercel.app/](https://flexprice-front-hm05.vercel.app)

**Repository:** [github.com/hm05/flexprice-front](https://github.com/hm05/flexprice-front)

---

## Overview

This project documents FlexPrice's UI as an interactive **Storybook component library**, organised using the **Atomic Design** pattern (Atoms → Molecules → Organisms). It also includes advanced engineering challenges (state management, virtualisation, caching) and unit tests.

The work was split into **four distinct phases**, each committed separately for a clean and reviewable git history.

---

## Phase 1 — Atoms (Core Building Blocks)

The foundation layer. Each atom is a small, self-contained UI primitive that maps directly to an element visible in the FlexPrice app at [admin.flexprice.io](https://admin.flexprice.io).

| Component | Description | Key Stories |
|---|---|---|
| **Button** | Primary CTA used across the app. Supports `default`, `secondary`, `destructive`, `outline`, `ghost`, and `link` variants. | Default, All Variants, Sizes, Loading, Disabled, With Icons |
| **Chip** | Status badges for plans, invoices, and subscriptions. Colour-coded by semantic meaning. | Active, Expired, Draft, Paid, Void, With Icons |
| **Input** | Text fields with label, placeholder, error state, and currency prefix support. | Default, With Label, Error, Disabled, Currency Prefix |
| **Select** | Dropdown selector built on Radix `Select` primitive. | Default, With Placeholder, Disabled |
| **Tooltip** | Informational hover tooltip with configurable delay and positioning. | Default, Positions, With Delay |
| **Spinner** | Loading indicator with size variants. | Default, Sizes |
| **DateRangePicker** | Calendar-based range selector for analytics filtering, with timezone support. | Default, With Title, Pre-selected Range, Disabled, With Constraints |

### Design Decisions
- Components re-use FlexPrice's existing design tokens from `tailwind.config.js` and the `shadcn/ui` + Radix primitive patterns already established in the codebase.
- Every story includes **Controls** (via `args`/`argTypes`) so reviewers can tweak props live, and a **JSDoc comment block** documenting props and usage.
- Interactive components (Button, Input) include **Storybook interaction tests** using `@storybook/test` play functions.

---

## Phase 2 — Molecules & Organisms (Composed UI)

Higher-level components built by composing atoms. These represent real feature-level sections visible in the FlexPrice dashboard.

### Molecules

| Component | Description | Key Stories |
|---|---|---|
| **MetricCard** | KPI card from the dashboard showing label, value, and trend indicator. | Default, With Trend, Loading |
| **InvoiceStatusBadge** | Maps invoice status strings (`paid`, `draft`, `void`, `finalized`) to coloured chips with icons. | All Statuses |
| **SearchBar** | Debounced search input with clear button, used for table filtering. | Default, With Value, Interaction Test |
| **UsageBar** | Labelled progress bar showing used vs. entitled units for metered features. | Default, Warning, Critical, Full |
| **Table (DataTable)** | Sortable columns with loading skeleton, empty state, and pagination controls. | Default, Loading, Empty, Sortable |

### Organisms

| Component | Description | Key Stories |
|---|---|---|
| **SidebarNav** | Collapsible navigation sidebar with active-route highlighting and icon+label items. | Expanded, Collapsed, With Active Route |
| **PricingTierTable** | Displays tiered/graduated pricing in a readable table format. | Flat Rate, Graduated, Volume |
| **EmptyState** | Full-page empty state with icon, headline, subtext, and CTA button. | Default, Custom Icon, No CTA |

### Design Decisions
- Molecules are composed from the atoms defined in Phase 1, keeping the dependency graph clean.
- Organisms like `SidebarNav` use mock route data and decorators to simulate real navigation without requiring a router.
- The `DataTable` is deliberately generic to serve as the base for the virtualisation challenge in Phase 3.

---

## Phase 3 — Advanced Challenges

### Challenge A — `useFilterStore` (Zustand State Persistence)

**Problem:** FlexPrice tables have multi-dimensional filters (date range, status, plan, customer search, sort column). A naive implementation serialises everything into the URL query string, which becomes unwieldy and wastes CPU on every render.

**Solution:** A Zustand-based `useFilterStore` hook that:
- Persists filter state per page in `sessionStorage`, keyed by route (e.g. `filters:invoices`).
- Exposes a clean API: `setFilter(key, value)`, `resetFilters()`, `getFilters()`.
- Syncs only a **shallow fingerprint** (active filter count) to the URL — making pages bookmarkable without URL bloat.
- Demonstrated in a `FilteredDataTable` Storybook story wired to the store.

**File:** `src/hooks/useFilterStore.ts`

### Challenge B — Virtualised DataTable (`@tanstack/react-virtual`)

**Problem:** The Customers and Invoices pages can contain tens of thousands of rows. Rendering them all in the DOM kills scroll performance.

**Solution:** Extended the `DataTable` component with `@tanstack/react-virtual` to:
- Only render rows currently in the viewport plus an overscan buffer.
- Demonstrated in a story with **10,000 mock rows** that scroll smoothly.
- Supports row height estimation and dynamic height.

**File:** `src/components/molecules/Table/VirtualisedDataTable.stories.tsx`

### Challenge C — `createQueryConfig` (TanStack Query Caching)

**Problem:** Using `useQuery` everywhere with default settings creates an inconsistent caching experience across the app.

**Solution:** A `createQueryConfig` utility that:
- Sets global defaults: `staleTime: 5min`, `gcTime: 10min`.
- Allows per-call overrides: `useInvoices({ staleTime: 0 })`.
- Exports pre-defined presets: `REALTIME` (staleTime 0), `DEFAULT` (5 min), `STATIC` (30 min).
- Includes a comprehensive **Vitest test suite** validating all preset behaviours and override logic.

**Files:** `src/lib/queryConfig.ts`, `src/lib/queryConfig.test.ts`

---

## Phase 4 — Unit Tests

Unit tests written with **Vitest** and **React Testing Library** to validate both utility functions and component rendering.

### Component Tests
| Test File | What It Tests |
|---|---|
| `src/components/atoms/Button/Button.test.tsx` | Renders all variants, handles click events, shows loading spinner, respects disabled state |
| `src/components/atoms/Chip/Chip.test.tsx` | Renders label and status colours, displays icons, applies custom className |

### Utility Tests
| Test File | What It Tests |
|---|---|
| `src/utils/common/format_number.test.ts` | Number formatting, currency display, edge cases (zero, negative, large numbers) |
| `src/utils/common/helper_functions.test.ts` | Status-to-label mapping, string helpers, date utilities |

### Running Tests

```bash
npm run test
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool and dev server |
| Storybook 8.x | Component documentation and interactive playground |
| Tailwind CSS | Utility-first styling (using FlexPrice's existing design tokens) |
| shadcn/ui + Radix | Accessible component primitives |
| Zustand | Lightweight state management (Challenge A) |
| @tanstack/react-virtual | Row virtualisation (Challenge B) |
| @tanstack/react-query v5 | Server state caching (Challenge C) |
| Vitest + React Testing Library | Unit and component testing |
| Vercel | Storybook hosting |

---

## Local Development

```bash
# Install dependencies
npm install

# Run Storybook locally
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run tests
npm run test
```

---

## Project Structure

```
src/
├── components/
│   ├── atoms/           # Button, Chip, Input, Select, Tooltip, Spinner, DateRangePicker
│   ├── molecules/       # MetricCard, SearchBar, InvoiceStatusBadge, UsageBar, Table
│   └── organisms/       # SidebarNav, PricingTierTable, EmptyState
├── hooks/
│   └── useFilterStore.ts    # Challenge A — Zustand filter persistence
├── lib/
│   ├── queryConfig.ts       # Challenge C — TanStack Query caching presets
│   └── queryConfig.test.ts
└── utils/
    └── common/              # Utility functions + tests
```
