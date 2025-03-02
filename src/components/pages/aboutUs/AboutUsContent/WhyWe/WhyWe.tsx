'use client';
import React from 'react';
import scss from './WhyWe.module.scss';
import Image from 'next/image';
import { useTimeLine } from '@/hooks/use-time-line';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Assets } from '@/assets';

const Whywe = () => {
   const t = useTranslations();
   const { containerRef, height, heightTransform, ref, activeSections } =
      useTimeLine(true);

   const packages = [
      {
         title: t('aboutUs.advantages.service'),
         content: t('aboutUs.advantages.serviceDescription'),
      },
      {
         title: t('aboutUs.advantages.transport'),
         content: t('aboutUs.advantages.transportDescription'),
      },
      {
         title: t('aboutUs.advantages.hotels'),
         content: t('aboutUs.advantages.hotelsDescription'),
      },
      {
         title: t('aboutUs.advantages.responsibility'),
         content: t('aboutUs.advantages.responsibilityDescription'),
      },
      {
         title: t('aboutUs.advantages.approach'),
         content: t('aboutUs.advantages.approachDescription'),
      },
   ];

   return (
      <section className={scss.whywe}>
         <div className={`${scss.container} container`}>
            <h2>{t('aboutUs.advantagesTitle')}</h2>
            <div className={scss['content']}>
               <figure className={scss['figure']}>
                  <Image
                     width={490}
                     height={650}
                     src={Assets.Images.About.Advantages.src}
                     alt='about-page-advantages.jpg'
                  />
               </figure>
               <div className={scss.wrapper} ref={containerRef}>
                  <div ref={ref} className={scss.timelineContainer}>
                     {packages.map((item, index) => (
                        <div
                           key={index}
                           className={`${index === 0 && scss.isFirst} ${
                              scss.timelineEntry
                           }`}
                        >
                           <div
                              className={scss.timelineMark}
                              data-timeline-mark
                           >
                              <div
                                 className={`${scss.markCircleOuter} ${
                                    activeSections.includes(index) &&
                                    scss.active
                                 }`}
                              >
                                 {index + 1}
                              </div>
                           </div>

                           <div className={scss.contentWrapper}>
                              <h3 className={scss.markTitle}>{item.title}</h3>
                              <p>{item.content}</p>
                           </div>
                        </div>
                     ))}
                     <div
                        style={{ height: height + 'px' }}
                        className={scss.timelineLine}
                     >
                        <motion.div
                           style={{ height: heightTransform }}
                           className={scss.timelineProgress}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Whywe;
