'use client';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import styles from './TrafficFilters.module.scss';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
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

const TrafficFilters = memo<TrafficFiltersProps>(
   ({ onFilterChange, dates, value }) => {
      const searchParams = useSearchParams();
      const router = useRouter();
      const t = useTranslations('traffics.filters');
      const locale = useLocale();
      const [isOpen, setIsOpen] = useState(false);
      const selectRef = useRef<HTMLDivElement>(null);

      const defaultMonth = locale === 'ru' ? 'Все' : 'Баары';
      const place = searchParams.get('place') || 'all';

      useClickAway(() => setIsOpen(false), selectRef);

      const options = useMemo(
         () => [
            { value: 'all', label: defaultMonth },
            { value: 'bishkek', label: 'Бишкек' },
            { value: 'osh', label: 'Ош' },
         ],
         [defaultMonth],
      );

      const handleSelect = useCallback(
         (optionValue: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('place', optionValue);
            router.push(`?${params.toString()}`);
            setIsOpen(false);
         },
         [router, searchParams],
      );

      const uniqueMonths = useMemo(() => {
         const monthSet = new Set<string>();
         const result = [
            {
               value: 'all',
               label: locale === 'kg' ? 'Бардык пакеттер' : 'Все пакеты',
            },
         ];

         dates.forEach(date => {
            const monthValue = date.start.month.value;
            if (!monthSet.has(monthValue)) {
               monthSet.add(monthValue);
               result.push({
                  value: monthValue,
                  label: date.start.month[locale as 'kg' | 'ru'],
               });
            }
         });

         return result;
      }, [dates, locale]);

      const yearRange = useMemo(() => {
         if (!dates.length) return '';
         const years = dates.flatMap(date => [date.start.year, date.end.year]);
         const minYear = Math.min(...years);
         const maxYear = Math.max(...years);
         return minYear === maxYear
            ? `${minYear}-${minYear + 1}`
            : `${minYear}-${maxYear}`;
      }, [dates]);

      const selectedOptionLabel = useMemo(
         () => options.find(opt => opt.value === place)?.label || defaultMonth,
         [options, place, defaultMonth],
      );

      return (
         <div className={styles.traffic_filters}>
            <div className={styles.row}>
               <h1>
                  {t('title')} {yearRange}
               </h1>
               <div className={styles.container}>
                  {uniqueMonths.map(({ value: monthValue, label }) => (
                     <button
                        key={monthValue}
                        onClick={() => onFilterChange(monthValue)}
                        className={clsx({
                           [styles.active]: value === monthValue,
                        })}
                     >
                        {label}
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
