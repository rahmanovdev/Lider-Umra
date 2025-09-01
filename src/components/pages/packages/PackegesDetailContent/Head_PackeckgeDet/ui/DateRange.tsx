'use client';

import React, { memo } from 'react';
import scss from '../HeadPackegeDet.module.scss';

interface IDate {
   day: number;
   month: Record<'kg' | 'ru' | 'value', string>;
   year: number;
}

interface DateRangeProps {
   startDate: IDate;
   endDate: IDate;
   locale: string;
}

const DateRange: React.FC<DateRangeProps> = memo(
   ({ startDate, endDate, locale }) => (
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
   ),
);

DateRange.displayName = 'DateRange';
export default DateRange;
