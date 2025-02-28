'use client';
import { useGetFaqsQuery } from '@/redux/api/faq';
import { useTranslations } from 'next-intl';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Accordion } from '../../ui/accordion';
import Failed from '../../ui/failed/Failed';
import Loading from '../../ui/loading/Loading';
import styles from './FAQ.module.scss';

const FAQ: React.FC = () => {
   const t = useTranslations('faq');
   const { data, isLoading, error } = useGetFaqsQuery();

   const faq = data
      ? data.map(v => ({
           value: `${v.id}`,
           label: v.question,
           content: v.answer,
        }))
      : [];

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <h2 className={styles.title}>{t('title')}</h2>
            {isLoading ? (
               <Loading />
            ) : error ? (
               <Failed error={error} />
            ) : (
               <Accordion
                  trailingContent={({ isActive }) => (
                     <IoIosArrowDown
                        style={{
                           transform: isActive ? 'rotate(180deg)' : '',
                           transition: 'all .25s',
                        }}
                     />
                  )}
                  items={faq}
               />
            )}
         </div>
      </section>
   );
};

export default FAQ;
