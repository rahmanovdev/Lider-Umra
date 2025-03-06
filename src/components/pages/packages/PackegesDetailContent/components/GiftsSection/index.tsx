'use client';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import { Package } from '@/redux/api/tour-details/types';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import Slider from '../shared/Slider';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic'

const GiftsSection_: React.FC = () => {
   const [selectedGift, setSelectedGift] = useState<Package.Gift | null>(null);
   const {
      data: gifts,
      isLoading,
      error,
   } = useGetPackageDetailQuery({
      type: 'YouGet',
   });

   const handleReadMore = (gift: Package.Gift) => {
      setSelectedGift(gift);
   };

   const stripHtml = (html: string) => {
      if (typeof document === 'undefined') return '';
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || '';
   };

   if (isLoading) {
      return <Loading />;
   }
   if (error) {
      return <Failed error={error} />;
   }
   if (!gifts || gifts.length === 0) {
      return <div className={styles.noData}>Белектер табылган жок</div>;
   }

   return (
      <>
         <section className={styles.giftsContent}>
            <h1>Сизге берилүүчү белектер</h1>
            <div className={styles.giftsList}>
               {gifts.map(gift => {
                  const plainText = stripHtml(gift.description);
                  const shouldShowReadMore = plainText.length > 100;

                  return (
                     <article key={gift.id} className={styles.giftCard}>
                        <div className={styles.giftSliderWrapper}>
                           <Slider
                              slides={gift.images.map((v: string) => ({
                                 src: v,
                                 type: 'image',
                              }))}
                              showDots={false}
                           />
                        </div>
                        <div className={styles.giftInfo}>
                           <h3>{gift.title}</h3>
                           <div className={styles.description}>
                              <div
                                 className={styles.shortDescription}
                                 dangerouslySetInnerHTML={{
                                    __html: shouldShowReadMore
                                       ? gift.description.slice(0, 117) +
                                         `... <span class="${styles.readMore}" data-id="${gift.id}">толугураак</span>`
                                       : gift.description,
                                 }}
                                 onClick={e => {
                                    const target = e.target as HTMLElement;
                                    if (
                                       target.classList.contains(
                                          styles.readMore,
                                       )
                                    ) {
                                       handleReadMore(gift);
                                    }
                                 }}
                              />
                           </div>
                        </div>
                     </article>
                  );
               })}
            </div>
         </section>

         {selectedGift && (
            <Modal
               isOpen={!!selectedGift}
               onClose={() => setSelectedGift(null)}
               title={selectedGift.title}
               content={
                  <div
                     dangerouslySetInnerHTML={{
                        __html: selectedGift.description,
                     }}
                  />
               }
            />
         )}
      </>
   );
};

export default GiftsSection_;

export const GiftsSection = dynamic(() => import('.'), {
   ssr: false,
   loading: () => <Loading />,
});
