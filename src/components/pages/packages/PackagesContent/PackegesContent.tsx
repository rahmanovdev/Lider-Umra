'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import TrafficsSection from '../../home/TrafficsSection/TrafficsSection';
import TrafficFilters from '../../home/traffic-filters/TrafficFilters';
import scss from './PackegesContent.module.scss';
import React, { useState, useMemo } from 'react';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { formatDate, months } from '@/utils/format-date';

const PackegesContent = () => {
   const { data: tours = [], isLoading, error } = useGetToursQuery();
   const searchParams = useSearchParams();
   const locale = useLocale();
   const defaultMonth = locale === 'ru' ? 'Все' : 'Баары';
   const [filter, setFilter] = useState({
      month: defaultMonth,
      place: searchParams.get('place')?.toLowerCase() || 'all',
   });

   React.useEffect(() => {
      const place = searchParams.get('place')?.toLowerCase() || 'all';
      if (place !== filter.place) {
         setFilter(prev => ({ ...prev, place }));
      }
   }, [searchParams, filter.place]);

   const filteredTours = useMemo(() => {
      if (!Array.isArray(tours)) return [];

      let result = [...tours].sort((a, b) => {
         const dateA = new Date(a.tour_date.start_tour).getTime();
         const dateB = new Date(b.tour_date.start_tour).getTime();
         return dateB - dateA;
      });

      if (filter.month !== defaultMonth) {
         const monthIndex = months.findIndex(m => m.value === filter.month);
         if (monthIndex !== -1) {
            result = result.filter(
               tour =>
                  new Date(tour.tour_date.start_tour).getMonth() === monthIndex,
            );
         }
      }

      if (filter.place !== 'all') {
         result = result.filter(tour =>
            tour.place.toLowerCase().includes(filter.place),
         );
      }

      return result;
   }, [tours, filter, defaultMonth]);

   const tourDates = useMemo(
      () =>
         filteredTours.map(tour => ({
            start: formatDate(tour.tour_date.start_tour),
            end: formatDate(tour.tour_date.end_tour),
         })),
      [filteredTours],
   );

   if (isLoading) return <Loading />;
   if (error) return <Failed error={error} />;

   return (
      <div className={scss.PackegesContent}>
         <div className='container'>
            <TrafficsSection tours={filteredTours}>
               <TrafficFilters
                  value={filter.month}
                  dates={tourDates}
                  onFilterChange={month =>
                     setFilter(prev => ({ ...prev, month }))
                  }
               />
            </TrafficsSection>
         </div>
      </div>
   );
};

export default PackegesContent;
