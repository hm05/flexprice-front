import { describe, it, expect } from 'vitest';
import formatNumber, { formatCompactNumber } from './format_number';

describe('formatNumber', () => {
	it('formats a number with no decimals by default', () => {
		expect(formatNumber(1234)).toBe('1,234');
	});

	it('formats a number with specified decimal places', () => {
		expect(formatNumber(1234.567, 2)).toBe('1,234.57');
	});

	it('formats a number with 0 decimal places explicitly', () => {
		expect(formatNumber(9999, 0)).toBe('9,999');
	});

	it('returns "-" for falsy value (0)', () => {
		// The existing function treats 0 as falsy
		expect(formatNumber(0)).toBe('-');
	});

	it('clamps decimals to valid range (0-20)', () => {
		// Should not throw for negative decimals
		expect(formatNumber(100, -5)).toBe('100');
		// Should not throw for decimals > 20
		expect(formatNumber(100, 25)).toBeDefined();
	});

	it('formats large numbers with thousand separators', () => {
		expect(formatNumber(1000000, 2)).toBe('1,000,000.00');
	});

	it('formats small numbers correctly', () => {
		expect(formatNumber(0.5, 2)).toBe('0.50');
	});

	it('formats negative numbers', () => {
		expect(formatNumber(-1234.5, 2)).toBe('-1,234.50');
	});
});

describe('formatCompactNumber', () => {
	it('formats thousands with k suffix', () => {
		expect(formatCompactNumber(10000)).toBe('10k');
	});

	it('formats millions with M suffix', () => {
		expect(formatCompactNumber(1500000)).toBe('1.5M');
	});

	it('formats billions with B suffix', () => {
		expect(formatCompactNumber(2000000000)).toBe('2B');
	});

	it('does not format numbers under 1000', () => {
		expect(formatCompactNumber(999)).toBe('999');
	});

	it('removes trailing .0 from compact format', () => {
		expect(formatCompactNumber(10000)).toBe('10k');
		expect(formatCompactNumber(1000000)).toBe('1M');
	});

	it('keeps decimal for non-round values', () => {
		expect(formatCompactNumber(1500)).toBe('1.5k');
	});
});
