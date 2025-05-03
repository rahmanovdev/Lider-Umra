import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";

interface ImageSliderProps {
  images: string[];
  height?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  height = 400,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={styles.slider} style={{ height }}>
      <div className={styles.sliderWrapper}>
        <button
          className={styles.sliderButton}
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
        >
          ←
        </button>

        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={600}
          height={height}
          className={styles.image}
        />

        <button
          className={styles.sliderButton}
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
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
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
