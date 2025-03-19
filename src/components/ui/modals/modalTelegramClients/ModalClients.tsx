'use client';
import React, { memo, useState, useCallback } from 'react';
import scss from './ModalClient.module.scss';
import { IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   tourData?: {
      id: number;
      title: string;
      startDate?: string;
      endDate?: string;
      category: string;
   };
   onSubmit?: (formData: {
      full_name: string;
      phone: string;
      country: string;
      city: string;
      package: number;
   }) => void;
}

const formatPhoneNumber = (value: string): string => {
   let cleaned = value.replace(/[^0-9]/g, '');
   if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
   if (!cleaned.startsWith('996') && cleaned.length > 0)
      cleaned = '996' + cleaned;
   return '+' + cleaned;
};

const validatePhoneNumber = (
   phone: string,
   t: (d: string) => string,
): { isValid: boolean; error: string } => {
   const phoneDigits = phone.replace('+', '');
   if (!phoneDigits.startsWith('996')) {
      return { isValid: false, error: t('phoneErrorPrefix') };
   }
   if (phoneDigits.length !== 12) {
      return { isValid: false, error: t('phoneErrorLength') };
   }
   return { isValid: true, error: '' };
};

export const ModalClient = memo<ModalProps>(
   ({ isOpen, onClose, title, tourData, onSubmit }) => {
      const t = useTranslations('modalClient');
      const [formData, setFormData] = useState({
         full_name: '',
         phone: '',
         country: '',
         city: '',
         package: tourData?.id || 0,
      });
      const [phoneError, setPhoneError] = useState('');

      const handleChange = useCallback(
         (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === 'phone') {
               const numericValue = value.replace(/[^0-9+]/g, '');
               setFormData(prev => ({ ...prev, [name]: numericValue }));
               const { error } = validatePhoneNumber(numericValue, t);
               setPhoneError(error);
            } else {
               setFormData(prev => ({ ...prev, [name]: value }));
            }
         },
         [t],
      );

      const handlePhoneBlur = useCallback(() => {
         const formattedPhone = formatPhoneNumber(formData.phone);
         setFormData(prev => ({ ...prev, phone: formattedPhone }));
         const { error } = validatePhoneNumber(formattedPhone, t);
         setPhoneError(error);
      }, [formData.phone, t]);

      const handleSubmit = useCallback(
         (e: React.FormEvent) => {
            e.preventDefault();
            if (!onSubmit || !tourData) return;

            const formattedPhone = formatPhoneNumber(formData.phone);
            const { isValid, error } = validatePhoneNumber(formattedPhone, t);
            if (!isValid) {
               alert(error);
               return;
            }

            onSubmit({
               ...formData,
               phone: formattedPhone,
               package: tourData.id,
            });
            onClose();
            setFormData({
               full_name: '',
               phone: '',
               country: '',
               city: '',
               package: 0,
            });
            setPhoneError('');
         },
         [formData, onSubmit, tourData, onClose, t],
      );

      return (
         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className={scss.modalOverlay}
               >
                  <div className={scss.modal}>
                     <div className={scss.modalHeader}>
                        <div className={scss.title}>{title}</div>
                        <button onClick={onClose} className={scss.closeButton}>
                           <IoClose />
                        </button>
                     </div>
                     {tourData && tourData.startDate && tourData.endDate && (
                        <div className={scss.content}>
                           <div className={scss.date_range}>
                              <div className={scss.date_item}>
                                 <div className={scss.month_year}>
                                    <h1>{tourData.startDate.split(' ')[0]}</h1>
                                    <div className={scss.month}>
                                       <h5>
                                          {tourData.startDate.split(' ')[1]}
                                       </h5>
                                       <h5>
                                          {tourData.startDate.split(' ')[2]}
                                       </h5>
                                    </div>
                                 </div>
                              </div>
                              <div className={scss.line} />
                              <div className={scss.date_item}>
                                 <div className={scss.month_year}>
                                    <h1>{tourData.endDate.split(' ')[0]}</h1>
                                    <div className={scss.month}>
                                       <h5>{tourData.endDate.split(' ')[1]}</h5>
                                       <h5>{tourData.endDate.split(' ')[2]}</h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <form onSubmit={handleSubmit} className={scss.form}>
                              <div className={scss.formGroup}>
                                 <input
                                    type='text'
                                    name='full_name'
                                    placeholder={t('fullNamePlaceholder')}
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                 />
                              </div>
                              <div className={scss.formGroup}>
                                 <input
                                    type='tel'
                                    name='phone'
                                    placeholder={t('phonePlaceholder')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handlePhoneBlur}
                                    required
                                 />
                                 {phoneError && (
                                    <span className={scss.errorText}>
                                       {phoneError}
                                    </span>
                                 )}
                              </div>
                              <div className={scss.formGroup}>
                                 <input
                                    type='text'
                                    name='country'
                                    placeholder={t('countryPlaceholder')}
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                 />
                              </div>
                              <div className={scss.formGroup}>
                                 <input
                                    type='text'
                                    name='city'
                                    placeholder={t('cityPlaceholder')}
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                 />
                              </div>
                              <button
                                 type='submit'
                                 className={scss.submitButton}
                              >
                                 {t('submitButton')}
                              </button>
                           </form>
                        </div>
                     )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      );
   },
);

ModalClient.displayName = 'ModalClient';
export default ModalClient;
