// src/components/shared/ModalClient.tsx
'use client';
import React, { useState } from 'react';
import scss from './ModalClient.module.scss';

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

export const ModalClient: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   title,
   tourData,
   onSubmit,
}) => {
   const [formData, setFormData] = useState({
      full_name: '',
      phone: '',
      country: '',
      city: '',
      package: tourData?.id || 0,
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit && tourData) {
         onSubmit({ ...formData, package: tourData.id });
      }
      onClose();
      setFormData({
         full_name: '',
         phone: '',
         country: '',
         city: '',
         package: 0,
      });
   };

   if (!isOpen) return null;

   return (
      <div className={scss.modalOverlay}>
         <div className={scss.modal}>
            <div className={scss.modalHeader}>
               <div className={scss.title}>{title}</div>
               <button onClick={onClose} className={scss.closeButton}>
                  ×
               </button>
            </div>
            {tourData && tourData.startDate && tourData.endDate && (
               <div className={scss.content}>
                  <div className={scss.date_range}>
                     <div className={scss.date_item}>
                        <div className={scss.month_year}>
                           <h1>{tourData.startDate.split(' ')[0]}</h1>
                           <div className={scss.month}>
                              <h5>{tourData.startDate.split(' ')[1]}</h5>
                              <h5>{tourData.startDate.split(' ')[2]}</h5>
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
                           placeholder='Сиздин атыңыз *'
                           value={formData.full_name}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className={scss.formGroup}>
                        <input
                           type='tel'
                           name='phone'
                           placeholder='Сиздин телефонуңуз *'
                           value={formData.phone}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className={scss.formGroup}>
                        <input
                           type='text'
                           name='country'
                           placeholder='Сиздин өлкөңүз *'
                           value={formData.country}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className={scss.formGroup}>
                        <input
                           type='text'
                           name='city'
                           placeholder='Сиздин шаарыңыз *'
                           value={formData.city}
                           onChange={handleChange}
                           required
                        />
                     </div>

                     <button type='submit' className={scss.submitButton}>
                        Арыз берүү
                     </button>
                  </form>
               </div>
            )}
         </div>
      </div>
   );
};
