'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import scss from './About_ProgramDet.module.scss';
import React, { memo } from 'react';

interface AboutProgramDetProps {
   tourData: TOURS.ITourPackages;
}

const About_ProgramDet = memo<AboutProgramDetProps>(({ tourData }) => {
   const t = useTranslations('packages.detail.about_ProgramDet');

   return (
      <section className={scss.About_ProgramDet}>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.program_left}>
                  <Image
                     width={700}
                     height={500}
                     priority
                     quality={70}
                     src='/assets/images/about-page-advantages.jpg'
                     alt='about_program'
                  />
               </div>
               <div className={scss.about_text}>
                  <h1>{tourData.title || t('title')}</h1>{' '}
                  <p>{tourData.description || t('description')}</p>{' '}
               </div>
            </div>
         </div>
      </section>
   );
});

About_ProgramDet.displayName = 'About_ProgramDet';
export default About_ProgramDet;
