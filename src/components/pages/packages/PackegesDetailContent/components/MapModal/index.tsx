import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { IoClose } from 'react-icons/io5';

interface IProps {
   state: 'mecca' | 'medina';
   onClose: () => void;
}

const MapModal: React.FC<IProps> = ({ state, onClose }) => {
   const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (e.target === e.currentTarget) {
            onClose();
         }
      },
      [onClose],
   );

   const getMapIframe = () => {
      switch (state) {
         case 'mecca':
            return (
               <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237684.58519238184!2d39.68173774447395!3d21.436254365885464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21b4ced818775%3A0x98ab2469cf70c9ce!2sMakkah%20Saudi%20Arabia!5e0!3m2!1sen!2skg!4v1741255453370!5m2!1sen!2skg'
                  width='100%'
                  height='450'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Map of Mecca'
               ></iframe>
            );
         case 'medina':
            return (
               <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229228.94895444555!2d39.5272312239192!3d24.49432015691222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d1e6a5e5e4f7%3A0x9a6b3b8d8f7c9e2d!2sMedina%20Saudi%20Arabia!5e0!3m2!1sen!2skg!4v1741256000000!5m2!1sen!2skg'
                  width='100%'
                  height='450'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Map of Medina'
               ></iframe>
            );
         default:
            return null;
      }
   };

   return (
      <div className={styles.mapModal} onClick={handleOverlayClick}>
         <div className={styles.mapContainer}>
            {getMapIframe()}
            <button className={styles.closeButton} onClick={onClose}>
               <IoClose />
            </button>
         </div>
      </div>
   );
};

MapModal.displayName = 'MapModal';

export default React.memo(MapModal);
