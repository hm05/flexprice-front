import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * SearchBar component with debounced input, clear button, and search icon.
 * Used across FlexPrice for filtering tables (customers, invoices, plans).
 *
 * @param value — Controlled input value
 * @param onChange — Callback fired with debounced value
 * @param placeholder — Placeholder text
 * @param debounceMs — Debounce delay in milliseconds (default: 300)
 * @param className — Additional CSS classes
 */
interface SearchBarProps {
	/** Controlled input value */
	value?: string;
	/** Callback with debounced search value */
	onChange?: (value: string) => void;
	/** Placeholder text */
	placeholder?: string;
	/** Debounce delay in ms */
	debounceMs?: number;
	/** Additional CSS classes */
	className?: string;
	/** Disable the search bar */
	disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
	value: controlledValue,
	onChange,
	placeholder = 'Search...',
	debounceMs = 300,
	className,
	disabled = false,
}) => {
	const [internalValue, setInternalValue] = useState(controlledValue || '');

	const debouncedOnChange = useDebouncedCallback((val: string) => {
		onChange?.(val);
	}, debounceMs);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setInternalValue(newValue);
			debouncedOnChange(newValue);
		},
		[debouncedOnChange],
	);

	const handleClear = useCallback(() => {
		setInternalValue('');
		onChange?.('');
	}, [onChange]);

	return (
		<div
			className={cn(
				'flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background text-sm',
				'focus-within:ring-1 focus-within:ring-ring focus-within:border-black',
				'transition-all duration-150',
				disabled && 'opacity-50 cursor-not-allowed',
				className,
			)}>
			<Search className='size-4 text-muted-foreground shrink-0' />
			<input
				type='text'
				value={internalValue}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				className='flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-0'
			/>
			{internalValue && !disabled && (
				<button onClick={handleClear} className='shrink-0 p-0.5 rounded hover:bg-muted transition-colors' aria-label='Clear search'>
					<X className='size-3.5 text-muted-foreground' />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
