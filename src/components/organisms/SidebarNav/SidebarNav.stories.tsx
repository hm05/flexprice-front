import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SidebarNav from './SidebarNav';
import type { SidebarNavItem } from './SidebarNav';
import { Home, Layers2, Landmark, BarChart3, Settings, CodeXml, Puzzle, GalleryHorizontalEnd } from 'lucide-react';

/**
 * SidebarNav is the main navigation component in the FlexPrice app.
 * Features collapsible sections, active-route highlighting, and
 * icon+label items. This simplified version works without React Router.
 */
const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	argTypes: {
		collapsed: { control: 'boolean' },
		activeUrl: { control: 'text' },
	},
	args: {
		onNavigate: fn(),
	},
	decorators: [
		(Story) => (
			<div className='w-[260px] min-h-[500px] border-r border-gray-200 bg-[#f9f9f9] p-3'>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

const flexpricNavItems: SidebarNavItem[] = [
	{ title: 'Home', url: '/dashboard', icon: Home },
	{
		title: 'Product Catalog',
		url: '/features',
		icon: Layers2,
		items: [
			{ title: 'Features', url: '/features' },
			{ title: 'Plans', url: '/plans' },
			{ title: 'Coupons', url: '/coupons' },
			{ title: 'Addons', url: '/addons' },
			{ title: 'Price Units', url: '/price-units' },
		],
	},
	{
		title: 'Billing',
		url: '/customers',
		icon: Landmark,
		items: [
			{ title: 'Customers', url: '/customers' },
			{ title: 'Subscriptions', url: '/subscriptions' },
			{ title: 'Invoices', url: '/invoices' },
			{ title: 'Credit Notes', url: '/credit-notes' },
			{ title: 'Payments', url: '/payments' },
		],
	},
	{ title: 'Revenue', url: '/revenue', icon: BarChart3 },
	{
		title: 'Developers',
		url: '/events',
		icon: CodeXml,
		items: [
			{ title: 'Events Debugger', url: '/events' },
			{ title: 'API Keys', url: '/api-keys' },
			{ title: 'Webhooks', url: '/webhooks' },
		],
	},
	{ title: 'Integrations', url: '/integrations', icon: Puzzle },
	{ title: 'Pricing Widget', url: '/pricing', icon: GalleryHorizontalEnd },
];

/** Default — full FlexPrice sidebar */
export const Default: Story = {
	args: {
		items: flexpricNavItems,
		activeUrl: '/dashboard',
	},
};

/** With active sub-item — Billing > Invoices selected */
export const ActiveSubItem: Story = {
	args: {
		items: flexpricNavItems,
		activeUrl: '/invoices',
	},
};

/** Collapsed mode — icon-only sidebar */
export const Collapsed: Story = {
	args: {
		items: flexpricNavItems,
		activeUrl: '/dashboard',
		collapsed: true,
	},
	decorators: [
		(Story) => (
			<div className='w-[60px] min-h-[500px] border-r border-gray-200 bg-[#f9f9f9] p-2'>
				<Story />
			</div>
		),
	],
};

/** Minimal — simple flat navigation */
export const Minimal: Story = {
	args: {
		items: [
			{ title: 'Home', url: '/home', icon: Home },
			{ title: 'Settings', url: '/settings', icon: Settings },
		],
		activeUrl: '/home',
	},
};
