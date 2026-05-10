import React from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button/Button';

/**
 * EmptyState component for displaying a full-page empty state with
 * icon, headline, subtext, and call-to-action button. Used across
 * FlexPrice when a page or section has no data yet.
 *
 * @param icon — Decorative icon or illustration
 * @param headline — Main heading text
 * @param description — Supporting description text
 * @param actionLabel — CTA button text
 * @param onAction — CTA button click handler
 */
interface EmptyStateProps {
	/** Decorative icon or illustration */
	icon?: React.ReactNode;
	/** Main heading text */
	headline: string;
	/** Supporting description text */
	description?: string;
	/** CTA button text */
	actionLabel?: string;
	/** CTA button click handler */
	onAction?: () => void;
	/** Secondary action label */
	secondaryActionLabel?: string;
	/** Secondary action handler */
	onSecondaryAction?: () => void;
	/** Additional CSS classes */
	className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	icon,
	headline,
	description,
	actionLabel,
	onAction,
	secondaryActionLabel,
	onSecondaryAction,
	className,
}) => {
	return (
		<div
			className={cn(
				'bg-[#fafafa] border border-[#E9E9E9] rounded-lg w-full min-h-[360px]',
				'flex flex-col items-center justify-center mx-auto px-6 py-12',
				className,
			)}>
			{/* Icon */}
			{icon && <div className='mb-6 text-gray-400'>{icon}</div>}

			{/* Headline */}
			<h3 className='font-medium text-xl text-gray-700 mb-3 text-center'>{headline}</h3>

			{/* Description */}
			{description && <p className='text-base text-gray-400 mb-8 text-center max-w-[400px] leading-relaxed'>{description}</p>}

			{/* Actions */}
			<div className='flex items-center gap-3'>
				{actionLabel && onAction && (
					<Button variant='outline' onClick={onAction} className='!p-5 !bg-[#fbfbfb] !border-[#CFCFCF]'>
						{actionLabel}
					</Button>
				)}
				{secondaryActionLabel && onSecondaryAction && (
					<Button variant='ghost' onClick={onSecondaryAction}>
						{secondaryActionLabel}
					</Button>
				)}
			</div>
		</div>
	);
};

export default EmptyState;
