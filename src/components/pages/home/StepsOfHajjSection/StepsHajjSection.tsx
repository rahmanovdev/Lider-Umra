'use client';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import img1 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage1.png';
import img2 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage2.png';
import img3 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage3.png';
import img4 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage4.png';
import img5 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage5.png';
import scss from './StepsHajjSection.module.scss';
import { useTranslations } from 'next-intl';

const colors: { [key: number]: string } = {
   1: 'rgb(220, 255, 220)',
   2: 'rgb(200, 230, 255)',
   3: 'rgb(255, 250, 205)',
   4: 'rgb(225, 225, 255)',
   5: 'rgb(230, 240, 210)',
};

const stepsData = [
   { img: img1, key: 'steps.hajj' },
   { img: img2, key: 'steps.ihram' },
   { img: img3, key: 'steps.arafa' },
   { img: img4, key: 'steps.tawaf' },
   { img: img5, key: 'steps.saey' },
];

const StepsHajjSection = memo(() => {
   const t = useTranslations('stepsHajj');
   const [currentStep, setCurrentStep] = useState(1);
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   const scrollToStep = useCallback((nextStep: number) => {
      const container = scrollContainerRef.current;
      if (container) {
         const activeElement = document.getElementById(`step-${nextStep - 1}`);
         if (activeElement) {
            const containerWidth = container.offsetWidth;
            const elementOffset = activeElement.offsetLeft;
            const elementWidth = activeElement.offsetWidth;
            container.scrollTo({
               left: elementOffset - (containerWidth - elementWidth) / 2,
               behavior: 'smooth',
            });
         }
      }
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentStep(prevStep => {
            const nextStep = prevStep < 5 ? prevStep + 1 : 1;
            scrollToStep(nextStep);
            return nextStep;
         });
      }, 2000);

      return () => clearInterval(interval);
   }, [scrollToStep]);

   return (
      <section className={scss.Main}>
         <div className={scss.pre_main}>
            <div className='container'>
               <div className={scss.content}>
                  <h1>{t('title')}</h1>
                  <div className={scss.block_content} ref={scrollContainerRef}>
                     {stepsData.map((step, index) => {
                        const isActive = currentStep === index + 1;
                        return (
                           <div
                              id={`step-${index}`}
                              key={index}
                              className={`${scss.block} ${
                                 isActive ? scss.active : scss.inactive
                              }`}
                              style={{ background: colors[index + 1] }}
                           >
                              <h2>{t(step.key)}</h2>
                              <Image
                                 src={step.img}
                                 alt={t(step.key)}
                                 width={130}
                                 height={130}
                                 priority={isActive}
                                 className={scss.image}
                              />
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
});

StepsHajjSection.displayName = 'StepsHajjSection';
export default StepsHajjSection;
