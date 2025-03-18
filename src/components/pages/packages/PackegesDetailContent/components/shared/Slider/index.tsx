'use client';
import CImage from '@/components/ui/cimage/CImage';
import Lightbox from '@/components/ui/lightbox/Lightbox';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

interface IMedia {
   src: string;
   type: 'video' | 'image';
}

interface SliderProps {
   slides: IMedia[];
   height?: string | number;
   showDots?: boolean;
   sliderId?: string;
}

const Slider: React.FC<SliderProps> = ({
   slides,
   height = '100%',
   showDots = true,
   sliderId = 'default',
}) => {
   const [selectedMedia, setSelectedMedia] = useState<number | null>(null);

   const openModal = React.useCallback((index: number) => {
      setSelectedMedia(index);
   }, []);
   const prevClass = `${styles.sliderButton} ${styles.prev} ${sliderId}`;
   const nextClass = `${styles.sliderButton} ${styles.next} ${sliderId}`;

   return (
      <>
         <div className={styles.slider} style={{ height }}>
            <Swiper
               modules={[Navigation, Autoplay]}
               spaceBetween={0}
               slidesPerView={1}
               navigation={{
                  prevEl: `.${styles.sliderButton}.${styles.prev}.${sliderId}`,
                  nextEl: `.${styles.sliderButton}.${styles.next}.${sliderId}`,
               }}
               pagination={showDots ? { clickable: true } : false}
               autoplay={{ delay: 4000, disableOnInteraction: false }}
               speed={600}
               effect='slide'
               loop={true}
               className={styles.swiper}
            >
               {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                     <div
                        className={styles.slide}
                        onClick={() => openModal(index)}
                     >
                        {slide.type === 'image' ? (
                           <CImage
                              src={slide.src}
                              alt={`Slide ${index + 1}`}
                              fill
                              className={styles.slide}
                              quality={90}
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           />
                        ) : (
                           <iframe
                              className={styles.slide}
                              src={`https://www.youtube.com/embed/${new URL(
                                 slide.src,
                              ).searchParams.get('v')}`}
                              title={`Video Slide ${index + 1}`}
                              frameBorder='0'
                              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                              allowFullScreen
                           ></iframe>
                        )}
                        <div className={styles.imageOverlay}>
                           <span>Нажмите для увеличения</span>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>

            <button className={prevClass}>←</button>
            <button className={nextClass}>→</button>
         </div>

         {selectedMedia !== null &&
            createPortal(
               <Lightbox
                  onClose={() => setSelectedMedia(null)}
                  slides={slides.map(v => ({ src: v.src }))}
                  selected={selectedMedia}
               />,
               document.body,
            )}
      </>
   );
};

export default Slider;
