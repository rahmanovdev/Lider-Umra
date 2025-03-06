import { Package } from '@/redux/api/tour-details/types';
import styles from './PlaceCard.module.scss';
import Slider from '../shared/Slider'

interface PlaceCardProps {
   place: Package.Place;
   onOpen: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onOpen }) => {
   const stripHtml = (html: string) => {
      if (typeof document === 'undefined') return '';

      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
   };

   const plainText = stripHtml(place.description);
   const shouldShowReadMore = plainText.length > 150;
   const truncatedText = shouldShowReadMore
      ? plainText.slice(0, 150) + '...'
      : plainText;

   return (
      <div className={styles.placeCard}>
         <div className={styles.imageWrapper}>
            <Slider
               slides={place.images.map(v => ({ src: v, type: 'image' }))}
               height={'250'}
               showDots={false}
            />
         </div>
         <div className={styles.placeInfo}>
            <h3>{place.title}</h3>
            <div className={styles.description}>
               <p>
                  {truncatedText}
                  {shouldShowReadMore && (
                     <button className={styles.readMore} onClick={onOpen}>
                        толугураак
                     </button>
                  )}
               </p>
            </div>
         </div>
      </div>
   );
};

export default PlaceCard;
