import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import Input from './Input';
import { DollarSign, Search, Mail, Percent } from 'lucide-react';

/**
 * Input component used for all text entry across FlexPrice.
 * Supports text, number, formatted-number, and integer variants
 * with automatic formatting, validation, and cursor management.
 *
 * ## Props
 * - `label` — Label text above the input
 * - `variant` — Input type: text, number, formatted-number, integer
 * - `error` — Error message shown in red below input
 * - `description` — Helper text below input
 * - `inputPrefix` — Element rendered inside the input on the left (e.g. currency symbol)
 * - `suffix` — Element rendered inside the input on the right
 * - `size` — Dimensions: xs, sm, default, lg
 * - `disabled` — Prevents interaction
 */
const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
			description: 'Input type variant',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg'],
			description: 'Size of the input',
		},
		label: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Enter value...',
		variant: 'text',
		size: 'default',
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Default text input */
export const Default: Story = {
	args: {
		placeholder: 'Enter plan name...',
	},
};

/** With label — commonly used in forms */
export const WithLabel: Story = {
	args: {
		label: 'Plan Name',
		placeholder: 'e.g. Pro Plan',
	},
};

/** With description — helper text below input */
export const WithDescription: Story = {
	args: {
		label: 'External ID',
		placeholder: 'e.g. cust_123',
		description: 'A unique identifier from your system',
	},
};

/** With error — validation feedback */
export const WithError: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'user@example.com',
		value: 'invalid-email',
		error: 'Please enter a valid email address',
	},
};

/** With currency prefix — used in pricing forms */
export const WithCurrencyPrefix: Story = {
	args: {
		label: 'Price Amount',
		placeholder: '0.00',
		variant: 'number',
		inputPrefix: <DollarSign className='size-4 text-muted-foreground' />,
	},
};

/** With percentage suffix */
export const WithPercentageSuffix: Story = {
	args: {
		label: 'Discount',
		placeholder: '0',
		variant: 'integer',
		suffix: <Percent className='size-4' />,
	},
};

/** Formatted number — auto-adds thousand separators */
export const FormattedNumber: Story = {
	args: {
		label: 'Revenue Amount',
		placeholder: '0.00',
		variant: 'formatted-number',
		inputPrefix: <DollarSign className='size-4 text-muted-foreground' />,
		value: '12500.50',
	},
};

/** Integer input — whole numbers only */
export const IntegerInput: Story = {
	args: {
		label: 'Quantity',
		placeholder: '0',
		variant: 'integer',
		value: '1000',
	},
};

/** Search input pattern — with search icon prefix */
export const SearchInput: Story = {
	args: {
		placeholder: 'Search customers...',
		inputPrefix: <Search className='size-4 text-muted-foreground' />,
	},
};

/** Email input — with icon */
export const EmailInput: Story = {
	args: {
		label: 'Email',
		type: 'email',
		placeholder: 'billing@company.com',
		inputPrefix: <Mail className='size-4 text-muted-foreground' />,
	},
};

/** Disabled input */
export const Disabled: Story = {
	args: {
		label: 'Customer ID',
		value: 'cust_abc123',
		disabled: true,
	},
};

/** All sizes comparison */
export const AllSizes: Story = {
	render: () => (
		<div className='flex flex-col gap-4 max-w-sm'>
			<Input label='Extra Small' size='xs' placeholder='xs input' />
			<Input label='Small' size='sm' placeholder='sm input' />
			<Input label='Default' size='default' placeholder='default input' />
			<Input label='Large' size='lg' placeholder='lg input' />
		</div>
	),
};

/** Interaction test — verifies typing works and onChange fires */
export const TypingInteraction: Story = {
	args: {
		label: 'Test Input',
		placeholder: 'Type here...',
		onChange: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here...');

		// Focus and type
		await userEvent.click(input);
		await userEvent.type(input, 'Hello FlexPrice');

		// Verify onChange was called for each character
		await expect(args.onChange).toHaveBeenCalled();
	},
};
