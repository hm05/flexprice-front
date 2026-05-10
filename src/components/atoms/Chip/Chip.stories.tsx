import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import Chip from './Chip';
import { Check, X, AlertCircle, Clock, Info as InfoIcon } from 'lucide-react';

/**
 * Chip (Badge/StatusChip) component used across FlexPrice to display
 * status indicators for plans, invoices, subscriptions, and features.
 *
 * ## Props
 * - `label` — Text or ReactNode content
 * - `variant` — Colour scheme: default (grey), success (green), warning (orange), failed (red), info (blue)
 * - `icon` — Leading icon
 * - `childrenAfter` — Trailing content
 * - `onClick` — Makes the chip clickable
 * - `disabled` — Prevents interaction
 * - `textColor/bgColor/borderColor` — Override variant colours
 */
const meta: Meta<typeof Chip> = {
	title: 'Atoms/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
			description: 'Colour scheme variant',
		},
		label: {
			control: 'text',
			description: 'Text content of the chip',
		},
		disabled: {
			control: 'boolean',
			description: 'Disables chip interaction',
		},
	},
	args: {
		label: 'Active',
		variant: 'success',
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

/** Default — grey neutral chip for default/unknown states */
export const Default: Story = {
	args: {
		label: 'Draft',
		variant: 'default',
	},
};

/** Success — green chip for active/published/paid states */
export const Success: Story = {
	args: {
		label: 'Active',
		variant: 'success',
		icon: <Check className='size-3' />,
	},
};

/** Warning — orange chip for pending/expiring states */
export const Warning: Story = {
	args: {
		label: 'Pending',
		variant: 'warning',
		icon: <Clock className='size-3' />,
	},
};

/** Failed — red chip for error/voided/cancelled states */
export const Failed: Story = {
	args: {
		label: 'Voided',
		variant: 'failed',
		icon: <X className='size-3' />,
	},
};

/** Info — blue chip for informational states */
export const Info: Story = {
	args: {
		label: 'Finalized',
		variant: 'info',
		icon: <InfoIcon className='size-3' />,
	},
};

/** Plan status chips — as seen in FlexPrice plan list */
export const PlanStatuses: Story = {
	render: () => (
		<div className='flex gap-2 flex-wrap'>
			<Chip label='Active' variant='success' icon={<Check className='size-3' />} />
			<Chip label='Archived' variant='default' />
			<Chip label='Draft' variant='warning' icon={<Clock className='size-3' />} />
		</div>
	),
};

/** Invoice status chips — as seen in FlexPrice invoice table */
export const InvoiceStatuses: Story = {
	render: () => (
		<div className='flex gap-2 flex-wrap'>
			<Chip label='Draft' variant='default' />
			<Chip label='Finalized' variant='info' icon={<Check className='size-3' />} />
			<Chip label='Voided' variant='failed' icon={<X className='size-3' />} />
			<Chip label='Skipped' variant='warning' icon={<AlertCircle className='size-3' />} />
		</div>
	),
};

/** Subscription status chips */
export const SubscriptionStatuses: Story = {
	render: () => (
		<div className='flex gap-2 flex-wrap'>
			<Chip label='Active' variant='success' />
			<Chip label='Trialing' variant='info' />
			<Chip label='Past Due' variant='warning' />
			<Chip label='Cancelled' variant='failed' />
			<Chip label='Paused' variant='default' />
		</div>
	),
};

/** Disabled chip — reduced opacity, non-interactive */
export const DisabledChip: Story = {
	args: {
		label: 'Disabled',
		variant: 'success',
		disabled: true,
	},
};

/** With trailing content */
export const WithChildrenAfter: Story = {
	args: {
		label: 'Filter',
		variant: 'default',
		childrenAfter: <X className='size-3 cursor-pointer' />,
	},
};

/** Custom colours — override variant defaults */
export const CustomColors: Story = {
	args: {
		label: 'Custom',
		bgColor: '#F0EBFF',
		textColor: '#6B47ED',
		borderColor: '#D8CCFF',
	},
};

/** Clickable chip — interaction test */
export const Clickable: Story = {
	args: {
		label: 'Click me',
		variant: 'info',
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const chip = canvas.getByText('Click me');

		await userEvent.click(chip);
		await expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};
