'use client';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { useGetHotelsQuery } from '@/redux/api/hotels';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import { Package } from '@/redux/api/tour-details/types';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import PlaceCard from '../PlaceCard/PlaceCard';
import { Modal } from '../shared/Modal';
import Slider from '../shared/Slider';
import styles from './PlacesSection.module.scss';
import MapModal from '../MapModal';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl'

const StarRating = ({ count }: { count: number }) => {
   return (
      <div className={styles.starRating}>
         {[...Array(count)].map((_, index) => (
            <FaStar key={index} className={styles.star} />
         ))}
      </div>
   );
};

const PlacesSection_ = () => {
   const [selectedPlace, setSelectedPlace] =
      React.useState<Package.Place | null>(null);
   const [selectedHotel, setSelectedHotel] = React.useState<
      'medina' | 'mecca' | null
   >(null);
   const params = useParams();
   const id = Number(params.id);
   const t = useTranslations('placesSection'); // Use the 'placesSection' namespace

   const {
      data: tourData,
      isLoading: tourLoading,
      error: tourError,
   } = useGetTourByIdQuery(id);

   const {
      data: places,
      isLoading: placesLoading,
      error: placesError,
   } = useGetPackageDetailQuery({
      type: 'PlacesToVisit',
   });

   const {
      data: hotels,
      isLoading: hotelsLoading,
      error: hotelsError,
   } = useGetHotelsQuery({
      category: tourData?.category,
   });

   const { medinaHotel, meccaHotel } = useMemo(() => {
      if (!hotels) return { medinaHotel: null, meccaHotel: null };
      return {
         medinaHotel: hotels.find(hotel => hotel.city === 'medina'),
         meccaHotel: hotels.find(hotel => hotel.city === 'mecca'),
      };
   }, [hotels]);

   const getHotelMedia = useCallback(
      (hotelId: number) => {
         if (!hotels) return [];
         const hotel = hotels.find(h => h.id === hotelId);
         if (!hotel) return [];
         const images =
            hotel.hotel_images?.map(img => ({
               src: img.image,
               type: 'image' as 'video',
            })) || [];
         const videos =
            hotel.hotel_videos?.map(video => ({
               src: video.image,
               type: 'video' as 'image',
            })) || [];
         return [...images, ...videos].filter(
            media =>
               media.src &&
               typeof media.src === 'string' &&
               media.src.trim() !== '',
         );
      },
      [hotels],
   );

   if (hotelsLoading || placesLoading || tourLoading) return <Loading />;
   if (hotelsError || tourError || placesError)
      return <Failed error={hotelsError || tourError || placesError} />;

   return (
      <>
         {selectedHotel !== null && (
            <MapModal
               state={selectedHotel}
               onClose={() => setSelectedHotel(null)}
            />
         )}
         <div className={styles.placesContent}>
            <h1>{t('hotelsTitle')}</h1>{' '}
            {/* Translated "Мейманканаларда жашоо" */}
            <div className={styles.hotelContainer}>
               {meccaHotel && (
                  <div className={styles.hostelContent}>
                     <h2>
                        {t('hotelsTitle')} {meccaHotel.city_display}
                     </h2>
                     <div className={styles.imageCard}>
                        <Slider
                           slides={getHotelMedia(meccaHotel.id)}
                        />
                        <h3 className={styles.hotelName}>{meccaHotel.name}</h3>
                     </div>
                     <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                           <span>{t('distanceToMosque')}</span>{' '}
                           {/* Translated "Аль-Харамга чейинки аралык" */}
                           <span>{meccaHotel.distance_to_mosque}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('accommodation')}</span>{' '}
                           {/* Translated "Турак жай" */}
                           <span>{meccaHotel.accommodation}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('meals')}</span>{' '}
                           {/* Translated "Тамактануу" */}
                           <span>{meccaHotel.meals}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('nights')}</span>{' '}
                           {/* Translated "Түндөрдүн саны" */}
                           <span>{meccaHotel.nights}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('hotelCategory')}</span>{' '}
                           {/* Translated "Мейманкананын категориясы" */}
                           <StarRating count={meccaHotel.stars} />
                        </div>
                     </div>
                     <div className={styles.showMap}>
                        <button onClick={() => setSelectedHotel('mecca')}>
                           {t('showMapButton')}{' '}
                           {/* Translated "Картаны көрсөтүү" */}
                        </button>
                     </div>
                  </div>
               )}

               {medinaHotel && (
                  <div className={styles.hostelContent}>
                     <h2>
                        {t('hotelsTitle')} {medinaHotel.city_display}
                     </h2>
                     <div className={styles.imageCard}>
                        <Slider
                           slides={getHotelMedia(medinaHotel.id)}
                        />
                        <h3 className={styles.hotelName}>{medinaHotel.name}</h3>
                     </div>
                     <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                           <span>{t('distanceToMosque')}</span>
                           <span>{medinaHotel.distance_to_mosque}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('accommodation')}</span>
                           <span>{medinaHotel.accommodation}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('meals')}</span>
                           <span>{medinaHotel.meals}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('nights')}</span>
                           <span>{medinaHotel.nights}</span>
                        </div>
                        <div className={styles.infoItem}>
                           <span>{t('hotelCategory')}</span>
                           <StarRating count={medinaHotel.stars} />
                        </div>
                     </div>
                     <div className={styles.showMap}>
                        <button onClick={() => setSelectedHotel('medina')}>
                           {t('showMapButton')}
                        </button>
                     </div>
                  </div>
               )}
            </div>
            <div className={styles.othersPlaces}>
               <h1>{t('placesToVisitTitle')}</h1>{' '}
               {/* Translated "Барууга ылайыктуу жерлер" */}
               <div className={styles.placesList}>
                  {places?.map(place => (
                     <PlaceCard
                        key={place.id}
                        place={place}
                        onOpen={() => setSelectedPlace(place)}
                     />
                  ))}
               </div>
            </div>
            {selectedPlace && (
               <Modal
                  isOpen={!!selectedPlace}
                  onClose={() => setSelectedPlace(null)}
                  title={selectedPlace.title}
                  content={
                     <div
                        dangerouslySetInnerHTML={{
                           __html: selectedPlace.description || '',
                        }}
                     />
                  }
               />
            )}
         </div>
      </>
   );
};

export default PlacesSection_;

export const PlacesSection = dynamic(() => import('./PlaceSection'), {
   ssr: false,
   loading: () => <Loading />,
});
