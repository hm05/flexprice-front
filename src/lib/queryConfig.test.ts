import { describe, it, expect } from 'vitest';
import { createQueryConfig, QUERY_PRESETS, GLOBAL_QUERY_DEFAULTS } from './queryConfig';
import type { QueryPresetName } from './queryConfig';

describe('createQueryConfig', () => {
	it('returns DEFAULT preset by default', () => {
		const config = createQueryConfig();
		expect(config.staleTime).toBe(5 * 60 * 1000);
		expect(config.gcTime).toBe(10 * 60 * 1000);
	});

	it('returns REALTIME preset with staleTime 0', () => {
		const config = createQueryConfig('REALTIME');
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(1 * 60 * 1000);
	});

	it('returns STATIC preset with long cache times', () => {
		const config = createQueryConfig('STATIC');
		expect(config.staleTime).toBe(30 * 60 * 1000);
		expect(config.gcTime).toBe(60 * 60 * 1000);
	});

	it('allows overriding staleTime on a preset', () => {
		const config = createQueryConfig('DEFAULT', { staleTime: 0 });
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(10 * 60 * 1000); // unchanged
	});

	it('allows overriding gcTime on a preset', () => {
		const config = createQueryConfig('REALTIME', { gcTime: 5 * 60 * 1000 });
		expect(config.staleTime).toBe(0); // unchanged
		expect(config.gcTime).toBe(5 * 60 * 1000);
	});

	it('allows overriding both values', () => {
		const config = createQueryConfig('STATIC', { staleTime: 1000, gcTime: 2000 });
		expect(config.staleTime).toBe(1000);
		expect(config.gcTime).toBe(2000);
	});

	it('empty overrides return the preset unchanged', () => {
		const config = createQueryConfig('DEFAULT', {});
		expect(config).toEqual(QUERY_PRESETS.DEFAULT);
	});
});

describe('QUERY_PRESETS', () => {
	it('has exactly 3 presets', () => {
		const keys = Object.keys(QUERY_PRESETS);
		expect(keys).toHaveLength(3);
		expect(keys).toContain('REALTIME');
		expect(keys).toContain('DEFAULT');
		expect(keys).toContain('STATIC');
	});

	it('REALTIME staleTime is 0', () => {
		expect(QUERY_PRESETS.REALTIME.staleTime).toBe(0);
	});

	it('each preset has both staleTime and gcTime', () => {
		(Object.keys(QUERY_PRESETS) as QueryPresetName[]).forEach((key) => {
			expect(QUERY_PRESETS[key]).toHaveProperty('staleTime');
			expect(QUERY_PRESETS[key]).toHaveProperty('gcTime');
			expect(typeof QUERY_PRESETS[key].staleTime).toBe('number');
			expect(typeof QUERY_PRESETS[key].gcTime).toBe('number');
		});
	});

	it('gcTime is always >= staleTime', () => {
		(Object.keys(QUERY_PRESETS) as QueryPresetName[]).forEach((key) => {
			expect(QUERY_PRESETS[key].gcTime).toBeGreaterThanOrEqual(QUERY_PRESETS[key].staleTime);
		});
	});
});

describe('GLOBAL_QUERY_DEFAULTS', () => {
	it('equals the DEFAULT preset', () => {
		expect(GLOBAL_QUERY_DEFAULTS).toEqual(QUERY_PRESETS.DEFAULT);
	});
});
