import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';
import { Info, HelpCircle, AlertTriangle } from 'lucide-react';

/**
 * Tooltip component for displaying contextual information on hover.
 * Built on Radix UI Tooltip primitives with configurable delay,
 * position, and alignment.
 *
 * ## Props
 * - `children` — The trigger element
 * - `content` — Tooltip content (string or ReactNode)
 * - `delayDuration` — Delay before showing in ms (default: instant)
 * - `side` — Position: top, right, bottom, left
 * - `align` — Alignment: start, center, end
 * - `sideOffset` — Distance from trigger in px
 */
const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Position relative to trigger',
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
			description: 'Alignment on the chosen side',
		},
		delayDuration: {
			control: { type: 'number', min: 0, max: 2000, step: 100 },
			description: 'Delay before showing (ms)',
		},
		sideOffset: {
			control: { type: 'number', min: 0, max: 20, step: 1 },
			description: 'Offset from trigger (px)',
		},
	},
	args: {
		content: 'Helpful tooltip text',
		side: 'top',
		align: 'center',
		sideOffset: 4,
	},
	decorators: [
		(Story) => (
			<div className='flex items-center justify-center p-20'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Default — tooltip on a button trigger */
export const Default: Story = {
	args: {
		content: 'Create a new pricing plan',
		children: <Button>Hover me</Button>,
	},
};

/** Info icon tooltip — common FlexPrice pattern */
export const InfoIcon: Story = {
	args: {
		content: 'Usage is metered based on API calls per billing period',
		children: (
			<span className='inline-flex items-center cursor-help'>
				<Info className='size-4 text-muted-foreground' />
			</span>
		),
	},
};

/** Help tooltip — with question mark icon */
export const HelpIcon: Story = {
	args: {
		content: 'This field determines how customers are billed for their usage',
		children: (
			<span className='inline-flex items-center gap-1 text-sm text-muted-foreground cursor-help'>
				Billing Model <HelpCircle className='size-3' />
			</span>
		),
	},
};

/** Warning tooltip */
export const WarningTooltip: Story = {
	args: {
		content: 'This action cannot be undone',
		children: (
			<span className='inline-flex items-center cursor-help'>
				<AlertTriangle className='size-4 text-amber-500' />
			</span>
		),
	},
};

/** With delay — waits before showing */
export const WithDelay: Story = {
	args: {
		content: 'This tooltip has a 500ms delay',
		delayDuration: 500,
		children: <Button variant='outline'>Hover (500ms delay)</Button>,
	},
};

/** Long delay — 1 second */
export const LongDelay: Story = {
	args: {
		content: 'This tooltip has a 1 second delay',
		delayDuration: 1000,
		children: <Button variant='ghost'>Hover (1s delay)</Button>,
	},
};

/** All sides — position comparison */
export const AllSides: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-8 p-10'>
			<Tooltip content='Top tooltip' side='top'>
				<Button variant='outline'>Top</Button>
			</Tooltip>
			<Tooltip content='Right tooltip' side='right'>
				<Button variant='outline'>Right</Button>
			</Tooltip>
			<Tooltip content='Bottom tooltip' side='bottom'>
				<Button variant='outline'>Bottom</Button>
			</Tooltip>
			<Tooltip content='Left tooltip' side='left'>
				<Button variant='outline'>Left</Button>
			</Tooltip>
		</div>
	),
};

/** Rich content tooltip — with formatted content */
export const RichContent: Story = {
	args: {
		content: (
			<div className='space-y-1'>
				<p className='font-medium'>Tiered Pricing</p>
				<p className='text-xs text-muted-foreground'>Price per unit decreases as usage increases across defined tiers.</p>
			</div>
		),
		children: <span className='text-sm underline decoration-dotted cursor-help'>What is tiered pricing?</span>,
	},
};
