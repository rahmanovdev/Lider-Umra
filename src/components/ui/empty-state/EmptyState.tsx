'use client';
import React from 'react';
import styles from './EmtpyState.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
interface IProps {
   icon?: React.ReactNode;
   link?: { label: string; href: string };
}

const EmptyState: React.FC<IProps> = React.memo(({ icon, link }) => {
   const t = useTranslations();

   return (
      <div className={styles.emptyState}>
         {icon}
         <h2 className={styles.emptyTitle}>{t('emptyState.title')}</h2>
         <p className={styles.emptyMessage}>{t('emptyState.description')}</p>
         {link && (
            <Link href={link.href} className={styles.emptyButton}>
               {link.label}
            </Link>
         )}
      </div>
   );
});
EmptyState.displayName = 'EmptyState';

export default EmptyState;
