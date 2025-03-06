'use client';
import React from 'react';
import scss from './QuestionsSection.module.scss';
import { useTranslations } from 'next-intl';
import { useSize } from '@/hooks/use-size';

const QuestionsSection = () => {
   const t = useTranslations('questions');
   const { width } = useSize();
   if (width < 1000) return;
   return (
      <section className={scss.Main}>
         <div className={scss.back_photo}></div>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.block}>
                  <h1>{t('title')}</h1>
                  <p>{t('description')}</p>

                  <div className={scss.inputs}>
                     <input type='text' placeholder={t('name')} />
                     <input type='text' placeholder={t('phone')} />
                     <button>{t('button')}</button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default QuestionsSection;
