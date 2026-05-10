import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FlexPriceSelect from './Select';

/**
 * Select/Dropdown component used for option selection in forms across FlexPrice.
 * Built on Radix UI Select primitives with support for radio-style items,
 * descriptions, prefix/suffix icons, and custom triggers.
 *
 * ## Props
 * - `options` — Array of { value, label, description?, disabled?, prefixIcon?, suffixIcon? }
 * - `value` — Currently selected value
 * - `placeholder` — Placeholder text when no option is selected
 * - `label` — Label text above the select
 * - `error` — Error message shown in red below
 * - `description` — Helper text below select
 * - `isRadio` — Use radio-button style items
 * - `disabled` — Prevents interaction
 * - `noOptionsText` — Text shown when options array is empty
 */
const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		isRadio: { control: 'boolean' },
	},
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const basicOptions = [
	{ value: 'usd', label: 'USD — US Dollar' },
	{ value: 'eur', label: 'EUR — Euro' },
	{ value: 'gbp', label: 'GBP — British Pound' },
	{ value: 'inr', label: 'INR — Indian Rupee' },
];

const billingOptions = [
	{ value: 'monthly', label: 'Monthly', description: 'Billed every month' },
	{ value: 'quarterly', label: 'Quarterly', description: 'Billed every 3 months' },
	{ value: 'annual', label: 'Annual', description: 'Billed once a year — save 20%' },
];

const statusOptions = [
	{ value: 'active', label: 'Active' },
	{ value: 'archived', label: 'Archived' },
	{ value: 'draft', label: 'Draft', disabled: true },
];

/** Default select with currency options */
export const Default: Story = {
	args: {
		options: basicOptions,
		placeholder: 'Select currency',
	},
};

/** With label and required indicator */
export const WithLabel: Story = {
	args: {
		options: basicOptions,
		label: 'Billing Currency',
		required: true,
		placeholder: 'Select currency',
	},
};

/** Pre-selected value */
export const WithValue: Story = {
	args: {
		options: basicOptions,
		label: 'Currency',
		value: 'usd',
	},
};

/** With error message */
export const WithError: Story = {
	args: {
		options: basicOptions,
		label: 'Currency',
		placeholder: 'Select currency',
		error: 'Currency is required',
	},
};

/** With description helper text */
export const WithDescription: Story = {
	args: {
		options: basicOptions,
		label: 'Currency',
		placeholder: 'Select currency',
		description: 'This will be used for all invoices in this plan',
	},
};

/** Radio style items — with descriptions */
export const RadioStyle: Story = {
	args: {
		options: billingOptions,
		label: 'Billing Period',
		placeholder: 'Select billing period',
		isRadio: true,
	},
};

/** With disabled options */
export const WithDisabledOptions: Story = {
	args: {
		options: statusOptions,
		label: 'Status Filter',
		placeholder: 'Filter by status',
	},
};

/** Disabled select */
export const Disabled: Story = {
	args: {
		options: basicOptions,
		label: 'Currency',
		value: 'usd',
		disabled: true,
	},
};

/** Empty options with helper text */
export const EmptyOptions: Story = {
	args: {
		options: [],
		label: 'Plan',
		placeholder: 'Select a plan',
		noOptionsText: 'No plans available. Create one first.',
	},
};
