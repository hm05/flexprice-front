import { describe, it, expect } from 'vitest';
import {
	toSentenceCase,
	formatEntityType,
	calculateCouponDiscount,
	calculateTotalCouponDiscount,
	formatDateShort,
} from './helper_functions';

describe('toSentenceCase', () => {
	it('capitalises first letter and lowercases rest', () => {
		expect(toSentenceCase('hello WORLD')).toBe('Hello world');
	});

	it('returns empty string for empty input', () => {
		expect(toSentenceCase('')).toBe('');
	});

	it('handles single character', () => {
		expect(toSentenceCase('a')).toBe('A');
	});

	it('handles already sentence-cased string', () => {
		expect(toSentenceCase('Hello')).toBe('Hello');
	});
});

describe('formatEntityType', () => {
	it('formats "events" to "Events"', () => {
		expect(formatEntityType('events')).toBe('Events');
	});

	it('formats "invoice" to "Invoice"', () => {
		expect(formatEntityType('invoice')).toBe('Invoice');
	});

	it('formats "credit_topups" to "Credit Top-ups"', () => {
		expect(formatEntityType('credit_topups')).toBe('Credit Top-ups');
	});

	it('formats generic snake_case to Title Case', () => {
		expect(formatEntityType('some_entity_type')).toBe('Some Entity Type');
	});

	it('returns empty string for empty input', () => {
		expect(formatEntityType('')).toBe('');
	});
});

describe('calculateCouponDiscount', () => {
	it('calculates fixed discount correctly', () => {
		const coupon = { type: 'fixed', amount_off: '10' };
		expect(calculateCouponDiscount(coupon, 100)).toBe(10);
	});

	it('caps fixed discount at original amount', () => {
		const coupon = { type: 'fixed', amount_off: '150' };
		expect(calculateCouponDiscount(coupon, 100)).toBe(100);
	});

	it('calculates percentage discount correctly', () => {
		const coupon = { type: 'percentage', percentage_off: '20' };
		expect(calculateCouponDiscount(coupon, 100)).toBe(20);
	});

	it('returns 0 for unknown coupon type', () => {
		const coupon = { type: 'unknown' };
		expect(calculateCouponDiscount(coupon, 100)).toBe(0);
	});

	it('returns 0 when no discount values provided', () => {
		const coupon = { type: 'fixed' };
		expect(calculateCouponDiscount(coupon, 100)).toBe(0);
	});
});

describe('calculateTotalCouponDiscount', () => {
	it('sums multiple coupon discounts', () => {
		const coupons = [
			{ type: 'fixed', amount_off: '10' },
			{ type: 'percentage', percentage_off: '10' },
		];
		// 10 (fixed) + 10 (10% of 100) = 20
		expect(calculateTotalCouponDiscount(coupons, 100)).toBe(20);
	});

	it('returns 0 for empty coupon array', () => {
		expect(calculateTotalCouponDiscount([], 100)).toBe(0);
	});
});

describe('formatDateShort', () => {
	it('formats date string to short format', () => {
		const result = formatDateShort('2025-01-15T00:00:00Z');
		expect(result).toContain('Jan');
		expect(result).toContain('15');
		expect(result).toContain('2025');
	});
});
