'use client';
import React from 'react';
import scss from './QuestionsSection.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { useSize } from '@/hooks/use-size';
import { useForm } from '@/hooks/use-form';
import { useTelegram } from '@/hooks/use-telegram';

interface IFormTelegram {
   name: string;
   phone: string;
}

const Validators = (locale: string) => ({
   name: (value: string) => {
      if (!value.trim()) {
         return locale === 'kg'
            ? 'Сиздин атыңызды жазуу керек.'
            : 'Имя обязательно для заполнения.';
      }
      if (value.trim().length < 2) {
         return locale === 'kg'
            ? 'Атыңыз 2 символдон кем болбошу керек.'
            : 'Имя должно содержать минимум 2 символа.';
      }
      return null;
   },
   phone: (value: string) => {
      if (!/^(\+996)[0-9]{9}$/.test(value)) {
         return locale === 'kg'
            ? 'Номер +996 менен башталып жана так 9 сан болушу керек.'
            : 'Номер должен начинаться с +996 и содержать ровно 9 цифр.';
      }
      return null;
   },
});

const QuestionsSection = () => {
   const t = useTranslations('questions');
   const locale = useLocale();
   const { errors, register, reset, handleSubmit } = useForm({
      defaultValues: { name: '', phone: '+996' },
      validators: Validators(locale),
   });

   const { width } = useSize();

   const formatTelegramMessage = React.useCallback((data: IFormTelegram) => {
      return `
      User's name: <b>${data.name}</b>\n
      User's phone: <b>${data.phone}</b>\n
      `;
   }, []);

   const { sendMessage, isLoading, error } = useTelegram({
      messageFormatter: formatTelegramMessage,
   });

   const onSubmit = handleSubmit(async data => {
      const result = await sendMessage(data);
      if (result) {
         reset();
         alert('Ваше сообщение отправлено');
      } else {
         alert('Ошибка при отправке сообщения');
      }
   });

   if (width < 1000) return null;

   return (
      <section className={scss.Main}>
         <div className={scss.back_photo}></div>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.block}>
                  <h1>{t('title')}</h1>
                  <p>{t('description')}</p>

                  <form onSubmit={onSubmit} className={scss.inputs}>
                     <div className={scss.form_group}>
                        <input
                           {...register('name')}
                           type='text'
                           placeholder={t('name')}
                        />
                        {errors.name && (
                           <span className={scss.error}>{errors.name}</span>
                        )}
                     </div>
                     <div className={scss.form_group}>
                        <input
                           {...register('phone')}
                           type='text'
                           placeholder={t('phone')}
                        />
                        {errors.phone && (
                           <span className={scss.error}>{errors.phone}</span>
                        )}
                     </div>
                     <button disabled={isLoading}>
                        {!isLoading ? t('sending') : t('button')}
                     </button>
                     {error && <p className={scss.error}>{error}</p>}
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default QuestionsSection;
