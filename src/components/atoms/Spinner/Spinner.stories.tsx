import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

/**
 * Spinner component for indicating loading state. Renders an animated
 * SVG circle spinner. Used throughout FlexPrice in buttons (via isLoading),
 * page transitions, and data fetching states.
 *
 * ## Props
 * - `size` — Diameter of the spinner in pixels (default: 24)
 * - `className` — Additional CSS classes for colour and spacing
 */
const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'number', min: 12, max: 64, step: 4 },
			description: 'Spinner diameter in pixels',
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes',
		},
	},
	args: {
		size: 24,
	},
	decorators: [
		(Story) => (
			<div className='flex items-center justify-center p-8'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** Default spinner at 24px */
export const Default: Story = {};

/** Small spinner (16px) — used inline with text */
export const Small: Story = {
	args: { size: 16 },
};

/** Medium spinner (32px) — used in card loading states */
export const Medium: Story = {
	args: { size: 32 },
};

/** Large spinner (48px) — used for page-level loading */
export const Large: Story = {
	args: { size: 48 },
};

/** Coloured spinners — using Tailwind text colour classes */
export const Colored: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			<Spinner size={32} className='text-primary' />
			<Spinner size={32} className='text-blue-500' />
			<Spinner size={32} className='text-green-500' />
			<Spinner size={32} className='text-red-500' />
			<Spinner size={32} className='text-amber-500' />
		</div>
	),
};

/** All sizes side by side */
export const AllSizes: Story = {
	render: () => (
		<div className='flex items-end gap-6'>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={16} />
				<span className='text-xs text-muted-foreground'>16px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={24} />
				<span className='text-xs text-muted-foreground'>24px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={32} />
				<span className='text-xs text-muted-foreground'>32px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={48} />
				<span className='text-xs text-muted-foreground'>48px</span>
			</div>
		</div>
	),
};

/** Loading state pattern — spinner with text */
export const LoadingState: Story = {
	render: () => (
		<div className='flex flex-col items-center gap-4 p-8'>
			<Spinner size={40} className='text-primary' />
			<p className='text-sm text-muted-foreground'>Loading data...</p>
		</div>
	),
};

/** Inline loading — spinner next to text */
export const InlineLoading: Story = {
	render: () => (
		<div className='flex items-center gap-2 text-sm text-muted-foreground'>
			<Spinner size={14} /> Fetching invoices...
		</div>
	),
};
