import type { Meta, StoryObj } from '@storybook/react';
import PricingTierTable from './PricingTierTable';

/**
 * PricingTierTable displays tiered or graduated pricing for FlexPrice plans.
 * Shows how pricing scales with usage across defined tiers.
 */
const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		mode: {
			control: 'select',
			options: ['volume', 'slab'],
		},
		currencySymbol: { control: 'text' },
	},
	args: {
		currencySymbol: '$',
		mode: 'volume',
	},
	decorators: [
		(Story) => (
			<div className='max-w-2xl p-4'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

const apiCallTiers = [
	{ from: 0, to: 1000, unitAmount: '0.0100', flatAmount: '0' },
	{ from: 1001, to: 10000, unitAmount: '0.0080', flatAmount: '0' },
	{ from: 10001, to: 100000, unitAmount: '0.0050', flatAmount: '0' },
	{ from: 100001, to: null, unitAmount: '0.0020', flatAmount: '0' },
];

/** Volume tiered — single rate for all units based on total */
export const VolumeTiered: Story = {
	args: {
		tiers: apiCallTiers,
		mode: 'volume',
	},
};

/** Slab tiered — different rate for each tier range */
export const SlabTiered: Story = {
	args: {
		tiers: apiCallTiers,
		mode: 'slab',
	},
};

/** With flat fees — tier includes flat charge */
export const WithFlatFees: Story = {
	args: {
		tiers: [
			{ from: 0, to: 100, unitAmount: '0.50', flatAmount: '10.00' },
			{ from: 101, to: 500, unitAmount: '0.40', flatAmount: '5.00' },
			{ from: 501, to: null, unitAmount: '0.25', flatAmount: '0' },
		],
		mode: 'slab',
	},
};

/** Two tiers — simple pricing */
export const SimpleTwoTier: Story = {
	args: {
		tiers: [
			{ from: 0, to: 10000, unitAmount: '0.01' },
			{ from: 10001, to: null, unitAmount: '0.005' },
		],
		mode: 'volume',
	},
};

/** Euro currency */
export const EuroCurrency: Story = {
	args: {
		tiers: [
			{ from: 0, to: 5000, unitAmount: '0.0200' },
			{ from: 5001, to: 50000, unitAmount: '0.0150' },
			{ from: 50001, to: null, unitAmount: '0.0080' },
		],
		currencySymbol: '€',
		mode: 'volume',
	},
};

/** Many tiers — complex pricing structure */
export const ManyTiers: Story = {
	args: {
		tiers: [
			{ from: 0, to: 100, unitAmount: '1.0000' },
			{ from: 101, to: 500, unitAmount: '0.8000' },
			{ from: 501, to: 1000, unitAmount: '0.6000' },
			{ from: 1001, to: 5000, unitAmount: '0.4000' },
			{ from: 5001, to: 10000, unitAmount: '0.2000' },
			{ from: 10001, to: null, unitAmount: '0.1000' },
		],
		mode: 'slab',
	},
};
