import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import Button from './Button';
import { Plus, ArrowRight, Trash2, Download } from 'lucide-react';

/**
 * Primary button component used throughout FlexPrice for actions,
 * form submissions, and navigation. Built on Radix UI Slot with
 * class-variance-authority for variant/size management.
 *
 * ## Props
 * - `variant` — Visual style: default (teal), destructive (red), outline, secondary, ghost, link, black
 * - `size` — Dimensions: xs, sm, default, lg, icon
 * - `isLoading` — Shows spinner and disables interaction
 * - `disabled` — Prevents interaction with reduced opacity
 * - `prefixIcon` — Icon rendered before children
 * - `suffixIcon` — Icon rendered after children
 * - `asChild` — Merges props onto child element via Radix Slot
 */
const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'black'],
			description: 'Visual style variant',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg', 'icon'],
			description: 'Size of the button',
		},
		isLoading: {
			control: 'boolean',
			description: 'Shows loading spinner',
		},
		disabled: {
			control: 'boolean',
			description: 'Disables the button',
		},
	},
	args: {
		children: 'Button',
		variant: 'default',
		size: 'default',
		isLoading: false,
		disabled: false,
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Default button — primary teal background used for main actions */
export const Default: Story = {
	args: {
		children: 'Create Plan',
	},
};

/** Destructive — red variant for dangerous actions like deletion */
export const Destructive: Story = {
	args: {
		children: 'Delete Customer',
		variant: 'destructive',
	},
};

/** Outline — bordered button for secondary actions */
export const Outline: Story = {
	args: {
		children: 'Cancel',
		variant: 'outline',
	},
};

/** Ghost — transparent button for toolbar actions */
export const Ghost: Story = {
	args: {
		children: 'View Details',
		variant: 'ghost',
	},
};

/** Secondary — muted background for less prominent actions */
export const Secondary: Story = {
	args: {
		children: 'Export CSV',
		variant: 'secondary',
	},
};

/** Link — styled as text link with underline on hover */
export const Link: Story = {
	args: {
		children: 'Learn more',
		variant: 'link',
	},
};

/** Loading — shows spinner animation while processing */
export const Loading: Story = {
	args: {
		children: 'Saving...',
		isLoading: true,
	},
};

/** Disabled — non-interactive with reduced opacity */
export const Disabled: Story = {
	args: {
		children: 'Submit',
		disabled: true,
	},
};

/** With prefix icon — icon before the label text */
export const WithPrefixIcon: Story = {
	args: {
		children: 'Add Feature',
		prefixIcon: <Plus className='size-4' />,
	},
};

/** With suffix icon — icon after the label text */
export const WithSuffixIcon: Story = {
	args: {
		children: 'Next Step',
		suffixIcon: <ArrowRight className='size-4' />,
	},
};

/** Icon only — compact button for toolbars */
export const IconOnly: Story = {
	args: {
		children: <Trash2 className='size-4' />,
		size: 'icon',
		variant: 'ghost',
	},
};

/** All sizes — visual comparison of size variants */
export const AllSizes: Story = {
	render: () => (
		<div className='flex items-center gap-3'>
			<Button size='xs'>Extra Small</Button>
			<Button size='sm'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='lg'>Large</Button>
			<Button size='icon'>
				<Download className='size-4' />
			</Button>
		</div>
	),
};

/** All variants — side-by-side comparison */
export const AllVariants: Story = {
	render: () => (
		<div className='flex items-center gap-3 flex-wrap'>
			<Button variant='default'>Default</Button>
			<Button variant='black'>Black</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	),
};

/** Interaction test — verifies button click fires correctly */
export const ClickInteraction: Story = {
	args: {
		children: 'Click Me',
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Click Me' });

		// Button should be enabled
		await expect(button).toBeEnabled();

		// Click the button
		await userEvent.click(button);

		// Verify click handler was called
		await expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};

/** Interaction test — loading button should be disabled */
export const LoadingDisablesClick: Story = {
	args: {
		children: 'Processing...',
		isLoading: true,
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');

		// Loading button should be disabled
		await expect(button).toBeDisabled();

		// Attempt click — should not fire
		await userEvent.click(button);
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};
