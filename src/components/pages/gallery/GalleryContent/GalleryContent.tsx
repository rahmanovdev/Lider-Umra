'use client';
import React, { memo, useMemo } from 'react';
import scss from './GalleryContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx';
import { useGetGalleriesQuery } from '@/redux/api/gallery';
import { generateRows } from '@/utils/generate-rows.util';
import { useLocale } from 'next-intl';
import Loading from '@/components/ui/loading/Loading';
import ImageLightbox from '@/components/ui/image-lighbox/ImageLightbox';
import Failed from '@/components/ui/failed/Failed';
import Image from 'next/image';

const GalleryContent = memo(() => {
   const { width: sizeWidth } = useSize();
   const { data = [], isLoading, error } = useGetGalleriesQuery();
   const locale = useLocale();
   const [selected, setSelected] = React.useState<number | null>(null);

   const rows = useMemo(
      () => generateRows(data, sizeWidth || 0),
      [data, sizeWidth],
   );
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
               ) : rows.length ? (
                  <div key='gallery' className={gridClass}>
                     {selected !== null && (
                        <ImageLightbox
                           selected={selected}
                           images={data.map(v => v.photo)}
                           onClose={() => setSelected(null)}
                        />
                     )}
                     {rows.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                           {row.map(item => (
                              <div
                                 key={item.item.id}
                                 onClick={() => setSelected(item.index)}
                                 className={clsx(
                                    scss.item,
                                    scss[`fr-${item.fr}`],
                                 )}
                              >
                                 <Image
                                    src={item.item.photo}
                                    alt={item.item.photo || 'Gallery image'}
                                    width={520}
                                    height={260}
                                    sizes='(max-width: 480px) 100vw, (max-width: 1090px) 50vw, 33vw'
                                    loading='lazy'
                                    className={scss.image}
                                 />
                              </div>
                           ))}
                        </React.Fragment>
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
