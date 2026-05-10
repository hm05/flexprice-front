/**
 * createQueryConfig — Configurable TanStack Query caching utility.
 *
 * Provides pre-defined caching presets for @tanstack/react-query v5
 * to ensure consistent caching behaviour across the FlexPrice app.
 *
 * ## Presets
 * - `REALTIME` — staleTime: 0, gcTime: 1 min — for real-time data (event streams, live metrics)
 * - `DEFAULT` — staleTime: 5 min, gcTime: 10 min — for most API calls
 * - `STATIC` — staleTime: 30 min, gcTime: 60 min — for rarely-changing data (plan definitions, features)
 *
 * ## Usage
 * ```ts
 * // Use a preset
 * const config = createQueryConfig('REALTIME');
 *
 * // Use default with overrides
 * const config = createQueryConfig('DEFAULT', { staleTime: 0 });
 *
 * // In a query
 * useQuery({
 *   queryKey: ['invoices'],
 *   queryFn: fetchInvoices,
 *   ...createQueryConfig('DEFAULT'),
 * });
 * ```
 */

export interface QueryCacheConfig {
	/** Time in ms before data is considered stale */
	staleTime: number;
	/** Time in ms before inactive cache entries are garbage collected */
	gcTime: number;
}

export const QUERY_PRESETS = {
	/** Real-time data — always refetch, short cache */
	REALTIME: {
		staleTime: 0,
		gcTime: 1 * 60 * 1000, // 1 minute
	},
	/** Default — balanced caching for most API calls */
	DEFAULT: {
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	},
	/** Static data — aggressive caching for rarely-changing data */
	STATIC: {
		staleTime: 30 * 60 * 1000, // 30 minutes
		gcTime: 60 * 60 * 1000, // 60 minutes
	},
} as const satisfies Record<string, QueryCacheConfig>;

export type QueryPresetName = keyof typeof QUERY_PRESETS;

/**
 * Create a query cache configuration from a preset with optional overrides.
 *
 * @param preset — Preset name: REALTIME, DEFAULT, or STATIC
 * @param overrides — Optional overrides for staleTime and/or gcTime
 * @returns QueryCacheConfig object to spread into useQuery options
 */
export function createQueryConfig(preset: QueryPresetName = 'DEFAULT', overrides?: Partial<QueryCacheConfig>): QueryCacheConfig {
	return {
		...QUERY_PRESETS[preset],
		...overrides,
	};
}

/**
 * Global default query client options.
 * Use this when initializing QueryClient to set app-wide defaults.
 *
 * ```ts
 * const queryClient = new QueryClient({
 *   defaultOptions: {
 *     queries: GLOBAL_QUERY_DEFAULTS,
 *   },
 * });
 * ```
 */
export const GLOBAL_QUERY_DEFAULTS: QueryCacheConfig = QUERY_PRESETS.DEFAULT;

export default createQueryConfig;
