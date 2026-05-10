import type { Meta, StoryObj } from '@storybook/react';
import FlexpriceTable from './Table';
import type { ColumnData } from './Table';
import Chip from '@/components/atoms/Chip/Chip';
import { MoreHorizontal } from 'lucide-react';

/**
 * DataTable (FlexpriceTable) is the primary table component in FlexPrice.
 * Renders tabular data with configurable columns, row click handlers,
 * empty states, and variant styling.
 *
 * ## Props
 * - `columns` — Column definitions with title, width, render functions, alignment
 * - `data` — Array of row objects
 * - `onRowClick` — Handler when a row is clicked
 * - `showEmptyRow` — Shows placeholder row when data is empty
 * - `hideBottomBorder` — Removes bottom border on last row
 * - `variant` — "default" (bordered) or "no-bordered"
 */
const meta: Meta<typeof FlexpriceTable> = {
	title: 'Molecules/DataTable',
	component: FlexpriceTable,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'no-bordered'],
		},
		showEmptyRow: { control: 'boolean' },
		hideBottomBorder: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof FlexpriceTable>;

// --- Mock data ---
interface Customer {
	name: string;
	email: string;
	plan: string;
	status: string;
	mrr: string;
}

const mockCustomers: Customer[] = [
	{ name: 'Acme Corp', email: 'billing@acme.com', plan: 'Enterprise', status: 'active', mrr: '$2,400' },
	{ name: 'Startup Inc', email: 'admin@startup.io', plan: 'Pro', status: 'active', mrr: '$99' },
	{ name: 'DevTools Ltd', email: 'finance@devtools.dev', plan: 'Growth', status: 'trialing', mrr: '$499' },
	{ name: 'BigCo Industries', email: 'ap@bigco.com', plan: 'Enterprise', status: 'past_due', mrr: '$4,800' },
	{ name: 'Solo Studio', email: 'hello@solo.design', plan: 'Starter', status: 'cancelled', mrr: '$0' },
];

const customerColumns: ColumnData<Customer>[] = [
	{ title: 'Customer', fieldName: 'name', fieldVariant: 'title', flex: 2 },
	{ title: 'Email', fieldName: 'email', flex: 2 },
	{ title: 'Plan', fieldName: 'plan' },
	{
		title: 'Status',
		render: (row) => {
			const variantMap: Record<string, 'success' | 'warning' | 'failed' | 'info' | 'default'> = {
				active: 'success',
				trialing: 'info',
				past_due: 'warning',
				cancelled: 'failed',
			};
			const labelMap: Record<string, string> = {
				active: 'Active',
				trialing: 'Trialing',
				past_due: 'Past Due',
				cancelled: 'Cancelled',
			};
			return <Chip label={labelMap[row.status] || row.status} variant={variantMap[row.status] || 'default'} />;
		},
	},
	{ title: 'MRR', fieldName: 'mrr', align: 'right' },
];

/** Default — customer list table */
export const Default: Story = {
	args: {
		columns: customerColumns,
		data: mockCustomers,
	},
};

/** With row click — rows are clickable */
export const WithRowClick: Story = {
	args: {
		columns: customerColumns,
		data: mockCustomers,
		onRowClick: (row: Customer) => alert(`Clicked: ${row.name}`),
	},
};

/** Empty state — no data with placeholder row */
export const EmptyState: Story = {
	args: {
		columns: customerColumns,
		data: [],
		showEmptyRow: true,
	},
};

/** No-bordered variant */
export const NoBorderedVariant: Story = {
	args: {
		columns: customerColumns,
		data: mockCustomers,
		variant: 'no-bordered',
	},
};

// --- Invoice table mock ---
interface MockInvoice {
	invoiceNumber: string;
	customer: string;
	amount: string;
	status: string;
	dueDate: string;
}

const mockInvoices: MockInvoice[] = [
	{ invoiceNumber: 'INV-001', customer: 'Acme Corp', amount: '$2,400.00', status: 'FINALIZED', dueDate: '2025-01-15' },
	{ invoiceNumber: 'INV-002', customer: 'Startup Inc', amount: '$99.00', status: 'DRAFT', dueDate: '2025-01-20' },
	{ invoiceNumber: 'INV-003', customer: 'DevTools Ltd', amount: '$499.00', status: 'VOIDED', dueDate: '2025-01-10' },
	{ invoiceNumber: 'INV-004', customer: 'BigCo', amount: '$4,800.00', status: 'FINALIZED', dueDate: '2025-02-01' },
];

const invoiceColumns: ColumnData<MockInvoice>[] = [
	{ title: 'Invoice #', fieldName: 'invoiceNumber', fieldVariant: 'title' },
	{ title: 'Customer', fieldName: 'customer' },
	{ title: 'Amount', fieldName: 'amount', align: 'right' },
	{
		title: 'Status',
		render: (row) => {
			const map: Record<string, 'success' | 'info' | 'failed' | 'default'> = {
				FINALIZED: 'info',
				DRAFT: 'default',
				VOIDED: 'failed',
			};
			return <Chip label={row.status} variant={map[row.status] || 'default'} />;
		},
	},
	{ title: 'Due Date', fieldName: 'dueDate', align: 'right' },
];

/** Invoice table — realistic FlexPrice invoice list */
export const InvoiceTable: Story = {
	args: {
		columns: invoiceColumns,
		data: mockInvoices,
	},
};

/** With action column — demonstrating interactive cell */
export const WithActions: Story = {
	args: {
		columns: [
			...customerColumns,
			{
				title: '',
				width: 50,
				fieldVariant: 'interactive' as const,
				render: () => (
					<button className='p-1 rounded hover:bg-muted' data-interactive='true'>
						<MoreHorizontal className='size-4 text-muted-foreground' />
					</button>
				),
			},
		],
		data: mockCustomers,
	},
};

/** Many rows — for scroll testing */
export const ManyRows: Story = {
	args: {
		columns: customerColumns,
		data: Array.from({ length: 50 }, (_, i) => ({
			name: `Company ${i + 1}`,
			email: `billing@company${i + 1}.com`,
			plan: ['Starter', 'Pro', 'Growth', 'Enterprise'][i % 4],
			status: ['active', 'trialing', 'past_due', 'cancelled'][i % 4],
			mrr: `$${(Math.random() * 5000).toFixed(0)}`,
		})),
	},
};
