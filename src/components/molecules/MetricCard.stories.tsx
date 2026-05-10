import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

/**
 * MetricCard displays a single KPI metric on the FlexPrice dashboard.
 * Shows a title, formatted value (with optional currency or percentage),
 * and an optional trend indicator arrow.
 *
 * ## Props
 * - `title` — Label for the metric (e.g. "Monthly Revenue")
 * - `value` — Numeric value to display
 * - `currency` — ISO currency code for formatting (e.g. "USD")
 * - `isPercent` — Formats value as percentage
 * - `showChangeIndicator` — Shows trend arrow
 * - `isNegative` — Red down arrow instead of green up arrow
 */
const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		value: { control: 'number' },
		currency: { control: 'text' },
		isPercent: { control: 'boolean' },
		showChangeIndicator: { control: 'boolean' },
		isNegative: { control: 'boolean' },
	},
	args: {
		title: 'Monthly Revenue',
		value: 24500,
		currency: 'USD',
	},
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

/** Default — revenue metric with currency */
export const Default: Story = {
	args: {
		title: 'Monthly Revenue',
		value: 24500.75,
		currency: 'USD',
	},
};

/** With upward trend indicator */
export const TrendUp: Story = {
	args: {
		title: 'Active Subscriptions',
		value: 1250,
		showChangeIndicator: true,
		isNegative: false,
	},
};

/** With downward trend indicator */
export const TrendDown: Story = {
	args: {
		title: 'Churn Rate',
		value: 3.2,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: true,
	},
};

/** Percentage metric */
export const Percentage: Story = {
	args: {
		title: 'Payment Success Rate',
		value: 98.5,
		isPercent: true,
	},
};

/** Large number without currency */
export const LargeNumber: Story = {
	args: {
		title: 'Total Events',
		value: 1234567,
	},
};

/** Zero value */
export const ZeroValue: Story = {
	args: {
		title: 'Outstanding Invoices',
		value: 0,
		currency: 'USD',
	},
};

/** Dashboard layout — multiple cards in a grid */
export const DashboardGrid: Story = {
	render: () => (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			<MetricCard title='Monthly Revenue' value={24500.75} currency='USD' showChangeIndicator isNegative={false} />
			<MetricCard title='Active Subscriptions' value={1250} showChangeIndicator isNegative={false} />
			<MetricCard title='Churn Rate' value={3.2} isPercent showChangeIndicator isNegative />
			<MetricCard title='Avg. Invoice Value' value={196.4} currency='USD' />
		</div>
	),
};
