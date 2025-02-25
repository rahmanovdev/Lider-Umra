import { IconType } from 'react-icons';

type TrailingContent =
	| ((arg: { isActive: boolean }) => React.ReactNode)
	| React.ReactNode;

type AccordionType = 'single' | 'multiple';
export interface AccordionProps {
	type?: AccordionType;
	className?: string;
	items: AccordionItem[];
	disabled?: boolean;
	icon?: IconType;
	trailingContent?: TrailingContent;
	defaultValue?: string | string[];
}

export interface AccordionItem {
	label?: string;
	icon?: IconType;
	trailingContent?: TrailingContent;
	value: string;
	disabled?: boolean;
	content: React.ReactNode;
}

export interface AccordionItemProps extends AccordionItem {
	isLast: boolean;
	isFirst: boolean
	isActive: boolean;
	toggleItem(value: string): void;
}
