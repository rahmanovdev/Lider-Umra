'use client';
import React, { memo } from 'react';
import AboutCards from '@/components/common/cards/about_cards/AboutCards';
import RequiredOfYou from '@/components/common/required-of-you/RequiredOfYou';
import { useTranslations } from 'next-intl';
import { IoIosArrowDown } from 'react-icons/io';
import QuestionsSection from '../../home/QuestionsSection/QuestionsSection';
import scss from './AboutUsContent.module.scss';
import AboutUsImages from './AboutUsImage/AboutUsImage';
import { aboutLider } from './constants/constants';
import Whywe from './WhyWe/WhyWe';

const AboutUsContent = memo(() => {
   const t = useTranslations('aboutUs');

   return (
      <div className={scss.AboutUsContent}>
         <div className={scss.head_about}>
            <h1 dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
            <a href='#about'>
               <IoIosArrowDown />
            </a>
         </div>
         <div id='about' className={scss['about']}>
            <div className={`container ${scss.container}`}>
               <div className={scss.content}>
                  <div className={scss.about_content}>
                     <div className={scss.video_container}>
                        <iframe
                           width='560'
                           height='315'
                           src='https://www.youtube.com/embed/6i2rjWV5Djc'
                           title='YouTube video player'
                           frameBorder='0'
                           allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                           allowFullScreen
                        />
                     </div>
                     {aboutLider.map((item, index) => (
                        <div
                           key={index}
                           className={scss.item}
                           dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                     ))}
                  </div>
                  <AboutCards />
               </div>
            </div>
         </div>
         <AboutUsImages />
         <div className={scss.why_we}>
            <Whywe />
         </div>
         <div className={scss.required}>
            <RequiredOfYou />
         </div>
         <QuestionsSection />
      </div>
   );
});

AboutUsContent.displayName = 'AboutUsContent';
export default AboutUsContent;
