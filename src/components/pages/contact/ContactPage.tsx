'use client';
import React from 'react';
import styles from './ContactPage.module.scss';
import { useTranslations } from 'next-intl';
import { FaRegClock } from 'react-icons/fa6';
import { MdOutlinePhone } from 'react-icons/md';
import { LuMapPinned } from 'react-icons/lu';
import { useSize } from '@/hooks/use-size';

export const Address = {
   OSH: {
      phone: '+996554348818',
      address:
         'https://widgets.2gis.com/widget?type=firmsonmap&options={%22pos%22:{%22lat%22:40.53167602215591,%22lon%22:72.8072762489319,%22zoom%22:16},%22opt%22:{%22city%22:%22bishkek%22},%22org%22:%2270000001098269092%22}',
   },
   BISHKEK: {
      phone: '+996707150815',
      address:
         'https://widgets.2gis.com/widget?type=firmsonmap&options={%22pos%22:{%22lat%22:42.88407756137023,%22lon%22:74.61924791336061,%22zoom%22:16},%22opt%22:{%22city%22:%22bishkek%22},%22org%22:%2270000001088454371%22}',
   },
};

const ContactPage: React.FC = () => {
   const t = useTranslations('contact');
   const size = useSize('#contactInfo');
   const key = 'BISHKEK';

   return (
      <div className={styles.contactPage}>
         <div className={styles.container}>
            <div className={styles.contentWrapper}>
               <div className={styles.mapCard}>
                  <iframe
                     style={{ height: size.height }}
                     className={styles['iframe']}
                     allowFullScreen
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                     src={Address[key].address}
                  ></iframe>
               </div>
               <div id='contactInfo' className={styles.contactInfo}>
                  <h1 className={styles.title}>{t('whereWeAre')}</h1>
                  <p>{t('description')}</p>
                  <div className={styles['cards']}>
                     <div className={styles['card']}>
                        <FaRegClock />
                        <div className={styles['column']}>
                           <h5>{t('workingHoursTitle')}</h5>
                           <p>Понедельник – суббота 9:00 - 18:00</p>
                        </div>
                     </div>
                     <div className={styles['card']}>
                        <MdOutlinePhone />
                        <div className={styles['column']}>
                           <h5>Телефон</h5>
                           <p>+996 707 150 815</p>
                        </div>
                     </div>
                     <div className={styles['card']}>
                        <LuMapPinned />
                        <div className={styles['column']}>
                           <h5>{t('addressTitle')}</h5>
                           <p>
                              Кыргызстан, г. Бишкек, ул. Абая Кунанбаева 58/4
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
