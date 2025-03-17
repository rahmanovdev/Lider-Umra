// src/components/package-client/HeadPackegeDet.tsx
'use client';

import React, { memo, Suspense, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { MdOutlineEditNote } from 'react-icons/md';
import { formatDate } from '@/utils/format-date';
import { useCreateClientMutation } from '@/redux/api/packege_client';
import dynamic from 'next/dynamic';
import scss from './HeadPackegeDet.module.scss';
import Loading from '@/components/ui/loading/Loading';
import DateRange from './ui/DateRange';
import LeaderSection from './ui/LeaderSection';

const ModalClient = dynamic(
   () => import('@/components/ui/modals/modalTelegramClients/ModalClients'),
   {
      ssr: false,
      loading: () => <Loading />,
   },
);

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

const HeadPackegeDet: React.FC<HeadPackegeDetProps> = memo(({ tourData }) => {
   const t = useTranslations('packages.detail.headPackegeDet');
   const locale = useLocale();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
   const [createClient] = useCreateClientMutation();

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

   const handleApplySubmit = React.useCallback(
      async (formData: {
         full_name: string;
         phone: string;
         country: string;
         city: string;
         package: number;
      }) => {
         try {
            await createClient(formData).unwrap();
            alert('Заявка успешно отправлена!');
         } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке заявки.');
         }
      },
      [createClient],
   );

   return (
      <div className={scss.HeadPackegeDet}>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.card_container}>
                  <div className={scss.info_card}>
                     <Suspense fallback={<Loading />}>
                        <DateRange
                           startDate={startDate}
                           endDate={endDate}
                           locale={locale}
                        />
                     </Suspense>
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
                  <Suspense fallback={<Loading />}>
                     <div className={scss.image_card}>
                        <LeaderSection
                           ajy={tourData.ajy}
                           t={t}
                           isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
                        />
                     </div>
                  </Suspense>
               </div>
               <div className={scss.call_buttons}>
                  <button onClick={() => setIsApplyModalOpen(true)}>
                     <MdOutlineEditNote size={20} />
                     {t('buttons.apply')}
                  </button>
                  <a target='_blank' href='https://wa.me/996707150815'>
                     <FaWhatsapp size={20} />
                     {t('buttons.whatsapp')}
                  </a>
                  <a href='tel:+996707150815'>
                     <IoCall size={20} />
                     {t('buttons.call')}
                  </a>
               </div>
            </div>
         </div>
         <Suspense fallback={<Loading />}>
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
         </Suspense>
      </div>
   );
});

HeadPackegeDet.displayName = 'HeadPackegeDet';

export const DynamicHeadPackegeDet = dynamic(
   () => Promise.resolve(HeadPackegeDet),
   {
      ssr: false,
      loading: () => <Loading />,
   },
);

export default HeadPackegeDet;
