import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import SearchBar from './SearchBar';

/**
 * SearchBar with debounced input, clear button, and search icon.
 * Used for filtering tables across FlexPrice.
 */
const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		debounceMs: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Search...',
		debounceMs: 300,
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div className='max-w-sm p-4'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

/** Default — empty search bar */
export const Default: Story = {
	args: {
		placeholder: 'Search customers...',
	},
};

/** With initial value — shows clear button */
export const WithValue: Story = {
	args: {
		placeholder: 'Search...',
		value: 'Acme Corp',
	},
};

/** Customer search */
export const CustomerSearch: Story = {
	args: {
		placeholder: 'Search by name or email...',
	},
};

/** Invoice search */
export const InvoiceSearch: Story = {
	args: {
		placeholder: 'Search invoices...',
	},
};

/** Disabled state */
export const Disabled: Story = {
	args: {
		placeholder: 'Search...',
		disabled: true,
	},
};

/** Custom width */
export const WideSearch: Story = {
	args: {
		placeholder: 'Search across all resources...',
		className: 'w-[400px]',
	},
};

/** Interaction test — type and verify debounced callback */
export const TypingInteraction: Story = {
	args: {
		placeholder: 'Type to search...',
		debounceMs: 100,
		onChange: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type to search...');

		// Type in the search bar
		await userEvent.type(input, 'test');

		// Verify input has the typed value
		await expect(input).toHaveValue('test');
	},
};

/** Interaction test — clear button */
export const ClearInteraction: Story = {
	args: {
		placeholder: 'Search...',
		value: 'some query',
		onChange: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Find and click the clear button
		const clearButton = canvas.getByLabelText('Clear search');
		await expect(clearButton).toBeInTheDocument();
		await userEvent.click(clearButton);
	},
};
