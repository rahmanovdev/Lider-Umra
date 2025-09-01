'use client';
import Image from 'next/image';
import * as React from 'react';

import scss from './StepsHajjSection.module.scss';
import { useTranslations } from 'next-intl';
import { Assets } from '@/assets';

const colors: { [key: number]: string } = {
   1: 'rgb(220, 255, 220)',
   2: 'rgb(200, 230, 255)',
   3: 'rgb(255, 250, 205)',
   4: 'rgb(225, 225, 255)',
   5: 'rgb(230, 240, 210)',
};

const StepsHajjSection = React.memo(() => {
   const t = useTranslations('stepsHajj');
   const [currentStep, setCurrentStep] = React.useState(1);
   const scrollContainerRef = React.useRef<HTMLDivElement>(null);

   const steps = React.useMemo(
      () => [
         { title: t('steps.hajj') },
         { title: t('steps.ihram') },
         { title: t('steps.arafa') },
         { title: t('steps.tawaf') },
         { title: t('steps.saey') },
      ],
      [t],
   );

   const scrollToStep = React.useCallback((nextStep: number) => {
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

   React.useEffect(() => {
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
                     {steps.map((step, index) => {
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
                              <h2>{step.title}</h2>
                              <Image
                                 src={Assets.Images.HadjStages[index]}
                                 alt={`Stage - ${index}`}
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
