'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import scss from './HeroSection.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Assets } from '@/assets';

type IndicatorsProps = {
   current: number;
   total: number;
   onClick: (index: number) => void;
};

const HeroText = memo(() => {
   const t = useTranslations('hero');
   return (
      <div className={scss.hero_text}>
         <h1 dangerouslySetInnerHTML={{ __html: t('title') }} />
         <p dangerouslySetInnerHTML={{ __html: t('description') }} />
      </div>
   );
});
HeroText.displayName = 'HeroText';

const HeroButtons = memo(() => {
   const t = useTranslations('hero.buttons');
   return (
      <div className={scss.hero_btn}>
         <Link href='/packages'>{t('tour')}</Link>
      </div>
   );
});
HeroButtons.displayName = 'HeroButtons';

const images = Assets.Images.HeroBackgrounds;

const Indicators = memo(({ current, total, onClick }: IndicatorsProps) => {
   return (
      <div className={scss.indicators}>
         {Array.from({ length: total }, (_, index) => (
            <button
               key={index}
               className={`${scss.indicator} ${
                  current === index ? scss.active : ''
               }`}
               onClick={() => onClick(index)}
               aria-label={`Slide ${index + 1}`}
            />
         ))}
      </div>
   );
});
Indicators.displayName = 'Indicators';

const HeroSection: React.FC = () => {
   const [currentSlide, setCurrentSlide] = useState(0);

   const handleSlideChange = useCallback((index: number) => {
      setCurrentSlide(index);
   }, []);

   useEffect(() => {
      const timer = setInterval(() => {
         setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(timer);
   }, []);

   return (
      <div className={scss.HeroSection}>
         {images.map((slide, index) => (
            <div
               key={slide.src}
               className={`${scss.imageWrapper} ${
                  currentSlide === index ? scss.active : ''
               }`}
            >
               <Image
                  src={slide}
                  alt={`Slide image - ${index}`}
                  priority={index === 0}
                  quality={75}
                  fill
                  sizes='100vw'
                  className={scss.backgroundImage}
               />
            </div>
         ))}
         <div className={scss.overlay} />
         <div className='container'>
            <div className={scss.content}>
               <HeroText />
               <HeroButtons />
            </div>
         </div>
         <Indicators
            current={currentSlide}
            total={images.length}
            onClick={handleSlideChange}
         />
      </div>
   );
};

export default memo(HeroSection);
