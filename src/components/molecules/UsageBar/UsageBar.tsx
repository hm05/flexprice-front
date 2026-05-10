import React from 'react';
import Progress from '@/components/atoms/Progress/Progress';
import { cn } from '@/lib/utils';

/**
 * UsageBar / MeterProgress component displays usage consumption
 * as a labelled progress bar showing used vs entitled units.
 * Common in FlexPrice subscription and entitlement views.
 *
 * @param used — Number of units consumed
 * @param entitled — Total units in the entitlement
 * @param label — Name of the meter/feature (e.g. "API Calls")
 * @param unit — Unit label (e.g. "calls", "GB", "seats")
 * @param showPercentage — Whether to show percentage text
 */
interface UsageBarProps {
	/** Number of units consumed */
	used: number;
	/** Total units entitled */
	entitled: number;
	/** Name of the meter or feature */
	label?: string;
	/** Unit label (e.g. "calls", "GB") */
	unit?: string;
	/** Whether to show the percentage */
	showPercentage?: boolean;
	/** Additional CSS classes */
	className?: string;
}

const UsageBar: React.FC<UsageBarProps> = ({ used, entitled, label, unit = 'units', showPercentage = true, className }) => {
	const percentage = entitled > 0 ? Math.min((used / entitled) * 100, 100) : 0;
	const isOverLimit = used > entitled;
	const isNearLimit = percentage >= 80 && !isOverLimit;

	const getIndicatorColor = () => {
		if (isOverLimit) return 'bg-red-500';
		if (isNearLimit) return 'bg-amber-500';
		return 'bg-blue-500';
	};

	const getTextColor = () => {
		if (isOverLimit) return 'text-red-600';
		if (isNearLimit) return 'text-amber-600';
		return 'text-muted-foreground';
	};

	const formatNumber = (n: number) => n.toLocaleString('en-US');

	return (
		<div className={cn('w-full space-y-2', className)}>
			{/* Header row */}
			<div className='flex items-center justify-between'>
				{label && <span className='text-sm font-medium text-foreground'>{label}</span>}
				<span className={cn('text-xs', getTextColor())}>
					{formatNumber(used)} / {formatNumber(entitled)} {unit}
					{showPercentage && <span className='ml-1'>({percentage.toFixed(0)}%)</span>}
				</span>
			</div>

			{/* Progress bar */}
			<Progress value={percentage} indicatorColor={getIndicatorColor()} backgroundColor='bg-gray-100' className='h-2' />

			{/* Over-limit warning */}
			{isOverLimit && (
				<p className='text-xs text-red-600 font-medium'>
					⚠ Exceeded by {formatNumber(used - entitled)} {unit}
				</p>
			)}
		</div>
	);
};

export default UsageBar;
