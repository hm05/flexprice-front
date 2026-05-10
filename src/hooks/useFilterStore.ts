import { create } from 'zustand';

/**
 * useFilterStore — Zustand-based filter persistence hook.
 *
 * Persists active filter state per page in sessionStorage keyed by route
 * (e.g. "filters:invoices", "filters:customers"). Syncs a shallow
 * fingerprint (active filter count) to the URL for bookmarkability
 * without URL bloat.
 *
 * ## API
 * - `setFilter(route, key, value)` — Set a single filter value
 * - `resetFilters(route)` — Clear all filters for a route
 * - `getFilters(route)` — Get current filter state for a route
 * - `getFilterCount(route)` — Get number of active filters (for URL sync)
 *
 * ## Storage
 * - Filters are stored in sessionStorage under `fp-filters:{route}`
 * - Each route has its own independent filter namespace
 */

interface FilterState {
	/** Map of route -> filter key-value pairs */
	filters: Record<string, Record<string, unknown>>;
	/** Set a single filter value for a route */
	setFilter: (route: string, key: string, value: unknown) => void;
	/** Remove a single filter key for a route */
	removeFilter: (route: string, key: string) => void;
	/** Clear all filters for a route */
	resetFilters: (route: string) => void;
	/** Get all filters for a route */
	getFilters: (route: string) => Record<string, unknown>;
	/** Get count of active filters for a route (for shallow URL fingerprint) */
	getFilterCount: (route: string) => number;
}

const STORAGE_PREFIX = 'fp-filters';

/** Load filters for a specific route from sessionStorage */
const loadFromStorage = (route: string): Record<string, unknown> => {
	try {
		const stored = sessionStorage.getItem(`${STORAGE_PREFIX}:${route}`);
		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
};

/** Save filters for a specific route to sessionStorage */
const saveToStorage = (route: string, filters: Record<string, unknown>): void => {
	try {
		if (Object.keys(filters).length === 0) {
			sessionStorage.removeItem(`${STORAGE_PREFIX}:${route}`);
		} else {
			sessionStorage.setItem(`${STORAGE_PREFIX}:${route}`, JSON.stringify(filters));
		}
	} catch {
		// sessionStorage might be full or unavailable
	}
};

/**
 * Sync a shallow fingerprint to the URL search params.
 * Only stores filter count, not the actual filter values — avoids URL bloat.
 */
const syncToUrl = (route: string, filterCount: number): void => {
	try {
		const url = new URL(window.location.href);
		if (filterCount > 0) {
			url.searchParams.set('fc', String(filterCount));
		} else {
			url.searchParams.delete('fc');
		}
		window.history.replaceState({}, '', url.toString());
	} catch {
		// URL manipulation might fail in some environments
	}
};

export const useFilterStore = create<FilterState>((set, get) => ({
	filters: {},

	setFilter: (route, key, value) => {
		set((state) => {
			const routeFilters = { ...(state.filters[route] || loadFromStorage(route)) };

			// Remove filter if value is null/undefined/empty
			if (value === null || value === undefined || value === '') {
				delete routeFilters[key];
			} else {
				routeFilters[key] = value;
			}

			const updated = { ...state.filters, [route]: routeFilters };
			saveToStorage(route, routeFilters);
			syncToUrl(route, Object.keys(routeFilters).length);

			return { filters: updated };
		});
	},

	removeFilter: (route, key) => {
		set((state) => {
			const routeFilters = { ...(state.filters[route] || {}) };
			delete routeFilters[key];

			const updated = { ...state.filters, [route]: routeFilters };
			saveToStorage(route, routeFilters);
			syncToUrl(route, Object.keys(routeFilters).length);

			return { filters: updated };
		});
	},

	resetFilters: (route) => {
		set((state) => {
			const { [route]: _, ...rest } = state.filters;
			saveToStorage(route, {});
			syncToUrl(route, 0);

			return { filters: rest };
		});
	},

	getFilters: (route) => {
		const state = get();
		return state.filters[route] || loadFromStorage(route);
	},

	getFilterCount: (route) => {
		const filters = get().getFilters(route);
		return Object.keys(filters).length;
	},
}));

export default useFilterStore;
