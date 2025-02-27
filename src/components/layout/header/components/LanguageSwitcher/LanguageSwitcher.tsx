'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import scss from './LanguageSwitcher.module.scss';
import clsx from 'clsx';
import { getCurrentLanguage, setLanguage } from '@/utils/i18n/language.client';

interface Language {
	code: 'kg' | 'ru';
	name: string;
	flag: string;
}

const LANGUAGES: Language[] = [
	{
		code: 'kg',
		name: 'Кыргызча',
		flag: '/assets/header/kyrgyzstan-flag-icon.svg'
	},
	{ code: 'ru', name: 'Русский', flag: '/assets/header/russia-flag-icon.svg' }
];

const LanguageSwitcher: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [lang, setLang] = useState<'kg' | 'ru'>(LANGUAGES[0].code);

	useEffect(() => {
		setLang(getCurrentLanguage());
	}, []);

	const selectedLang =
		LANGUAGES.find(_lang => _lang.code === lang) || LANGUAGES[0];

	return (
		<div
			suppressContentEditableWarning
			className={scss.language}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<div className={scss.flag_container}>
				<Image
					src={selectedLang.flag}
					alt={selectedLang.code}
					width={20}
					height={20}
					quality={75}
					suppressHydrationWarning
				/>
				<span suppressHydrationWarning className={scss.lang_code}>
					{selectedLang.code}
				</span>
			</div>
			<div className={clsx(scss.language_dropdown, isOpen ? scss.show : '')}>
				{LANGUAGES.map(lang => (
					<button
						key={lang.code}
						onClick={() => {
							setLanguage(lang.code);
							window.location.reload();
						}}
						className={scss.language_option}
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
	);
};

export default LanguageSwitcher;
