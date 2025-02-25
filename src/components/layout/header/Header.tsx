'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsFillAirplaneEnginesFill } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoCall } from 'react-icons/io5';
import logo from '../../../../public/assets/images/logo.svg';
import MobileMenu from './components/MobileMenu/MobileMenu';
import scss from './Header.module.scss';

interface Language {
	code: string;
	name: string;
	flag: string;
}

const LANGUAGES: Language[] = [
	{
		code: 'KG',
		name: 'Кыргызча',
		flag: '/assets/header/kyrgyzstan-flag-icon.svg'
	},
	{ code: 'RU', name: 'Русский', flag: '/assets/header/russia-flag-icon.svg' }
];

const Header: React.FC = () => {
	const pathname = usePathname();
	const [showLanguage, setShowLanguage] = useState(false);
	const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (typeof document === 'undefined') return;

		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isMobileMenuOpen]);

	const isActiveLink = (path: string) => {
		if (path === '/') return pathname === path;
		return pathname?.startsWith(path);
	};

	return (
		<>
			<header className={scss.header} id="header">
				<div className={scss.content}>
					<div className={scss.header_start}>
						<Link href='/'>
							<Image
								src={logo}
								alt='Logo'
								width={120}
								height={60}
								quality={75}
								priority
							/>
						</Link>
						<div className={scss.line}></div>
					</div>

					<div className={scss.header_nav}>
						<ul>
							<li>
								<Link href='/' className={isActiveLink('/') ? scss.active : ''}>
									Башкы
								</Link>
							</li>
							<li>
								<Link
									href='/packages'
									className={isActiveLink('/packages') ? scss.active : ''}
								>
									Тур пакеттер
								</Link>
							</li>
							<li className={scss.dropdown}>
								<span className={isActiveLink('/about') ? scss.active : ''}>
									Биз жөнүндө
								</span>
								<div className={scss.dropdown_menu}>
									<div className={scss.submenu_content}>
										<Link href='/aboutUs'>Компания жөнүндө</Link>
										<Link href='/gallery'>Галерея</Link>
										<Link href='/video_lessons'>Видео сабактар</Link>
										<Link href='/contact'>Байланыш</Link>
									</div>
								</div>
							</li>
							<li>
								<Link
									href='/usefulinfo'
									className={isActiveLink('/usefulinfo') ? scss.active : ''}
								>
									Пайдалуу маалымат
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
							<div className={scss.flag_container}>
								<Image
									src={currentLang.flag}
									alt={currentLang.code}
									width={20}
									height={20}
									quality={75}
								/>
								<span className={scss.lang_code}>{currentLang.code}</span>
							</div>
							<div
								className={`${scss.language_dropdown} ${
									showLanguage ? scss.show : ''
								}`}
							>
								{LANGUAGES.map(lang => (
									<button
										key={lang.code}
										onClick={() => {
											setCurrentLang(lang);
											setShowLanguage(false);
										}}
									>
										<Image
											src={lang.flag}
											alt={lang.code}
											width={20}
											height={20}
											quality={75}
										/>
										{lang.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</header>

			<nav id='tab-bar' className={scss.bottom_nav}>
				<div className={scss.nav_content}>
					<Link
						href='/'
						className={`${scss.nav_item} ${
							isActiveLink('/') ? scss.active : ''
						}`}
					>
						<FiHome />
						<span>Башкы</span>
					</Link>
					<Link
						href='/packages'
						className={`${scss.nav_item} ${
							isActiveLink('/packages') ? scss.active : ''
						}`}
					>
						<BsFillAirplaneEnginesFill />
						<span>Турлар</span>
					</Link>
					<button
						className={scss.nav_item}
						onClick={() => setIsMobileMenuOpen(true)}
					>
						<HiOutlineMenuAlt3 />
						<span>Меню</span>
					</button>
				</div>
			</nav>

			<MobileMenu
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
			/>
		</>
	);
};

export default Header;
