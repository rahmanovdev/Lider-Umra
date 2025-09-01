'use client';
import React from 'react';
import styles from './Failed.module.scss';
import { useTranslations } from 'next-intl';
import { RxUpdate } from 'react-icons/rx';

interface FailedProps {
   error?: unknown;
}

const Failed: React.FC<FailedProps> = React.memo(() => {
   const t = useTranslations('failed');

   return (
      <div className={styles.failed}>
         <h1 className={styles.title}>{t('title')}</h1>
         <p className={styles.message}>{t('message')}</p>
         <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
         >
            <RxUpdate /> {t('retry')}
         </button>
      </div>
   );
});

Failed.displayName = 'Failed';

export default Failed;
