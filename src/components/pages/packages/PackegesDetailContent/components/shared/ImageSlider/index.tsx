'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ImageSliderProps {
  images: string[];
  height?: string | number;
  showDots?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  height = '100%',
  showDots = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.slider} style={{ height }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: `.${styles.sliderButton}.${styles.prev}`,
            nextEl: `.${styles.sliderButton}.${styles.next}`,
          }}
          pagination={showDots ? { clickable: true } : false}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={600}
          effect="slide"
          loop={true}
          className={styles.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slide} onClick={() => openModal(image)}>
                {image && image.trim() !== '' ? (
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className={styles.image}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div>No image available</div>
                )}
                <div className={styles.imageOverlay}>
                  <span>Нажмите для увеличения</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={clsx(styles.sliderButton, styles.prev)}>←</button>
        <button className={clsx(styles.sliderButton, styles.next)}>→</button>
      </div>

      {isModalOpen &&
        createPortal(
          <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <div className={styles.zoomableImage}>
                <Image
                  src={selectedImage}
                  alt="Enlarged view"
                  fill
                  className={styles.modalImage}
                  quality={100}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ImageSlider;
