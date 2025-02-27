'use client';
import React from 'react';
import styles from './TrafficFilters.module.scss';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { months } from '@/utils/format-date';

interface IDate {
   day: number;
   month: Record<'kg' | 'ru' | 'value', string>;
   year: number;
}

interface DateRange {
   start: IDate;
   end: IDate;
}

interface TrafficFiltersProps {
   onFilterChange: (month: string) => void;
   dates: DateRange[];
   value: string;
}

const TrafficFilters: React.FC<TrafficFiltersProps> = ({
   onFilterChange,
   dates,
   value,
}) => {
   const t = useTranslations('traffics.filters');
   const locale = useLocale();

   const ValuesKey = React.useMemo(() => {
      const uniqueDateKeys = Array.from(
         new Set(
            dates.map(date => {
               const month =
                  date.start.month[locale as 'kg' | 'ru'].toLowerCase();
               const year = date.start.year || 'default';
               return `${month}-${year}-${date.start.month.value}`;
            }),
         ),
      );

      const dynamicValues: Record<string, { desc: string; year?: string }> = {
         all: { desc: locale === 'kg' ? 'Бардык пакеттер' : 'Все пакеты' },
      };
      uniqueDateKeys.forEach(dateKey => {
         const [month, year, value] = dateKey.split('-');
         const monthData = months.find(
            m => m[locale as 'kg' | 'ru'].toLowerCase() === month,
         ) || {
            kg: month,
            ru: month,
         };

         dynamicValues[value] = {
            desc: `${monthData[locale as 'kg' | 'ru']}`,
            year,
         };
      });

      return dynamicValues;
   }, [dates, locale]);

   const yearRange = React.useMemo(() => {
      if (!dates.length) return '';

      const years = [
         ...dates.map(date => date.start.year),
         ...dates.map(date => date.end.year),
      ];
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      return minYear === maxYear
         ? `${minYear}-${minYear + 1}`
         : `${minYear}-${maxYear}`;
   }, [dates]);

   const handleClick = React.useCallback(
      (key: string) => {
         onFilterChange(key);
      },
      [onFilterChange],
   );

   return (
      <div className={styles.traffic_filters}>
         <h1>
            {t('title')} {yearRange}
         </h1>
         <div className={styles.container}>
            {Object.keys(ValuesKey).map(key => (
               <button
                  key={key}
                  onClick={() => handleClick(key)}
                  className={clsx({
                     [styles.active]: value === key,
                  })}
               >
                  {ValuesKey[key].desc}
               </button>
            ))}
         </div>
      </div>
   );
};

export default TrafficFilters;
