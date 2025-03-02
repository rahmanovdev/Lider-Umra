'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import scss from './TrafficCard.module.scss';
import { FaStar } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/utils/format-date';

type TProps = {
   tour: TOURS.ITourPackages;
};

const StarRating = memo<{ count: number }>(({ count }) => (
   <div className={scss.starRating}>
      {Array.from({ length: count }, (_, index) => (
         <FaStar key={index} className={scss.star} />
      ))}
   </div>
));
StarRating.displayName = 'StarRating';

const TrafficCard = memo<TProps>(({ tour }) => {
   const t = useTranslations('traffics.card');
   const locale = useLocale();
   const startDate = useMemo(() => formatDate(tour.tour_date.start_tour), [tour.tour_date.start_tour]);
   const endDate = useMemo(() => formatDate(tour.tour_date.end_tour), [tour.tour_date.end_tour]);
   const starCount = useMemo(() => (tour.category.name === 'Комфорт +' ? 5 : 4), [tour.category.name]);

   const placeLabel = tour.place === 'Osh' ? 'Ош' : 'Бишкек';
   const monthLocale = locale === 'kg' ? 'kg' : 'ru';

   return (
      <div className={scss.Main}>
         <div className={scss.place}>
            <span>{placeLabel}</span>
         </div>
         <h2>{tour.category.name}</h2>
         <div className={scss.data_block}>
            <div className={scss.date_item}>
               <div className={scss.month_year}>
                  <h1>{startDate.day}</h1>
                  <div className={scss.month}>
                     <h5>{startDate.month[monthLocale]}</h5>
                     <h5>{startDate.year}</h5>
                  </div>
               </div>
            </div>
            <div className={scss.line} />
            <div className={scss.date_item}>
               <div className={scss.month_year}>
                  <h1>{endDate.day}</h1>
                  <div className={scss.month}>
                     <h5>{endDate.month[monthLocale]}</h5>
                     <h5>{endDate.year}</h5>
                  </div>
               </div>
            </div>
         </div>
         <div className={scss.img_block}>
            <Image
               src={tour.image}
               alt={tour.title}
               fill
               sizes="(max-width: 768px) 75vw, (max-width: 440px) 95vw, 400px"
               className={scss.image}
            />
         </div>
         <div className={scss.card_container}>
            <div className={scss.line}>
               <h4>{t('ajy')}</h4>
               <h5>{tour.ajy.name}</h5>
            </div>
            <hr className={scss.divider} />
            <div className={scss.line}>
               <h4>{t('category')}</h4>
               <h5>{tour.category.name}</h5>
            </div>
            <hr className={scss.divider} />
            <div className={scss.line}>
               <h4>{t('seats')}</h4>
               <h5>{tour.available_seats} мест</h5>
            </div>
            <hr className={scss.divider} />
            <div className={scss.line}>
               <h4>{t('duration')}</h4>
               <h5>{tour.tour_date.duration} дней</h5>
            </div>
            <hr className={scss.divider} />
            <div className={scss.line}>
               <h4>{t('hotelCategory')}</h4>
               <StarRating count={starCount} />
            </div>
            <hr className={scss.divider} />
         </div>
         <div className={scss.link}>
            <Link href={`/packages/${tour.id}`}>{t('details')}</Link>
         </div>
      </div>
   );
});

TrafficCard.displayName = 'TrafficCard';
export default TrafficCard;
