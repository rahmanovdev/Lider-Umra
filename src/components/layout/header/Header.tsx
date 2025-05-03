'use client';
import React, { useState } from 'react';
import scss from './Header.module.scss';
import logo from '../../../../public/assets/images/logo.svg';
import Image from 'next/image';
import { IoCall } from 'react-icons/io5';
import Language from '../../../../public/assets/images/Global.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
	const pathname = usePathname();
	const [showLanguage, setShowLanguage] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState('Русский');

	const isActiveLink = (path: string) => {
		if (path === '/') {
			return pathname === path;
		}
		return pathname?.startsWith(path);
	};

	return (
		<header className={scss.header}>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.header_start}>
						<Link href='/'>
							<Image
								src={logo}
								alt='Logo Lider Umarh'
								width={120}
								height={60}
								quality={70}
								priority
							/>
						</Link>
						<div className={scss.line}></div>
					</div>

					<div className={scss.header_nav}>
						<ul>
							<li>
								<Link href='/' className={isActiveLink('/') ? scss.active : ''}>
									Главная
								</Link>
							</li>
							<li>
								<Link
									href='/packages'
									className={isActiveLink('/packages') ? scss.active : ''}
								>
									Тур пакеты
								</Link>
							</li>
							<li className={scss.dropdown}>
								<span className={isActiveLink('/about') ? scss.active : ''}>
									О нас
								</span>
								<div className={scss.dropdown_menu}>
									<div className={scss.submenu_content}>
										<Link href='/aboutUs'>О Компании</Link>
										<Link href='/gallery'>Галерея</Link>
										<Link href='/contact'>Контакты</Link>
									</div>
								</div>
							</li>
							<li>
								<Link
									href='/usefulinfo'
									className={isActiveLink('/usefulinfo') ? scss.active : ''}
								>
									Полезная информация
								</Link>
							</li>
						</ul>
					</div>

					<div className={scss.header_end}>
						<div className={scss.contact_wrapper}>
							<div className={scss.line}></div>
							<div className={scss.contact}>
								<IoCall />
								<a href='tel:+996700188251'>+996 700-18-82-51</a>
							</div>
							<div className={scss.line}></div>
						</div>

						<div
							className={scss.language}
							onMouseEnter={() => setShowLanguage(true)}
							onMouseLeave={() => setShowLanguage(false)}
						>
							<Image
								src={Language}
								alt='Language'
								width={20}
								height={20}
								quality={70}
								priority
							/>
							<span>{currentLanguage}</span>
							{showLanguage && (
								<div className={scss.language_dropdown}>
									<button
										onClick={() => setCurrentLanguage('Кыргызча')}
										className={
											currentLanguage === 'Кыргызча' ? scss.active : ''
										}
									>
										Кыргызча
									</button>
									<button
										onClick={() => setCurrentLanguage('Русский')}
										className={currentLanguage === 'Русский' ? scss.active : ''}
									>
										Русский
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
