'use client';
import { useTranslations } from 'next-intl';
import scss from './About_ProgramDet.module.scss';
import { Assets } from '@/assets';
import React, { memo } from 'react';
import CImage from '@/components/ui/cimage/CImage'

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
                  <CImage
                     width={700}
                     height={500}
                     priority
                     quality={70}
                     src={Assets.Images.About.Advantages}
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
