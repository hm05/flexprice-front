import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateRangePicker from './DateRangePicker';

/**
 * DateRangePicker used throughout FlexPrice for analytics filtering,
 * invoice period selection, and usage date ranges. Built on Radix
 * Popover with react-day-picker calendar, supporting timezone
 * switching (local / UTC).
 *
 * ## Props
 * - `startDate` / `endDate` — Controlled date range
 * - `onChange` — Callback with { startDate, endDate }
 * - `placeholder` — Text when no range is selected
 * - `title` — Label above the picker
 * - `minDate` / `maxDate` — Constrain selectable range
 * - `disabled` — Prevents interaction
 */
const meta: Meta<typeof DateRangePicker> = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		title: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	args: {
		onChange: fn(),
		placeholder: 'Select Range',
	},
	decorators: [
		(Story) => (
			<div className='p-4 min-h-[400px]'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

/** Default — no range selected */
export const Default: Story = {
	args: {
		placeholder: 'Select date range',
	},
};

/** With title label */
export const WithTitle: Story = {
	args: {
		title: 'Billing Period',
		placeholder: 'Select date range',
	},
};

/** With pre-selected range */
export const WithPreselectedRange: Story = {
	args: {
		title: 'Invoice Period',
		startDate: new Date(2025, 0, 1),
		endDate: new Date(2025, 0, 31),
	},
};

/** Disabled state */
export const Disabled: Story = {
	args: {
		title: 'Date Range',
		placeholder: 'Select range',
		disabled: true,
	},
};

/** With min/max date constraints */
export const WithConstraints: Story = {
	args: {
		title: 'Usage Period',
		placeholder: 'Select range',
		minDate: new Date(2025, 0, 1),
		maxDate: new Date(),
	},
};

/** Custom width */
export const CustomWidth: Story = {
	args: {
		title: 'Analytics Period',
		placeholder: 'Pick dates',
		className: 'w-[300px]',
	},
};
