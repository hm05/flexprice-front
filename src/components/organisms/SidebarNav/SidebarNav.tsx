import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, type LucideIcon } from 'lucide-react';

/**
 * Simplified SidebarNav for Storybook — works without React Router.
 * Displays a collapsible navigation sidebar with icon+label items,
 * active-route highlighting, and nested sub-items.
 *
 * @param items — Navigation items with title, icon, url, and optional sub-items
 * @param activeUrl — Currently active route URL
 * @param collapsed — Whether sidebar is in icon-only mode
 * @param onNavigate — Callback when a nav item is clicked
 */

export interface SidebarNavItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	items?: { title: string; url: string }[];
}

interface SidebarNavProps {
	/** Navigation items */
	items: SidebarNavItem[];
	/** Currently active URL */
	activeUrl?: string;
	/** Collapsed (icon-only) mode */
	collapsed?: boolean;
	/** Navigation callback */
	onNavigate?: (url: string) => void;
	/** Additional CSS classes */
	className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items, activeUrl = '', collapsed = false, onNavigate, className }) => {
	const [expandedSections, setExpandedSections] = useState<string[]>([]);

	const toggleSection = (title: string) => {
		setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
	};

	const isActive = (url: string) => activeUrl === url;

	const isParentActive = (item: SidebarNavItem) => {
		if (isActive(item.url)) return true;
		return item.items?.some((sub) => isActive(sub.url)) || false;
	};

	return (
		<nav className={cn('flex flex-col gap-1 py-2', className)}>
			{items.map((item) => {
				const Icon = item.icon;
				const hasChildren = item.items && item.items.length > 0;
				const isExpanded = expandedSections.includes(item.title);
				const active = isParentActive(item);

				return (
					<div key={item.title}>
						{/* Main nav item */}
						<button
							onClick={() => {
								if (hasChildren) {
									toggleSection(item.title);
								}
								onNavigate?.(item.url);
							}}
							className={cn(
								'flex items-center w-full gap-3 rounded-md text-sm font-medium transition-all duration-150',
								collapsed ? 'justify-center p-2' : 'px-3 py-2',
								active ? 'bg-[#092E44] text-white' : 'text-gray-700 hover:bg-gray-100',
							)}>
							{Icon && <Icon className='size-4 shrink-0' />}
							{!collapsed && (
								<>
									<span className='flex-1 text-left truncate'>{item.title}</span>
									{hasChildren && (
										<ChevronDown className={cn('size-3.5 shrink-0 transition-transform duration-200', isExpanded && 'rotate-180')} />
									)}
								</>
							)}
						</button>

						{/* Sub-items */}
						{hasChildren && isExpanded && !collapsed && (
							<div className='ml-6 mt-1 flex flex-col gap-0.5 border-l border-gray-200 pl-3'>
								{item.items!.map((sub) => (
									<button
										key={sub.url}
										onClick={() => onNavigate?.(sub.url)}
										className={cn(
											'text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150',
											isActive(sub.url) ? 'text-[#092E44] font-medium bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
										)}>
										{sub.title}
									</button>
								))}
							</div>
						)}
					</div>
				);
			})}
		</nav>
	);
};

export default SidebarNav;
