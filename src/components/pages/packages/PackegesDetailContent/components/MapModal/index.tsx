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
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1176.5390514879646!2d39.816195919453726!3d21.40931591226072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c205f09c965271%3A0x9721e2d8b9680507!2svoco%20Makkah%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2skg!4v1742291130733!5m2!1sen!2skg'
                  width='600'
                  height='450'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
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
