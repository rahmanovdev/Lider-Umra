'use client';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import CImage from '../cimage/CImage';
import scss from './ImageLightbox.module.scss';
import { useClickAway } from '@/hooks/use-click-away'

interface IImageLightboxProps {
   images: string[];
   onClose: VoidFunction;
   selected: number;
}

const ImageLightbox: React.FC<IImageLightboxProps> = React.memo(
   ({ images, onClose, selected }) => {
      const [current, setCurrent] = React.useState(selected);
      const contentRef = React.useRef<HTMLDivElement>(null);

      useClickAway(onClose, contentRef);

      const showNext = useCallback(() => {
         setCurrent(prev => (prev + 1) % images.length);
      }, [images.length]);

      const showPrev = useCallback(() => {
         setCurrent(prev => (prev - 1 + images.length) % images.length);
      }, [images.length]);

      const selectImage = useCallback((index: number) => {
         setCurrent(index);
      }, []);

      const handleKeyDown = useCallback(
         (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') showNext();
            if (event.key === 'ArrowLeft') showPrev();
            if (event.key === 'Escape') onClose();
         },
         [onClose, showNext, showPrev],
      );

      useEffect(() => {
         document.addEventListener('keydown', handleKeyDown);
         return () => {
            document.removeEventListener('keydown', handleKeyDown);
         };
      }, [handleKeyDown]);

      return (
         <div className={scss.lightbox} onClick={onClose}>
            <div className={scss.body} onClick={e => e.stopPropagation()}>
               <button
                  className={scss.close}
                  onClick={onClose}
                  aria-label='Close Lightbox'
               >
                  <IoIosClose size={40} />
               </button>

               <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className={scss.content}
                  ref={contentRef}
               >
                  <div className={scss.images}>
                     <motion.figure
                        key={current}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                     >
                        <CImage
                           src={images[current]}
                           alt={`Gallery ${current + 1}`}
                           width={900}
                           height={900}
                        />
                     </motion.figure>
                  </div>

                  <div className={scss.preview}>
                     <button
                        className={scss.nav}
                        onClick={showPrev}
                        aria-label='Previous Image'
                     >
                        <IoIosArrowBack size={30} />
                     </button>

                     <div className={scss.previews}>
                        {images.map((thumb, index) => (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img
                              key={index}
                              src={thumb}
                              alt={`Preview ${index + 1}`}
                              className={current === index ? scss.active : ''}
                              onClick={() => selectImage(index)}
                           />
                        ))}
                     </div>

                     <button
                        className={scss.nav}
                        onClick={showNext}
                        aria-label='Next Image'
                     >
                        <IoIosArrowForward size={30} />
                     </button>
                  </div>
               </motion.div>
            </div>
         </div>
      );
   },
);

ImageLightbox.displayName = 'ImageLightbox';
export default ImageLightbox;
