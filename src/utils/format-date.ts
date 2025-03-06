export const months: { kg: string; ru: string; value: string }[] = [
   { kg: 'Январь', ru: 'Январь', value: 'january' },
   { kg: 'Февраль', ru: 'Февраль', value: 'february' },
   { kg: 'Март', ru: 'Март', value: 'march' },
   { kg: 'Апрель', ru: 'Апрель', value: 'april' },
   { kg: 'Май', ru: 'Май', value: 'may' },
   { kg: 'Июнь', ru: 'Июнь', value: 'june' },
   { kg: 'Июль', ru: 'Июль', value: 'july' },
   { kg: 'Август', ru: 'Август', value: 'august' },
   { kg: 'Сентябрь', ru: 'Сентябрь', value: 'september' },
   { kg: 'Октябрь', ru: 'Октябрь', value: 'october' },
   { kg: 'Ноябрь', ru: 'Ноябрь', value: 'november' },
   { kg: 'Декабрь', ru: 'Декабрь', value: 'december' },
];

export const formatDate = (dateString: string) => {
   const date = new Date(dateString);
   return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
   };
};
