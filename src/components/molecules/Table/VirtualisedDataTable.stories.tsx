import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';

/**
 * VirtualisedDataTable demonstrates virtualised rendering of large datasets.
 * Uses @tanstack/react-virtual to only render visible rows + overscan buffer,
 * enabling smooth scrolling with 10,000+ rows.
 */

interface VirtualRow {
	id: number;
	name: string;
	email: string;
	plan: string;
	status: string;
	mrr: string;
	createdAt: string;
}

// Generate mock data
const generateRows = (count: number): VirtualRow[] =>
	Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: `Company ${(i + 1).toLocaleString()}`,
		email: `billing@company${i + 1}.com`,
		plan: ['Starter', 'Pro', 'Growth', 'Enterprise'][i % 4],
		status: ['Active', 'Trialing', 'Past Due', 'Cancelled'][i % 4],
		mrr: `$${(Math.random() * 10000).toFixed(2)}`,
		createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
	}));

interface VirtualisedTableProps {
	/** Number of rows to generate */
	rowCount: number;
	/** Height of each row in px */
	rowHeight: number;
	/** Number of overscan rows to render outside viewport */
	overscan: number;
	/** Container height */
	height: number;
}

const VirtualisedDataTable: React.FC<VirtualisedTableProps> = ({ rowCount = 10000, rowHeight = 48, overscan = 10, height = 500 }) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const data = React.useMemo(() => generateRows(rowCount), [rowCount]);

	const virtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan,
	});

	const statusColors: Record<string, string> = {
		Active: 'bg-green-50 text-green-700',
		Trialing: 'bg-blue-50 text-blue-700',
		'Past Due': 'bg-amber-50 text-amber-700',
		Cancelled: 'bg-red-50 text-red-700',
	};

	return (
		<div className='space-y-3'>
			{/* Stats bar */}
			<div className='flex items-center justify-between text-sm text-muted-foreground px-1'>
				<span>
					{rowCount.toLocaleString()} rows · rendering <strong className='text-foreground'>{virtualizer.getVirtualItems().length}</strong>{' '}
					in DOM
				</span>
				<span>
					Scroll offset: {virtualizer.scrollOffset?.toFixed(0) ?? 0}px · Total height: {virtualizer.getTotalSize().toLocaleString()}px
				</span>
			</div>

			{/* Table */}
			<div className='rounded-lg border border-gray-200 overflow-hidden'>
				{/* Header */}
				<div className='grid grid-cols-[60px_2fr_2fr_1fr_100px_1fr_1fr] bg-gray-50 border-b border-gray-200'>
					{['#', 'Customer', 'Email', 'Plan', 'Status', 'MRR', 'Created'].map((header) => (
						<div key={header} className='px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
							{header}
						</div>
					))}
				</div>

				{/* Virtualised body */}
				<div ref={parentRef} className='overflow-auto' style={{ height }}>
					<div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative', width: '100%' }}>
						{virtualizer.getVirtualItems().map((virtualRow) => {
							const row = data[virtualRow.index];
							return (
								<div
									key={virtualRow.key}
									className={cn(
										'grid grid-cols-[60px_2fr_2fr_1fr_100px_1fr_1fr] items-center border-b border-gray-100',
										'hover:bg-gray-50/50 transition-colors',
										virtualRow.index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30',
									)}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
									}}>
									<div className='px-4 py-2 text-xs text-muted-foreground font-mono'>{row.id}</div>
									<div className='px-4 py-2 text-sm font-medium text-gray-900 truncate'>{row.name}</div>
									<div className='px-4 py-2 text-sm text-gray-600 truncate'>{row.email}</div>
									<div className='px-4 py-2 text-sm text-gray-600'>{row.plan}</div>
									<div className='px-4 py-2'>
										<span
											className={cn(
												'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
												statusColors[row.status] || 'bg-gray-50 text-gray-700',
											)}>
											{row.status}
										</span>
									</div>
									<div className='px-4 py-2 text-sm font-mono text-gray-900'>{row.mrr}</div>
									<div className='px-4 py-2 text-sm text-gray-500'>{row.createdAt}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const meta: Meta<typeof VirtualisedDataTable> = {
	title: 'Advanced/VirtualisedDataTable',
	component: VirtualisedDataTable,
	tags: ['autodocs'],
	argTypes: {
		rowCount: {
			control: { type: 'number', min: 100, max: 50000, step: 1000 },
			description: 'Number of rows to render',
		},
		rowHeight: {
			control: { type: 'number', min: 32, max: 80, step: 4 },
			description: 'Height of each row in pixels',
		},
		overscan: {
			control: { type: 'number', min: 0, max: 50, step: 5 },
			description: 'Number of overscan rows outside viewport',
		},
		height: {
			control: { type: 'number', min: 200, max: 800, step: 50 },
			description: 'Container scroll height in pixels',
		},
	},
	args: {
		rowCount: 10000,
		rowHeight: 48,
		overscan: 10,
		height: 500,
	},
};

export default meta;
type Story = StoryObj<typeof VirtualisedDataTable>;

/** 10,000 rows — default performance demo */
export const TenThousandRows: Story = {
	args: {
		rowCount: 10000,
	},
};

/** 1,000 rows — smaller dataset */
export const OneThousandRows: Story = {
	args: {
		rowCount: 1000,
	},
};

/** 50,000 rows — stress test */
export const FiftyThousandRows: Story = {
	args: {
		rowCount: 50000,
	},
};

/** Compact rows — smaller row height */
export const CompactRows: Story = {
	args: {
		rowCount: 10000,
		rowHeight: 36,
	},
};

/** High overscan — more pre-rendered rows */
export const HighOverscan: Story = {
	args: {
		rowCount: 10000,
		overscan: 30,
	},
};

export { VirtualisedDataTable };
