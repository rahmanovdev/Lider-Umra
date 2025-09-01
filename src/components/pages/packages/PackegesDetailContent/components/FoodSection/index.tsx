'use client';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import { useParams } from 'next/navigation';
import React from 'react';
import styles from './styles.module.scss';
import Slider from '../shared/Slider';
import dynamic from 'next/dynamic';
import EmptyState from '@/components/ui/empty-state/EmptyState';

const FoodSection_: React.FC = () => {
   const params = useParams();
   const tourId = Number(params.id);
   const {
      data: tourData,
      isLoading: tourLoading,
      error: tourError,
   } = useGetTourByIdQuery(tourId);
   const {
      data: foodInfo,
      isLoading: foodLoading,
      error: foodError,
   } = useGetPackageDetailQuery({
      type: 'FoodInfo',
      category: tourData?.category,
   });

   if (tourLoading || foodLoading) {
      return <Loading />;
   }

   if (tourError || foodError) {
      return <Failed error={tourError || foodError} />;
   }

   if (!foodInfo || foodInfo.length === 0 || !tourData) {
      return <EmptyState />;
   }

   return (
      <section className={styles.foodSection}>
         {foodInfo.map(food => (
            <article key={food.id} className={styles.foodContent}>
               <div className={styles.foodSlider}>
                  <Slider
                     slides={food.images.map((image: string) => ({
                        src: image,
                        type: 'image',
                     }))}
                  />
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
export default FoodSection_;

export const FoodSection = dynamic(() => import('.'), {
   ssr: false,
   loading: () => <Loading />,
});
