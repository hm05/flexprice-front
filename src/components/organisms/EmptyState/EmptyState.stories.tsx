import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EmptyState from './EmptyState';
import { FileText, Users, CreditCard, Package, BarChart3, Zap } from 'lucide-react';

/**
 * EmptyState is a full-page empty state component with icon, headline,
 * subtext, and CTA button. Used across FlexPrice when a page or
 * section has no data to display.
 */
const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	argTypes: {
		headline: { control: 'text' },
		description: { control: 'text' },
		actionLabel: { control: 'text' },
	},
	args: {
		onAction: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/** Default — invoices empty state */
export const Default: Story = {
	args: {
		icon: <FileText className='size-12' strokeWidth={1.5} />,
		headline: 'No invoices yet',
		description: 'Invoices will appear here once your customers have active subscriptions with billing cycles.',
		actionLabel: 'Create Subscription',
	},
};

/** Customers empty state */
export const CustomersEmpty: Story = {
	args: {
		icon: <Users className='size-12' strokeWidth={1.5} />,
		headline: 'No customers yet',
		description: 'Start by adding your first customer to begin managing subscriptions and billing.',
		actionLabel: 'Add Customer',
	},
};

/** Plans empty state */
export const PlansEmpty: Story = {
	args: {
		icon: <Package className='size-12' strokeWidth={1.5} />,
		headline: 'No pricing plans',
		description: 'Create your first pricing plan to start offering subscriptions to your customers.',
		actionLabel: 'Create Plan',
		secondaryActionLabel: 'View Documentation',
		onSecondaryAction: fn(),
	},
};

/** Subscriptions empty state */
export const SubscriptionsEmpty: Story = {
	args: {
		icon: <CreditCard className='size-12' strokeWidth={1.5} />,
		headline: 'No active subscriptions',
		description: 'Subscribe customers to plans to start generating invoices and tracking usage.',
		actionLabel: 'Create Subscription',
	},
};

/** Revenue empty state */
export const RevenueEmpty: Story = {
	args: {
		icon: <BarChart3 className='size-12' strokeWidth={1.5} />,
		headline: 'No revenue data',
		description: 'Revenue metrics will appear here once invoices are finalized and payments are received.',
	},
};

/** Events empty state */
export const EventsEmpty: Story = {
	args: {
		icon: <Zap className='size-12' strokeWidth={1.5} />,
		headline: 'No events received',
		description: 'Start sending usage events to FlexPrice to see them appear in the debugger.',
		actionLabel: 'View Integration Guide',
	},
};

/** Without icon */
export const WithoutIcon: Story = {
	args: {
		headline: 'Nothing here yet',
		description: 'Content will appear here when available.',
		actionLabel: 'Get Started',
	},
};

/** Without description — minimal variant */
export const WithoutDescription: Story = {
	args: {
		icon: <FileText className='size-12' strokeWidth={1.5} />,
		headline: 'No data available',
		actionLabel: 'Refresh',
	},
};

/** Without action — informational only */
export const InformationalOnly: Story = {
	args: {
		icon: <BarChart3 className='size-12' strokeWidth={1.5} />,
		headline: 'Usage data is processing',
		description: 'Your usage data is being aggregated. This usually takes a few minutes.',
	},
};
