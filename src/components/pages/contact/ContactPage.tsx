'use client';
import { useSize } from '@/hooks/use-size';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { LuMapPinned } from 'react-icons/lu';
import { MdOutlinePhone } from 'react-icons/md';
import styles from './ContactPage.module.scss';

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
   const [key, setKey] = useState<'BISHKEK' | 'OSH'>('BISHKEK'); // Дефолттук маани BISHKEK

   const handleCityChange = (city: 'BISHKEK' | 'OSH') => {
      setKey(city);
   };

   return (
      <div className={styles.contactPage}>
         <div className={styles.container}>
            <div className={styles.buttonContainer}>
               <button
                  className={`${styles.button} ${styles.primary} ${
                     key === 'BISHKEK' ? styles.active : ''
                  }`}
                  onClick={() => handleCityChange('BISHKEK')}
               >
                  Бишкек
               </button>
               <button
                  className={`${styles.button} ${styles.primary} ${
                     key === 'OSH' ? styles.active : ''
                  }`}
                  onClick={() => handleCityChange('OSH')}
               >
                  Ош
               </button>
            </div>
            <div className={styles.contentWrapper}>
               <div className={styles.mapCard}>
                  <iframe
                     style={{ height: size.height || '400px' }} // Fallback бийиктик
                     className={styles.iframe}
                     allowFullScreen
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                     src={Address[key].address}
                  />
               </div>
               <div id='contactInfo' className={styles.contactInfo}>
                  <h1 className={styles.title}>{t('whereWeAre')}</h1>
                  <p>{t('description')}</p>
                  <div className={styles.cards}>
                     <div className={styles.card}>
                        <FaRegClock />
                        <div className={styles.column}>
                           <h5>{t('workingHoursTitle')}</h5>
                           <p>Понедельник – суббота 9:00 - 18:00</p>
                        </div>
                     </div>
                     <div className={styles.card}>
                        <MdOutlinePhone />
                        <div className={styles.column}>
                           <h5>Телефон</h5>
                           <p>{Address[key].phone}</p>{' '}
                           {/* Динамикалык телефон */}
                        </div>
                     </div>
                     <div className={styles.card}>
                        <LuMapPinned />
                        <div className={styles.column}>
                           <h5>{t('addressTitle')}</h5>
                           <p>
                              {key === 'BISHKEK'
                                 ? 'Кыргызстан, г. Бишкек, улица Гоголя, 191'
                                 : 'Кыргызстан, г. Ош, улица Аскар Шакиров, 242в/1'}
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
