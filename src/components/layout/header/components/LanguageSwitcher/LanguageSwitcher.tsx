'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import scss from './LanguageSwitcher.module.scss';
import clsx from 'clsx';
import { getCurrentLanguage, setLanguage } from '@/utils/i18n/language.client';
import { Assets } from '@/assets';

const LANGUAGES = [
   {
      code: 'kg',
      name: 'Кыргызча',
      flag: Assets.Global.Languages.KG,
   },
   { code: 'ru', name: 'Русский', flag: Assets.Global.Languages.RU },
];

const LanguageSwitcher: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [lang, setLang] = useState(LANGUAGES[0].code);

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
               alt={`Language - ${selectedLang.code}`}
               width={20}
               height={20}
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
                     setLanguage(lang.code as 'kg');
                     window.location.reload();
                  }}
                  className={scss.language_option}
               >
                  <Image
                     src={lang.flag}
                     alt={lang.code}
                     width={20}
                     height={20}
                  />
                  {lang.name}
               </button>
            ))}
         </div>
      </div>
   );
};

export default LanguageSwitcher;
