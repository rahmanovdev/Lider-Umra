'use client';
import RequiredOfYou from '@/components/common/required-of-you/RequiredOfYou';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import {
   MdCardGiftcard,
   MdChecklist,
   MdLocationOn,
   MdRestaurant,
   MdThumbDown,
} from 'react-icons/md';
import { FoodSection } from '../components/FoodSection';
import { GiftsSection } from '../components/GiftsSection';
import PlacesSection from '../components/PlacesSection/PlaceSection';
import { WarningsSection } from '../components/WarningsSection';
import styles from './AboutProgramDet.module.scss';

interface Section {
   id: number;
   title: string;
   type: string;
   icon: React.ReactNode;
}

interface AboutProgramDetProps {
   tourData: TOURS.ITourPackages;
}

const sections = (t: (s: string) => string): Section[] => [
   {
      id: 1,
      title: t('sections.food'),
      type: 'food',
      icon: <MdRestaurant className={styles.icon} />,
   },
   {
      id: 2,
      title: t('sections.places'),
      type: 'places',
      icon: <MdLocationOn className={styles.icon} />,
   },
   {
      id: 3,
      title: t('sections.required'),
      type: 'required',
      icon: <MdChecklist className={styles.icon} />,
   },
   {
      id: 4,
      title: t('sections.warnings'),
      type: 'warnings',
      icon: <MdThumbDown className={styles.icon} />,
   },
   {
      id: 5,
      title: t('sections.gifts'),
      type: 'gifts',
      icon: <MdCardGiftcard className={styles.icon} />,
   },
];

const AboutProgramDet = ({}: AboutProgramDetProps) => {
   const t = useTranslations('packages.detail.aboutProgramDet');
   const sectionList = sections(t);
   const [activeIndex, setActiveIndex] = useState<number>(0);
   const [isHovered, setIsHovered] = useState(false);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   const startInterval = React.useCallback(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         if (!isHovered) {
            setActiveIndex(prevIndex =>
               prevIndex === sectionList.length - 1 ? 0 : prevIndex + 1,
            );
         }
      }, 60000);
   }, [isHovered, sectionList.length]);

   useEffect(() => {
      startInterval();
      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
      };
   }, [isHovered, startInterval]);

   const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
   const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);

   const renderContent = React.useCallback(
      (section: Section | undefined) => {
         if (!section || !section.type) {
            return <div className={styles.contentCard}>Section not found</div>;
         }

         switch (section.type) {
            case 'food':
               return (
                  <div
                     className={styles.contentCard}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     <FoodSection />
                  </div>
               );
            case 'places':
               return (
                  <div
                     className={styles.contentCard}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     <PlacesSection />
                  </div>
               );
            case 'required':
               return (
                  <div
                     className={styles.contentCard}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     <div className={styles.recommendContent}>
                        <RequiredOfYou />
                     </div>
                  </div>
               );
            case 'warnings':
               return (
                  <div
                     className={styles.contentCard}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     <WarningsSection />
                  </div>
               );
            case 'gifts':
               return (
                  <div
                     className={styles.contentCard}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     <GiftsSection />
                  </div>
               );
            default:
               return null;
         }
      },
      [handleMouseEnter, handleMouseLeave],
   );

   return (
      <div className='container'>
         <div className={styles.sectionList}>
            {sectionList.map((section, index) => (
               <button
                  key={section.id}
                  className={clsx(styles.sectionButton, {
                     [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
               >
                  <span className={styles.buttonText}>{section.title}</span>
                  <div className={styles.iconContainer}>
                     <span className={styles.iconWrapper}>{section.icon}</span>
                  </div>
               </button>
            ))}
         </div>
         {activeIndex >= 0 &&
            activeIndex < sectionList.length &&
            renderContent(sectionList[activeIndex])}
      </div>
   );
};

export default AboutProgramDet;
