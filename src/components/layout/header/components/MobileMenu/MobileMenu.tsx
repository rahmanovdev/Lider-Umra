'use client';
import React from 'react';
import Link from 'next/link';
import scss from './MobileMenu.module.scss';
import { IoClose } from 'react-icons/io5';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
	return (
		<div className={`${scss.mobile_menu} ${isOpen ? scss.open : ''}`}>
			<div className={scss.menu_header}>
				<button onClick={onClose} className={scss.close_btn}>
					<IoClose />
				</button>
			</div>
			<nav className={scss.menu_nav}>
				<ul>
					<li>
						<Link href='/' onClick={onClose}>
							Башкы
						</Link>
					</li>
					<li>
						<Link href='/packages' onClick={onClose}>
							Тур пакеттер
						</Link>
					</li>
					<li>
						<Link href='/aboutUs' onClick={onClose}>
							Компания жөнүндө
						</Link>
					</li>
					<li>
						<Link href='/gallery' onClick={onClose}>
							Галерея
						</Link>
					</li>
					<li>
						<Link href='/contact' onClick={onClose}>
							Байланыш
						</Link>
					</li>
					<li>
						<Link href='/usefulinfo' onClick={onClose}>
							Пайдалуу маалымат
						</Link>
					</li>
				</ul>
			</nav>
			<div className={scss.contact_info}>
				<div className={scss.contact_title}>Байланыш:</div>
				<a href='tel:+996700188251' className={scss.phone_number}>
					<span>+996 700-18-82-51</span>
				</a>
			</div>
		</div>
	);
};

export default MobileMenu;
