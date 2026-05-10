import React from 'react';
import { cn } from '@/lib/utils';

/**
 * PricingTierTable displays tiered or graduated pricing in a readable table.
 * Used in FlexPrice plan detail views to show how pricing scales with usage.
 *
 * @param tiers — Array of tier definitions with range and pricing
 * @param currency — Currency symbol for display
 * @param mode — "volume" (single rate for all units) or "slab" (rate per tier)
 * @param billingModel — "tiered", "package", or "flat_fee"
 */

interface PricingTier {
	/** Start of the usage range */
	from: number;
	/** End of the usage range (Infinity for unlimited) */
	to: number | null;
	/** Price per unit in this tier */
	unitAmount: string;
	/** Flat fee for this tier (optional) */
	flatAmount?: string;
}

interface PricingTierTableProps {
	/** Array of pricing tiers */
	tiers: PricingTier[];
	/** Currency symbol (e.g. "$", "€") */
	currencySymbol?: string;
	/** Pricing mode */
	mode?: 'volume' | 'slab';
	/** Additional CSS classes */
	className?: string;
}

const formatRange = (from: number, to: number | null): string => {
	const fromStr = from.toLocaleString();
	if (to === null || to === Infinity) return `${fromStr}+`;
	return `${fromStr} - ${to.toLocaleString()}`;
};

const PricingTierTable: React.FC<PricingTierTableProps> = ({ tiers, currencySymbol = '$', mode = 'volume', className }) => {
	return (
		<div className={cn('rounded-lg border border-gray-200 overflow-hidden', className)}>
			{/* Header */}
			<div className='bg-gray-50 px-4 py-2.5 flex items-center justify-between border-b border-gray-200'>
				<span className='text-sm font-medium text-gray-700'>{mode === 'volume' ? 'Volume Tiered' : 'Slab Tiered'} Pricing</span>
				<span className='text-xs text-muted-foreground px-2 py-0.5 bg-white rounded border border-gray-200'>
					{mode === 'volume' ? 'Single rate applied to all units' : 'Rate applied per tier range'}
				</span>
			</div>

			{/* Table */}
			<table className='w-full text-sm'>
				<thead>
					<tr className='border-b border-gray-200 bg-gray-50/50'>
						<th className='text-left px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider'>Tier</th>
						<th className='text-left px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider'>Range</th>
						<th className='text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider'>Per Unit</th>
						<th className='text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider'>Flat Fee</th>
					</tr>
				</thead>
				<tbody>
					{tiers.map((tier, index) => (
						<tr key={index} className={cn('border-b border-gray-100 last:border-b-0', 'hover:bg-gray-50/50 transition-colors')}>
							<td className='px-4 py-3'>
								<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-600'>
									{index + 1}
								</span>
							</td>
							<td className='px-4 py-3 font-medium text-gray-900'>
								{formatRange(tier.from, tier.to)}
								{tier.to === null && <span className='ml-1.5 text-xs text-muted-foreground'>(unlimited)</span>}
							</td>
							<td className='px-4 py-3 text-right font-mono text-gray-900'>
								{currencySymbol}
								{parseFloat(tier.unitAmount).toFixed(4)}
							</td>
							<td className='px-4 py-3 text-right font-mono text-gray-500'>
								{tier.flatAmount ? `${currencySymbol}${parseFloat(tier.flatAmount).toFixed(2)}` : '—'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PricingTierTable;
