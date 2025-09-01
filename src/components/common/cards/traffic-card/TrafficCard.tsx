'use client';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import scss from './TrafficCard.module.scss';
import { FaStar } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/utils/format-date';
import CImage from '@/components/ui/cimage/CImage';

type TProps = {
   tour: TOURS.ITourPackages;
};

const StarRating = memo<{ count: number }>(({ count }) => (
   <div className={scss.starRating}>
      {Array(count)
         .fill(0)
         .map((_, index) => (
            <FaStar key={index} className={scss.star} />
         ))}
   </div>
));
StarRating.displayName = 'StarRating';

const TrafficCard = memo<TProps>(({ tour }) => {
   const t = useTranslations('traffics.card');
   const locale = useLocale();
   const startDate = useMemo(
      () => formatDate(tour.tour_date.start_tour),
      [tour.tour_date.start_tour],
   );
   const endDate = useMemo(
      () => formatDate(tour.tour_date.end_tour),
      [tour.tour_date.end_tour],
   );
   const starCount = 4;
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
            <CImage
               src={tour.image}
               alt={`Title - ${tour.title}`}
               fill
               sizes='(max-width: 768px) 75vw, (max-width: 440px) 95vw, 400px'
               className={scss.image}
            />
         </div>
         <div className={scss.card_container}>
            {[
               { label: t('ajy'), value: tour.ajy.name },
               { label: t('category'), value: tour.category.name },
               { label: t('seats'), value: `${tour.available_seats} мест` },
               {
                  label: t('duration'),
                  value: `${tour.tour_date.duration} дней`,
               },
               {
                  label: t('hotelCategory'),
                  value: <StarRating count={starCount} />,
               },
            ].map((item, index) => (
               <React.Fragment key={index}>
                  <div className={scss.line}>
                     <h4>{item.label}</h4>
                     {typeof item.value === 'string' ? (
                        <h5>{item.value}</h5>
                     ) : (
                        item.value
                     )}
                  </div>
                  {index < 4 && <hr className={scss.divider} />}
               </React.Fragment>
            ))}
         </div>
         <div className={scss.link}>
            <Link href={`/packages/${tour.id}`}>{t('details')}</Link>
         </div>
      </div>
   );
});

TrafficCard.displayName = 'TrafficCard';
export default TrafficCard;
