import React from 'react';
import Chip from '@/components/atoms/Chip/Chip';
import { Check, FileText, X, SkipForward } from 'lucide-react';

/**
 * Maps FlexPrice invoice status strings to coloured Chip components with icons.
 * Used in invoice tables and detail views to visually communicate invoice state.
 *
 * @param status — One of: DRAFT, FINALIZED, VOIDED, SKIPPED
 * @param className — Additional CSS classes
 */

type InvoiceStatus = 'DRAFT' | 'FINALIZED' | 'VOIDED' | 'SKIPPED';

interface InvoiceStatusBadgeProps {
	/** Invoice status string */
	status: InvoiceStatus;
	/** Additional CSS classes */
	className?: string;
}

const STATUS_CONFIG: Record<
	InvoiceStatus,
	{
		label: string;
		variant: 'default' | 'success' | 'warning' | 'failed' | 'info';
		icon: React.ReactNode;
	}
> = {
	DRAFT: {
		label: 'Draft',
		variant: 'default',
		icon: <FileText className='size-3' />,
	},
	FINALIZED: {
		label: 'Finalized',
		variant: 'info',
		icon: <Check className='size-3' />,
	},
	VOIDED: {
		label: 'Voided',
		variant: 'failed',
		icon: <X className='size-3' />,
	},
	SKIPPED: {
		label: 'Skipped',
		variant: 'warning',
		icon: <SkipForward className='size-3' />,
	},
};

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status, className }) => {
	const config = STATUS_CONFIG[status] || STATUS_CONFIG.DRAFT;

	return <Chip label={config.label} variant={config.variant} icon={config.icon} className={className} />;
};

export default InvoiceStatusBadge;
