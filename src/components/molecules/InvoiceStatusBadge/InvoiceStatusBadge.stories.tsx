import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';

/**
 * InvoiceStatusBadge maps FlexPrice invoice status strings to
 * coloured chips with appropriate icons. Used across invoice tables,
 * detail views, and dashboard summaries.
 */
const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['DRAFT', 'FINALIZED', 'VOIDED', 'SKIPPED'],
			description: 'Invoice status from the API',
		},
	},
	args: {
		status: 'FINALIZED',
	},
	decorators: [
		(Story) => (
			<div className='p-4'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusBadge>;

/** Draft — grey, pending finalisation */
export const Draft: Story = {
	args: { status: 'DRAFT' },
};

/** Finalized — blue, invoice is confirmed */
export const Finalized: Story = {
	args: { status: 'FINALIZED' },
};

/** Voided — red, invoice was cancelled */
export const Voided: Story = {
	args: { status: 'VOIDED' },
};

/** Skipped — amber, billing cycle was skipped */
export const Skipped: Story = {
	args: { status: 'SKIPPED' },
};

/** All statuses — side by side comparison */
export const AllStatuses: Story = {
	render: () => (
		<div className='flex gap-3 flex-wrap'>
			<InvoiceStatusBadge status='DRAFT' />
			<InvoiceStatusBadge status='FINALIZED' />
			<InvoiceStatusBadge status='VOIDED' />
			<InvoiceStatusBadge status='SKIPPED' />
		</div>
	),
};

/** In table context — how it looks in a row */
export const InTableContext: Story = {
	render: () => (
		<table className='w-full text-sm'>
			<thead>
				<tr className='border-b text-left text-muted-foreground'>
					<th className='py-2 px-3'>Invoice #</th>
					<th className='py-2 px-3'>Amount</th>
					<th className='py-2 px-3'>Status</th>
				</tr>
			</thead>
			<tbody>
				{[
					{ id: 'INV-001', amount: '$2,400.00', status: 'FINALIZED' as const },
					{ id: 'INV-002', amount: '$99.00', status: 'DRAFT' as const },
					{ id: 'INV-003', amount: '$499.00', status: 'VOIDED' as const },
					{ id: 'INV-004', amount: '$0.00', status: 'SKIPPED' as const },
				].map((inv) => (
					<tr key={inv.id} className='border-b'>
						<td className='py-2 px-3 font-medium'>{inv.id}</td>
						<td className='py-2 px-3'>{inv.amount}</td>
						<td className='py-2 px-3'>
							<InvoiceStatusBadge status={inv.status} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	),
};
