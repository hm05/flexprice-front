import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from './Chip';

describe('Chip', () => {
	it('renders with label text', () => {
		render(<Chip label='Active' />);
		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('renders with success variant styles', () => {
		const { container } = render(<Chip label='Active' variant='success' />);
		const chip = container.firstChild as HTMLElement;
		expect(chip.style.backgroundColor).toBe('rgb(236, 251, 228)'); // #ECFBE4
	});

	it('renders with failed variant styles', () => {
		const { container } = render(<Chip label='Voided' variant='failed' />);
		const chip = container.firstChild as HTMLElement;
		expect(chip.style.backgroundColor).toBe('rgb(254, 226, 226)'); // #FEE2E2
	});

	it('renders with an icon', () => {
		render(<Chip label='Active' icon={<span data-testid='icon'>✓</span>} />);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('renders children after content', () => {
		render(<Chip label='Filter' childrenAfter={<span data-testid='after'>×</span>} />);
		expect(screen.getByTestId('after')).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Chip label='Click me' onClick={handleClick} />);
		await user.click(screen.getByText('Click me'));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Chip label='Disabled' onClick={handleClick} disabled />);
		await user.click(screen.getByText('Disabled'));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it('applies custom colours over variant defaults', () => {
		const { container } = render(<Chip label='Custom' bgColor='#FF0000' textColor='#FFFFFF' />);
		const chip = container.firstChild as HTMLElement;
		expect(chip.style.backgroundColor).toBe('rgb(255, 0, 0)');
		expect(chip.style.color).toBe('rgb(255, 255, 255)');
	});

	it('has aria-disabled attribute when disabled', () => {
		const { container } = render(<Chip label='Disabled' disabled />);
		const chip = container.firstChild as HTMLElement;
		expect(chip.getAttribute('aria-disabled')).toBe('true');
	});
});
