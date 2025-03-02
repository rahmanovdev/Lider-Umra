// src/components/package-client/HeadPackegeDet.tsx
'use client';
import { formatDate } from '@/utils/format-date';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { MdOutlineEditNote } from 'react-icons/md';
import scss from './HeadPackegeDet.module.scss';
import { useCreateClientMutation } from '@/redux/api/packege_client';
import { ModalClient } from '@/components/ui/modals/modalTelegramClients/ModalClients';
import { Modal } from '../components/shared/Modal';

interface TOURS {
   ITourPackages: {
      id: number;
      title: string;
      category: { name: string };
      available_seats: number;
      tour_date: { start_tour: string; end_tour: string; duration: number };
      ajy: { name: string; image: string; bio: string };
   };
}

interface HeadPackegeDetProps {
   tourData: TOURS['ITourPackages'];
}

const HeadPackegeDet: React.FC<HeadPackegeDetProps> = ({ tourData }) => {
   const t = useTranslations('packages.detail.headPackegeDet');
   const locale = useLocale();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
   const [showReadMore, setShowReadMore] = useState(false);
   const bioContentRef = useRef<HTMLDivElement>(null);

   const [createClient] = useCreateClientMutation();

   useEffect(() => {
      if (typeof window === 'undefined') return;
      const checkOverflow = () => {
         if (bioContentRef.current) {
            const isOverflowing =
               bioContentRef.current.scrollHeight >
               bioContentRef.current.clientHeight;
            setShowReadMore(isOverflowing);
         }
      };

      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
   }, [tourData.ajy.bio]);

   const startDate = formatDate(tourData.tour_date.start_tour);
   const endDate = formatDate(tourData.tour_date.end_tour);

   const startDateObj = new Date(tourData.tour_date.start_tour);
   const startDay = startDateObj.getDate().toString().padStart(2, '0');
   const startMonthNumber = (startDateObj.getMonth() + 1)
      .toString()
      .padStart(2, '0');
   const formattedStartDate = `${startDate.day} ${
      startDate.month[locale as 'kg']
   } ${startDate.year}`;
   const formattedEndDate = `${endDate.day} ${endDate.month[locale as 'kg']} ${
      endDate.year
   }`;

   const handleApplySubmit = async (formData: {
      full_name: string;
      phone: string;
      country: string;
      city: string;
      package: number;
   }) => {
      try {
         await createClient({
            full_name: formData.full_name,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            package: formData.package,
         }).unwrap();
         alert('Заявка успешно отправлена!');
      } catch (error) {
         console.error('Ошибка:', error);
         alert('Произошла ошибка при отправке заявки.');
      }
   };

   return (
      <div className={scss.HeadPackegeDet}>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.card_container}>
                  <div className={scss.info_card}>
                     <div className={scss.date_range}>
                        <div className={scss.date_item}>
                           <div className={scss.month_year}>
                              <h1>{startDate.day}</h1>
                              <div className={scss.month}>
                                 <h5>{startDate.month[locale as 'kg']}</h5>
                                 <h5>{startDate.year}</h5>
                              </div>
                           </div>
                        </div>
                        <div className={scss.line} />
                        <div className={scss.date_item}>
                           <div className={scss.month_year}>
                              <h1>{endDate.day}</h1>
                              <div className={scss.month}>
                                 <h5>{endDate.month[locale as 'kg']}</h5>
                                 <h5>{endDate.year}</h5>
                              </div>
                           </div>
                        </div>
                     </div>
                     <hr />
                     <div className={scss.card_info}>
                        <div className={scss.info_item}>
                           <h4>{t('category')}</h4>
                           <h5>{tourData.category.name}</h5>
                        </div>
                        <div className={scss.info_item}>
                           <h4>{t('quantity')}</h4>
                           <h5>
                              {tourData.available_seats} {t('seats')}
                           </h5>
                        </div>
                        <div className={scss.info_item}>
                           <h4>{t('duration')}</h4>
                           <h5>
                              {tourData.tour_date.duration} {t('days')}
                           </h5>
                        </div>
                     </div>
                  </div>
                  <div className={scss.image_card}>
                     <div className={scss.leader_container}>
                        <div className={scss.leader_header}>
                           <h3>{t('leader')}</h3>
                        </div>
                        <div className={scss.leader_content}>
                           <div className={scss.leader_image}>
                              <Image
                                 src={tourData.ajy.image}
                                 alt={tourData.ajy.name}
                                 width={300}
                                 height={300}
                              />
                           </div>
                           <div className={scss.leader_info}>
                              <h4>{tourData.ajy.name}</h4>
                              <div className={scss.bio_container}>
                                 <div
                                    ref={bioContentRef}
                                    className={scss.bio_content}
                                    dangerouslySetInnerHTML={{
                                       __html: tourData.ajy.bio,
                                    }}
                                 />
                                 {showReadMore && (
                                    <button
                                       className={scss.readMore}
                                       onClick={() => setIsModalOpen(true)}
                                    >
                                       {t('readMore')}
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={scss.call_buttons}>
                  <button onClick={() => setIsApplyModalOpen(true)}>
                     <MdOutlineEditNote size={20} />
                     {t('buttons.apply')}
                  </button>
                  <button>
                     <FaWhatsapp size={20} />
                     {t('buttons.whatsapp')}
                  </button>
                  <button>
                     <IoCall size={20} />
                     {t('buttons.call')}
                  </button>
               </div>
            </div>
         </div>
         <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={tourData.ajy.name}
            content={tourData.ajy.bio}
         />
         <ModalClient
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
            title={`${startDay}.${startMonthNumber}.${startDate.year} Умра сапары ${tourData.category.name} Пакети`}
            tourData={{
               id: tourData.id,
               title: tourData.title,
               startDate: formattedStartDate,
               endDate: formattedEndDate,
               category: tourData.category.name,
            }}
            onSubmit={handleApplySubmit}
         />
      </div>
   );
};

export default HeadPackegeDet;
