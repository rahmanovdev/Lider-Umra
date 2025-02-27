'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import TrafficsSection from '../../home/TrafficsSection/TrafficsSection';
import TrafficFilters from '../../home/traffic-filters/TrafficFilters';
import scss from './PackegesContent.module.scss';
import React, { useState } from 'react';
import Loading from '@/components/ui/loading/Loading';
import { formatDate, months } from '@/utils/format-date';
import Failed from '@/components/ui/failed/Failed';
import { useSearchParams } from 'next/navigation';

const PackegesContent = () => {
   const { data: tours = [], isLoading, error } = useGetToursQuery();
   const sp = useSearchParams();
   const [currentFilter, setCurrentFilter] = useState({
      month: 'all',
      place: sp.get('place')?.toLowerCase() || 'all',
   });

   React.useEffect(() => {
      const place = sp.get('place')?.toLowerCase() || 'all';
      setCurrentFilter(prev => ({
         ...prev,
         place,
      }));
   }, [sp]);

   const getFilteredTours = React.useCallback(() => {
      if (!Array.isArray(tours)) return [];

      const sortedTours = [...tours].sort(
         (a, b) =>
            new Date(b.tour_date.start_tour).getTime() -
            new Date(a.tour_date.start_tour).getTime(),
      );

      let filteredTours = sortedTours;

      if (currentFilter.month !== 'all') {
         const monthIndex = months.findIndex(
            month => month.value === currentFilter.month,
         );

         if (monthIndex !== -1) {
            filteredTours = filteredTours.filter(tour => {
               const tourDate = new Date(tour.tour_date.start_tour);
               const tourMonth = tourDate.getMonth();
               return tourMonth === monthIndex;
            });
         }
      }

      if (currentFilter.place !== 'all') {
         filteredTours = filteredTours.filter(tour =>
            tour.place.toLowerCase().includes(currentFilter.place),
         );
      }

      return filteredTours;
   }, [currentFilter, tours]);

   const dates = React.useMemo(
      () =>
         tours.map(v => ({
            start: formatDate(v.tour_date.start_tour),
            end: formatDate(v.tour_date.end_tour),
         })),
      [tours],
   );

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Failed error={error} />;
   }

   return (
      <div className={scss.PackegesContent}>
         <div className='container'>
            <TrafficsSection
               key={JSON.stringify(currentFilter)}
               tours={getFilteredTours()}
            >
               <TrafficFilters
                  value={currentFilter.month}
                  dates={dates}
                  onFilterChange={month =>
                     setCurrentFilter(prev => ({
                        ...prev,
                        month,
                     }))
                  }
               />
            </TrafficsSection>
         </div>
      </div>
   );
};

export default PackegesContent;
