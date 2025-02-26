'use client';
import styles from './styles.module.scss';
import { ImageSlider } from '../shared/ImageSlider';
import { useParams } from 'next/navigation';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import React from 'react';

export const FoodSection: React.FC = () => {
  const params = useParams();
  const tourId = Number(params.id);

  const { data: tourData, isLoading: tourLoading } =
    useGetTourByIdQuery(tourId);
  const { data: foodInfo, isLoading: foodLoading } = useGetPackageDetailQuery({
    type: 'FoodInfo',
    category: tourData?.category,
  });

  if (tourLoading || foodLoading) {
    return <div className={styles.loading}>Жүктөлүүдө...</div>;
  }

  if (!foodInfo || foodInfo.length === 0 || !tourData) {
    return <div className={styles.noData}>Маалымат табылган жок</div>;
  }

  return (
    <section className={styles.foodSection}>
      {foodInfo.map((food) => (
        <article key={food.id} className={styles.foodContent}>
          <div className={styles.foodSlider}>
            {food.images && food.images.length > 0 ? (
              <ImageSlider images={food.images} height={400} />
            ) : (
              <div className={styles.noImage}>Сүрөт жок</div>
            )}
          </div>
          <div className={styles.foodInfo}>
            <h2>{food.title}</h2>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{ __html: food.description }}
            />
          </div>
        </article>
      ))}
    </section>
  );
};
