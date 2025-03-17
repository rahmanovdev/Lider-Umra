'use client';
import React from 'react';
import styles from './ContactPage.module.scss';
import { useTranslations } from 'next-intl';

const ContactPage: React.FC = () => {
   const t = useTranslations('contact');

   return (
      <div className={styles.contactPage}>
         <div className={styles.container}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
            <form className={styles.contactForm}>
               <input
                  type='text'
                  placeholder={t('name')}
                  className={styles.inputField}
               />
               <input
                  type='phone'
                  placeholder={t('phone')}
                  className={styles.inputField}
               />
               <textarea
                  placeholder={t('message')}
                  className={styles.textareaField}
               ></textarea>
               <button type='submit' className={styles.submitButton}>
                  {t('send')}
               </button>
            </form>
            <div className={styles.contactInfo}>
               <p>
                  <strong>{t('phoneLabel')}</strong> +7 (123) 456-78-90
               </p>
               <p>
                  <strong>{t('emailLabel')}</strong> info@lider-umra.com
               </p>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
