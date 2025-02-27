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

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
	const t = useTranslations('mobileMenu');

	return (
		<div className={`${scss.mobile_menu} ${isOpen ? scss.open : ''}`}>
			<div className={scss.menu_header}>
				<button onClick={onClose} className={`flexCenter ${scss.close_btn}`}>
					<IoClose />
				</button>
			</div>
			<nav className={scss.menu_nav}>
				<ul>
					<li>
						<Link href='/' onClick={onClose}>
							{t('home')}
						</Link>
					</li>
					<li>
						<Link href='/packages' onClick={onClose}>
							{t('tourPackages')}
						</Link>
					</li>
					<li>
						<Link href='/aboutUs' onClick={onClose}>
							{t('aboutCompany')}
						</Link>
					</li>
					<li>
						<Link href='/gallery' onClick={onClose}>
							{t('gallery')}
						</Link>
					</li>
					<li>
						<Link href='/contact' onClick={onClose}>
							{t('contact')}
						</Link>
					</li>
					<li>
						<Link href='/usefulinfo' onClick={onClose}>
							{t('usefulInfo')}
						</Link>
					</li>
				</ul>
			</nav>
			<div className={scss.contact_info}>
				<div className={scss.contact_title}>{t('contactTitle')}</div>
				<a href='tel:+996700188251' className={scss.phone_number}>
					<span>+996 700-18-82-51</span>
				</a>
			</div>
		</div>
	);
};

export default MobileMenu;
