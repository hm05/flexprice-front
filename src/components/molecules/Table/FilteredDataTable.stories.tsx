import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FlexpriceTable from './Table';
import type { ColumnData } from './Table';
import Chip from '@/components/atoms/Chip/Chip';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import { useFilterStore } from '@/hooks/useFilterStore';

/**
 * Demonstrates the DataTable wired up to useFilterStore (Challenge A).
 * Filters persist in sessionStorage and sync a shallow fingerprint to the URL.
 */

interface MockCustomer {
	name: string;
	email: string;
	plan: string;
	status: string;
}

const allCustomers: MockCustomer[] = Array.from({ length: 30 }, (_, i) => ({
	name: ['Acme Corp', 'TechStart', 'DevTools', 'BigCo', 'Solo Studio', 'CloudNine', 'DataFlow'][i % 7] + ` ${i + 1}`,
	email: `billing@company${i + 1}.com`,
	plan: ['Starter', 'Pro', 'Growth', 'Enterprise'][i % 4],
	status: ['active', 'trialing', 'past_due', 'cancelled'][i % 4],
}));

const ROUTE = 'customers';

const FilteredDataTable: React.FC = () => {
	const { getFilters, setFilter, resetFilters, getFilterCount } = useFilterStore();
	const filters = getFilters(ROUTE);
	const filterCount = getFilterCount(ROUTE);

	// Apply filters to data
	const filteredData = allCustomers.filter((customer) => {
		const search = (filters.search as string) || '';
		const statusFilter = (filters.status as string) || '';

		const matchesSearch =
			!search || customer.name.toLowerCase().includes(search.toLowerCase()) || customer.email.toLowerCase().includes(search.toLowerCase());

		const matchesStatus = !statusFilter || customer.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const columns: ColumnData<MockCustomer>[] = [
		{ title: 'Customer', fieldName: 'name', fieldVariant: 'title', flex: 2 },
		{ title: 'Email', fieldName: 'email', flex: 2 },
		{ title: 'Plan', fieldName: 'plan' },
		{
			title: 'Status',
			render: (row) => {
				const variantMap: Record<string, 'success' | 'warning' | 'failed' | 'info'> = {
					active: 'success',
					trialing: 'info',
					past_due: 'warning',
					cancelled: 'failed',
				};
				return <Chip label={row.status} variant={variantMap[row.status] || 'default'} />;
			},
		},
	];

	return (
		<div className='space-y-4'>
			{/* Filter bar */}
			<div className='flex items-center gap-3'>
				<SearchBar
					placeholder='Search customers...'
					value={(filters.search as string) || ''}
					onChange={(value) => setFilter(ROUTE, 'search', value)}
					className='w-64'
				/>

				<select
					value={(filters.status as string) || ''}
					onChange={(e) => setFilter(ROUTE, 'status', e.target.value)}
					className='h-9 px-3 rounded-md border border-input bg-background text-sm'>
					<option value=''>All Statuses</option>
					<option value='active'>Active</option>
					<option value='trialing'>Trialing</option>
					<option value='past_due'>Past Due</option>
					<option value='cancelled'>Cancelled</option>
				</select>

				{filterCount > 0 && (
					<button onClick={() => resetFilters(ROUTE)} className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
						Clear filters ({filterCount})
					</button>
				)}
			</div>

			{/* Info bar */}
			<div className='text-xs text-muted-foreground'>
				Showing {filteredData.length} of {allCustomers.length} customers
				{filterCount > 0 && <span> · {filterCount} filter(s) active · stored in sessionStorage</span>}
			</div>

			{/* Table */}
			<FlexpriceTable columns={columns} data={filteredData} showEmptyRow />
		</div>
	);
};

const meta: Meta<typeof FilteredDataTable> = {
	title: 'Advanced/FilteredDataTable',
	component: FilteredDataTable,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'DataTable wired to useFilterStore (Zustand). Filters persist in sessionStorage and sync a shallow count to the URL.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof FilteredDataTable>;

/** Default — interactive filter demo */
export const Default: Story = {};
