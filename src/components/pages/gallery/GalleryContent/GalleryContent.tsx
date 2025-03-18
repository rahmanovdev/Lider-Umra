'use client';
import CImage from '@/components/ui/cimage/CImage';
import Failed from '@/components/ui/failed/Failed';
import ImageLightbox from '@/components/ui/image-lighbox/ImageLightbox';
import Loading from '@/components/ui/loading/Loading';
import { useGetGalleriesQuery } from '@/redux/api/gallery';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import React, { memo, useMemo } from 'react';
import scss from './GalleryContent.module.scss';

const GalleryContent = memo(() => {
   const { data = [], isLoading, error } = useGetGalleriesQuery();
   const locale = useLocale();
   const [selected, setSelected] = React.useState<number | null>(null);

   const totalItems = data.length;

   const gridClass = useMemo(
      () =>
         clsx(
            scss.grid,
            totalItems === 1 && scss['one-item'],
            totalItems === 2 && scss['two-items'],
         ),
      [totalItems],
   );

   return (
      <motion.div
         className={scss.GalleryContent}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className={clsx(scss.content, 'container')}>
            <h4 className={scss.title}>
               {locale === 'kg' ? 'Сүрөт галереялары' : 'Фотогалереи'}
            </h4>
            <AnimatePresence mode='wait'>
               {isLoading ? (
                  <Loading />
               ) : error ? (
                  <Failed error={error} />
               ) : data.length >= 1 ? (
                  <div key='gallery' className={gridClass}>
                     {selected !== null && (
                        <ImageLightbox
                           selected={selected}
                           images={data.map(v => v.photo)}
                           onClose={() => setSelected(null)}
                        />
                     )}
                     {data.map((item, index) => (
                        <div
                           key={item.id}
                           onClick={() => setSelected(index)}
                           className={clsx(scss.item)}
                        >
                           <CImage
                              src={item.photo}
                              alt={'Gallery image'}
                              width={520}
                              height={260}
                              sizes='(max-width: 500px) 100vw, (max-width: 1090px) 50vw, 33vw'
                              loading='lazy'
                              className={scss.image}
                           />
                        </div>
                     ))}
                  </div>
               ) : (
                  <motion.p
                     key='no-items'
                     className={scss.noItems}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.2 }}
                  >
                     No photos available
                  </motion.p>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   );
});

GalleryContent.displayName = 'GalleryContent';
export default GalleryContent;
