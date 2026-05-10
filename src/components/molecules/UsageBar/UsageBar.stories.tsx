import type { Meta, StoryObj } from '@storybook/react';
import UsageBar from './UsageBar';

/**
 * UsageBar / MeterProgress shows a customer's usage consumption
 * against their entitlement. Colour-coded: blue (normal),
 * amber (≥80%), red (exceeded).
 */
const meta: Meta<typeof UsageBar> = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	tags: ['autodocs'],
	argTypes: {
		used: { control: { type: 'number', min: 0, max: 100000 } },
		entitled: { control: { type: 'number', min: 0, max: 100000 } },
		label: { control: 'text' },
		unit: { control: 'text' },
		showPercentage: { control: 'boolean' },
	},
	args: {
		used: 7500,
		entitled: 10000,
		label: 'API Calls',
		unit: 'calls',
		showPercentage: true,
	},
	decorators: [
		(Story) => (
			<div className='max-w-md p-4'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof UsageBar>;

/** Default — 75% usage, normal blue */
export const Default: Story = {
	args: {
		used: 7500,
		entitled: 10000,
		label: 'API Calls',
		unit: 'calls',
	},
};

/** Low usage — early in billing cycle */
export const LowUsage: Story = {
	args: {
		used: 1200,
		entitled: 10000,
		label: 'API Calls',
		unit: 'calls',
	},
};

/** Near limit — amber warning at 80%+ */
export const NearLimit: Story = {
	args: {
		used: 8500,
		entitled: 10000,
		label: 'API Calls',
		unit: 'calls',
	},
};

/** At limit — 100% used */
export const AtLimit: Story = {
	args: {
		used: 10000,
		entitled: 10000,
		label: 'Storage',
		unit: 'GB',
	},
};

/** Exceeded — red warning with overage message */
export const Exceeded: Story = {
	args: {
		used: 12500,
		entitled: 10000,
		label: 'API Calls',
		unit: 'calls',
	},
};

/** Zero usage — empty bar */
export const Empty: Story = {
	args: {
		used: 0,
		entitled: 10000,
		label: 'Events',
		unit: 'events',
	},
};

/** Without percentage */
export const WithoutPercentage: Story = {
	args: {
		used: 500,
		entitled: 1000,
		label: 'Seats',
		unit: 'seats',
		showPercentage: false,
	},
};

/** Multiple meters — subscription entitlement overview */
export const MultipleMeters: Story = {
	render: () => (
		<div className='space-y-6'>
			<UsageBar used={7500} entitled={10000} label='API Calls' unit='calls' />
			<UsageBar used={4.2} entitled={5} label='Storage' unit='GB' />
			<UsageBar used={8} entitled={10} label='Team Seats' unit='seats' />
			<UsageBar used={95000} entitled={100000} label='Events' unit='events' />
		</div>
	),
};
