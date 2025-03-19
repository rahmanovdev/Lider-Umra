'use client';
import { useSize } from '@/hooks/use-size';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import scss from './Footer.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { Assets } from '@/assets';

type City = 'osh' | 'bishkek';

const Footer = () => {
   const windowSize = useSize();
   const tabBarSize = useSize('#tab-bar');
   const t = useTranslations();
   const locale = useLocale()

   const [selectedCity, setSelectedCity] = useState<City | null>(null);

   const phoneNumbers: Record<City, string[]> = {
      osh: ['+996 555 123 456', '+996 555 789 012'],
      bishkek: ['+996 707 150 815', '+996 555 789 012'],
   };

   return (
      <footer
         style={{
            marginBottom: windowSize.width <= 1000 ? tabBarSize.height : 0,
         }}
         className={scss.footer}
      >
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.left_block}>
                  <Image
                     src={Assets.Svg.Logo}
                     alt='liderUmrah_logo'
                     height={300}
                     width={700}
                  />
                  <p
                     dangerouslySetInnerHTML={{
                        __html: t('descriptions.base'),
                     }}
                  />
               </div>
               <div className={scss.df_blocks}>
                  <div className={scss.center}>
                     <h2>{t('footer.quickLinks')}</h2>
                     <div className={scss.nav}>
                        <Link href='/' className={scss.navLink}>
                           {t('footer.links.home')}
                        </Link>
                        <Link href='/packages' className={scss.navLink}>
                           {t('footer.links.packages')}
                        </Link>
                        <Link href='/aboutUs' className={scss.navLink}>
                           {t('footer.links.about')}
                        </Link>
                        <Link href='/gallery' className={scss.navLink}>
                           {t('footer.links.gallery')}
                        </Link>
                        <Link href='/lessons' className={scss.navLink}>
                           {t('footer.links.lessons')}
                        </Link>
                        <Link href='/usefullinfo' className={scss.navLink}>
                           {t('footer.links.usefulInfo')}
                        </Link>
                     </div>
                  </div>

                  <div className={scss.right_block}>
                     <h2>{t('footer.contact')}</h2>
                     <div className={scss.logo}>
                        <Link
                           href='https://www.instagram.com/liderumra/'
                           target='_blank'
                           className={scss.socialLink}
                        >
                           <Image
                              src={Assets.Icons.Social.Instagram}
                              width={40}
                              height={40}
                              alt='Instagram logo'
                           />
                           <span>Instagram</span>
                        </Link>
                        <Link
                           href='https://www.youtube.com/@Bilim.Mainaev'
                           target='_blank'
                           className={scss.socialLink}
                        >
                           <Image
                              src={Assets.Icons.Social.YouTube}
                              width={40}
                              height={40}
                              alt='YouTube logo'
                           />
                           <span>YouTube</span>
                        </Link>
                        <Link
                           href='https://wa.me/996707150815'
                           target='_blank'
                           className={scss.socialLink}
                        >
                           <Image
                              src={Assets.Icons.Social.Whatsapp}
                              width={40}
                              height={40}
                              alt='WhatsApp logo'
                           />
                           <span>WhatsApp</span>
                        </Link>
                        <Link
                           href='https://t.me/liderumra1'
                           target='_blank'
                           className={scss.socialLink}
                        >
                           <Image
                              src={Assets.Icons.Social.Telegram}
                              width={40}
                              height={40}
                              alt='Telegram logo'
                           />
                           <span>Telegram</span>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className={scss.center}>
                  <h2>{t('footer.contact')}</h2>{' '}
                  <div className={scss.nav}>
                     <p
                        className={`${scss.navLink} ${
                           selectedCity === 'osh' ? scss.active : ''
                        }`}
                        onClick={() => setSelectedCity('osh')}
                     >
                        Ош
                     </p>
                     <p
                        className={`${scss.navLink} ${
                           selectedCity === 'bishkek' ? scss.active : ''
                        }`}
                        onClick={() => setSelectedCity('bishkek')}
                     >
                        Бишкек
                     </p>
                     {selectedCity && (
                        <div className={scss.phoneNumbers}>
                           <h3>Телефон номерлери:</h3>
                           <ul>
                              {phoneNumbers[selectedCity].map(
                                 (number: string, index: number) => (
                                    <li key={index}>{number}</li>
                                 ),
                              )}
                           </ul>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         <div className={scss.under_footer}>
            <div className={scss.left}>
               <p>@ 2025, Lider Umra</p>
            </div>
            <div className={scss.right}>
               <a
                  href='https://www.iant.kg/'
                  target='_blank'
                  className={`${scss.last} ${locale == 'ru' && scss.reverse}`}
                  suppressHydrationWarning
               >
                  <Image
                     width={44}
                     height={44}
                     src={Assets.Global.IAntLogo}
                     alt='IAnt Logo'
                     suppressHydrationWarning
                  />
                  <span>{t("footer.to")}</span>
               </a>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
