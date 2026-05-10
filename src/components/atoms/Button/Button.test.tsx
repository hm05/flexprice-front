import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();
	});

	it('renders as disabled when disabled prop is true', () => {
		render(<Button disabled>Submit</Button>);
		const button = screen.getByRole('button', { name: 'Submit' });
		expect(button).toBeDisabled();
	});

	it('renders as disabled when isLoading is true', () => {
		render(<Button isLoading>Saving</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('shows spinner SVG when loading', () => {
		const { container } = render(<Button isLoading>Save</Button>);
		const svg = container.querySelector('svg.animate-spin');
		expect(svg).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Button onClick={handleClick}>Click</Button>);
		await user.click(screen.getByRole('button'));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button onClick={handleClick} disabled>
				Click
			</Button>,
		);
		await user.click(screen.getByRole('button'));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it('renders with prefix and suffix icons', () => {
		render(
			<Button prefixIcon={<span data-testid='prefix'>+</span>} suffixIcon={<span data-testid='suffix'>→</span>}>
				Add
			</Button>,
		);
		expect(screen.getByTestId('prefix')).toBeInTheDocument();
		expect(screen.getByTestId('suffix')).toBeInTheDocument();
	});

	it('applies variant classes correctly', () => {
		const { rerender } = render(<Button variant='destructive'>Delete</Button>);
		const button = screen.getByRole('button');
		expect(button.className).toContain('destructive');

		rerender(<Button variant='ghost'>Ghost</Button>);
		expect(screen.getByRole('button').className).toContain('hover:bg-accent');
	});
});
