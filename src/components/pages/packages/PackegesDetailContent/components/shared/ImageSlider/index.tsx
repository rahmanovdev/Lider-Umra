'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ImageSliderProps {
  images: string[];
  height?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  height = 400,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 600); // Подождать окончания анимации
  }, [images.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 600); // Подождать окончания анимации
  }, [images.length, isAnimating]);

  const setSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Автоматический слайдер
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Открытие модального окна с картинкой
  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.slider} style={{ height }}>
        <div className={styles.sliderWrapper}>
          <button
            className={styles.sliderButton}
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={isAnimating}
          >
            ←
          </button>

          <div className={styles.slidesContainer}>
            {images.map((image, index) => (
              <div
                key={index}
                className={clsx(styles.slide, {
                  [styles.active]: index === currentIndex,
                  [styles.prev]: (index === currentIndex - 1) || (currentIndex === 0 && index === images.length - 1),
                  [styles.next]: (index === currentIndex + 1) || (currentIndex === images.length - 1 && index === 0),
                })}
                onClick={() => openModal(image)}
              >
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className={styles.image}
                  quality={90}
                />
                <div className={styles.imageOverlay}>
                  <span>Нажмите для увеличения</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className={styles.sliderButton}
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={isAnimating}
          >
            →
          </button>
        </div>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={clsx(styles.dot, {
                [styles.activeDot]: index === currentIndex,
              })}
              onClick={() => setSlide(index)}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={() => setIsModalOpen(false)}
        >
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
        </div>
      )}
    </>
  );
};

export default ImageSlider;
