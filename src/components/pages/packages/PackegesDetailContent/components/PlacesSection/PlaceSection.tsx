'use client';
import React, { useMemo } from 'react';
import styles from './PlacesSection.module.scss';
// import { Modal } from '../shared/Modal';
import { useGetHotelsQuery } from '@/redux/api/hotels';
import { FaStar } from 'react-icons/fa';
// import PlaceCard from '../PlaceCard/PlaceCard';
// import { useGetPlacesQuery } from '@/redux/api/tour-details';
// import { Package } from '@/redux/api/tour-details/types';
import { ImageSlider } from '../shared/ImageSlider';

const StarRating = ({ count }: { count: number }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(count)].map((_, index) => (
        <FaStar key={index} className={styles.star} />
      ))}
    </div>
  );
};

const PlacesSection = () => {
  // const [selectedPlace, setSelectedPlace] = useState<Package.Place | null>(
  //   null,
  // );
  // const { data: places, isLoading: placesLoading } =
  //   useGetPlacesQuery('PlacesToVisit');

  // Hotels data
  const {
    data: hotels,
    isLoading: hotelsLoading,
    error: hotelsError,
  } = useGetHotelsQuery();

  const { medinaHotel, meccaHotel } = useMemo(() => {
    if (!hotels) return { medinaHotel: null, meccaHotel: null };

    return {
      medinaHotel: hotels.find((hotel) => hotel.city === 'medina'),
      meccaHotel: hotels.find((hotel) => hotel.city === 'mecca'),
    };
  }, [hotels]);

  const getHotelImages = (hotelId: number) => {
    if (!hotels) return [];

    return (
      hotels
        .find((h) => h.id === hotelId)
        ?.hotel_images?.map((img) => img.image) || []
    );
  };

  if (hotelsLoading) {
    return <div>Жүктөлүүдө...</div>;
  }

  if (hotelsError) {
    return <div>Маалыматтарды жүктөөдө ката кетти. Кайра аракет кылыңыз.</div>;
  }

  return (
    <div className={styles.placesContent}>
      <h1>Проживание в отелях</h1>
      <div className={styles.hotelContainer}>
        {medinaHotel && (
          <div className={styles.HostelContent}>
            <h2>Проживание в {medinaHotel.city_display}</h2>
            <div className={styles.ImageCard}>
              <ImageSlider
                images={getHotelImages(medinaHotel.id)}
                height={400}
              />
              <h3 className={styles.hotelName}>
                {medinaHotel.name} (или аналог)
              </h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span>Расстояние до мечети Пророка</span>
                <span>{medinaHotel.distance_to_mosque}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Размещение</span>
                <span>{medinaHotel.accommodation}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Питание</span>
                <span>{medinaHotel.meals}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Количество ночей</span>
                <span>{medinaHotel.nights}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Категория отеля</span>
                <StarRating count={medinaHotel.stars} />
              </div>
            </div>
          </div>
        )}

        {meccaHotel && (
          <div className={styles.HostelContent}>
            <h2>Проживание в {meccaHotel.city_display}</h2>
            <div className={styles.ImageCard}>
              <ImageSlider
                images={getHotelImages(meccaHotel.id)}
                height={400}
              />
              <h3 className={styles.hotelName}>
                {meccaHotel.name} (или аналог)
              </h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span>Расстояние до Аль-Харама</span>
                <span>{meccaHotel.distance_to_mosque}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Размещение</span>
                <span>{meccaHotel.accommodation}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Питание</span>
                <span>{meccaHotel.meals}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Количество ночей</span>
                <span>{meccaHotel.nights}</span>
              </div>
              <div className={styles.infoItem}>
                <span>Категория отеля</span>
                <StarRating count={meccaHotel.stars} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Places секциясы - азырынча өчүрүлгөн
      <div className={styles.others_places}>
        <h1>Места для посещения</h1>
        <div className={styles.placesList}>
          {places?.map((place) => (
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
      )} */}
    </div>
  );
};

export default PlacesSection;
