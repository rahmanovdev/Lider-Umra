import React, { useState } from 'react';
import scss from './ModalClient.module.scss';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   tourData?: { id: number; title: string };
   onSubmit?: (formData: {
      name: string;
      phone: string;
      country: string;
      city: string;
   }) => void;
}

export const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   title,
   tourData,
   onSubmit,
}) => {
   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      country: '',
      city: '',
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit) {
         onSubmit(formData);
      }
      onClose();
      setFormData({ name: '', phone: '', country: '', city: '' });
   };

   if (!isOpen) return null;

   return (
      <div className={scss.modalOverlay}>
         <div className={scss.modal}>
            <div className={scss.modalHeader}>
               <h2>{title}</h2>
               <button onClick={onClose} className={scss.closeButton}>
                  ×
               </button>
            </div>
            {tourData && (
               <form onSubmit={handleSubmit} className={scss.form}>
                  <p>
                     Выбранный пакет: <strong>{tourData.title}</strong> (ID:{' '}
                     {tourData.id})
                  </p>
                  <div className={scss.formGroup}>
                     <label htmlFor='name'>Имя:</label>
                     <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className={scss.formGroup}>
                     <label htmlFor='phone'>Телефон:</label>
                     <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className={scss.formGroup}>
                     <label htmlFor='country'>Страна:</label>
                     <input
                        type='text'
                        id='country'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className={scss.formGroup}>
                     <label htmlFor='city'>Город:</label>
                     <input
                        type='text'
                        id='city'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <button type='submit' className={scss.submitButton}>
                     Отправить заявку
                  </button>
               </form>
            )}
         </div>
      </div>
   );
};
