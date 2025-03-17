'use client';
import React from 'react';
import styles from './Loading.module.scss';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
const Loading: React.FC<{ withMargin?: boolean }> = ({ withMargin = true }) => {
   const t = useTranslations();
   return (
      <div className={clsx(styles.loading, withMargin && styles['wm'])}>
         <div className={styles.loading__inner}>
            <div className={styles.spinner}></div>
            <span>{t('loading')}</span>
         </div>
      </div>
   );
};

export default Loading;
