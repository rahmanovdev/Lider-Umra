'use client';
import Link from 'next/link';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import scss from './MobileMenu.module.scss';
import { useTranslations } from 'next-intl';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

type NavigationType = {
	href?: string;
	label: string;
	childrens?: NavigationType[];
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
	const t = useTranslations();
	const navigations = t.raw('navigations') as NavigationType[];

	const renderNavigation = React.useCallback(
		(items: NavigationType[], level = 0) => (
			<ul className={`${scss.menu_list} ${level > 0 ? scss.submenu : ''}`}>
				{items.map((navItem, index) => {
					const hasChildren = navItem.childrens && navItem.childrens.length > 0;

					return (
						<li key={index} className={scss.menu_item}>
							{navItem.href ? (
								<Link href={navItem.href} onClick={onClose}>
									{navItem.label}
								</Link>
							) : (
								<span className={scss.menu_label}>{navItem.label}</span>
							)}
							{hasChildren && renderNavigation(navItem.childrens!, level + 1)}
						</li>
					);
				})}
			</ul>
		),
		[onClose]
	);

	return (
		<div className={`${scss.mobile_menu} ${isOpen ? scss.open : ''}`}>
			<div className={scss.menu_header}>
				<button onClick={onClose} className={`flexCenter ${scss.close_btn}`}>
					<IoClose />
				</button>
			</div>
			<nav className={scss.menu_nav}>{renderNavigation(navigations)}</nav>
			<div className={scss.contact_info}>
				<div className={scss.contact_title}>{t('mobileMenu.contactTitle')}</div>
				<a href='tel:+996700188251' className={scss.phone_number}>
					<span>+996 700-18-82-51</span>
				</a>
			</div>
		</div>
	);
};

export default MobileMenu;
