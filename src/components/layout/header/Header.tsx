/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoCall } from 'react-icons/io5';
import logo from '../../../../public/assets/images/logo.svg';
import MobileMenu from './components/MobileMenu/MobileMenu';
import scss from './Header.module.scss';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import { useSize } from '@/hooks/use-size';
import { motion, AnimatePresence } from 'framer-motion';

type NavigationType = {
   href: string;
   label: string;
   childrens?: NavigationType[];
};

const Header: React.FC = () => {
   const pathname = usePathname();
   const t = useTranslations();
   const tb = useTranslations('bottomNav');
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [nodes, setNodes] = useState<{ [key: string]: NavigationType[] }>({});
   const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

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

   const navigations = t.raw('navigations') as NavigationType[];

   useEffect(() => {
      const newNodes: { [key: string]: NavigationType[] } = {};
      navigations.forEach(nav => {
         if (nav.childrens && nav.childrens.length > 0) {
            newNodes[nav.label] = nav.childrens;
         }
      });
      setNodes(newNodes);
   }, [navigations]);

   const size = useSize('header');

   return (
      <>
         <AnimatePresence>
            {hoveredLabel && nodes[hoveredLabel] && (
               <motion.div
                  onMouseLeave={() => setHoveredLabel(null)}
                  style={{ marginTop: size.height / 1.4 }}
                  className={scss.dropdown_menu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
               >
                  <div className={scss.submenu_content}>
                     {nodes[hoveredLabel].map(nc => (
                        <Link key={nc.href} href={nc.href}>
                           {nc.label}
                        </Link>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <header suppressHydrationWarning className={scss.header} id='header'>
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
                     {navigations.map(nav => (
                        <li
                           key={nav.label}
                           onMouseEnter={() => setHoveredLabel(nav.label)}
                        >
                           <Link
                              href={nav.href || '#'}
                              className={
                                 isActiveLink(nav.href) ? scss.active : ''
                              }
                           >
                              {nav.label}
                           </Link>
                        </li>
                     ))}
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

                  <LanguageSwitcher />
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
                  <span>{tb('home')}</span>
               </Link>
               <Link href="/packages" className={`${scss.nav_item}`}>
                  <img
                     src='/assets/pilgrimage.png'
                     alt=''
                     suppressHydrationWarning
                  />
                  <span>{tb('packages')}</span>
               </Link>
               <button
                  className={scss.nav_item}
                  onClick={() => setIsMobileMenuOpen(true)}
               >
                  <HiOutlineMenuAlt3 />
                  <span>{tb('menu')}</span>
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
