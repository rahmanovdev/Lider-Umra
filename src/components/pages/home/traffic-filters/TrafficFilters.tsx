'use client';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import styles from './TrafficFilters.module.scss';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { months } from '@/utils/format-date';
import { useSearchParams, useRouter } from 'next/navigation';
import { useClickAway } from '@/hooks/use-click-away';

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

const options = [
   { value: 'all', label: 'All' },
   { value: 'bishkek', label: 'Bishkek' },
   { value: 'osh', label: 'Osh' },
];

const TrafficFilters = memo<TrafficFiltersProps>(
   ({ onFilterChange, dates, value }) => {
      const searchParams = useSearchParams();
      const router = useRouter();
      const t = useTranslations('traffics.filters');
      const locale = useLocale();
      const [isOpen, setIsOpen] = useState(false);
      const selectRef = useRef<HTMLDivElement>(null);

      useClickAway(() => setIsOpen(false), selectRef);

      const handleSelect = useCallback(
         (optionValue: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('place', optionValue);
            router.push(`?${params.toString()}`);
            setIsOpen(false);
         },
         [router, searchParams],
      );

      const handleClick = useCallback(
         (key: string) => {
            onFilterChange(key);
         },
         [onFilterChange],
      );

      const ValuesKey = useMemo(() => {
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

         const dynamicValues: Record<string, { desc: string; year?: string }> =
            {
               all: {
                  desc: locale === 'kg' ? 'Бардык пакеттер' : 'Все пакеты',
               },
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
               desc: monthData[locale as 'kg' | 'ru'],
               year,
            };
         });

         return dynamicValues;
      }, [dates, locale]);

      const yearRange = useMemo(() => {
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

      const selectedOptionLabel = useMemo(() => {
         return (
            options.find(opt => opt.value === searchParams.get('place'))
               ?.label || 'All'
         );
      }, [searchParams]);

      return (
         <div className={styles.traffic_filters}>
            <div className={styles.row}>
               <h1>
                  {t('title')} {yearRange}
               </h1>
               <div className={styles.container}>
                  {Object.keys(ValuesKey).map(key => (
                     <button
                        key={key}
                        onClick={() => handleClick(key)}
                        className={clsx({ [styles.active]: value === key })}
                     >
                        {ValuesKey[key].desc}
                     </button>
                  ))}
               </div>
            </div>
            <div className={styles.custom_select} ref={selectRef}>
               <div
                  className={styles.select_trigger}
                  onClick={() => setIsOpen(prev => !prev)}
               >
                  {selectedOptionLabel}
                  <span
                     className={clsx(styles.arrow, { [styles.open]: isOpen })}
                  />
               </div>
               {isOpen && (
                  <div className={styles.select_dropdown}>
                     {options.map(opt => (
                        <div
                           key={opt.value}
                           className={styles.option}
                           onClick={() => handleSelect(opt.value)}
                        >
                           {opt.label}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      );
   },
);

TrafficFilters.displayName = 'TrafficFilters';
export default TrafficFilters;
