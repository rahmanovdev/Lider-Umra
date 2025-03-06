'use client';
import React, { memo, useCallback, useMemo } from 'react';
import scss from './LessonsContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSize } from '@/hooks/use-size';
import clsx from 'clsx';
import { generateRows } from '@/utils/generate-rows.util';
import { useGetLessonsQuery } from '@/redux/api/lessons';
import Loading from '@/components/ui/loading/Loading';
import { useLocale } from 'next-intl';
import Failed from '@/components/ui/failed/Failed';

interface Lesson {
   id: number;
   title: string;
   video_url: string;
}

const getYouTubeEmbedUrl = (url: string): string => {
   const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
   return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
};

const LessonItem = memo<{ item: Lesson; fr: number }>(({ item, fr }) => {
   const embedUrl = useMemo(() => getYouTubeEmbedUrl(item.video_url), [item.video_url]);
   const itemClass = useMemo(() => clsx(scss.item, scss[`fr-${fr}`]), [fr]);

   return (
      <div className={itemClass}>
         <iframe
            src={embedUrl}
            title={item.title}
            className={scss.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
         />
         <p className={scss.videoTitle}>{item.title}</p>
      </div>
   );
});
LessonItem.displayName = 'LessonItem';

const LessonsContent = memo(() => {
   const { width: sizeWidth = 0 } = useSize();
   const { data = [], isLoading, error } = useGetLessonsQuery();
   const locale = useLocale();

   const rows = useMemo(() => generateRows<Lesson>(data, sizeWidth), [data, sizeWidth]);
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
   const title = useMemo(() => (locale === 'ru' ? 'Видео уроки' : 'Видео сабактар'), [locale]);
   const containerClass = useMemo(() => clsx(scss.content, 'container'), []);

   const renderLoading = useCallback(() => <Loading />, []);
   const renderError = useCallback(() => <Failed error={error} />, [error]);
   const renderEmpty = useCallback(
      () => (
         <motion.p
            key="no-items"
            className={scss.noItems}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
         >
            Видео сабактар жок
         </motion.p>
      ),
      [],
   );
   const renderContent = useCallback(
      () => (
         <div key="videos" className={gridClass}>
            {rows.map((row, rowIndex) => (
               <React.Fragment key={rowIndex}>
                  {row.map(({ item, fr }) => (
                     <LessonItem key={item.id} item={item} fr={fr} />
                  ))}
               </React.Fragment>
            ))}
         </div>
      ),
      [rows, gridClass],
   );

   return (
      <motion.div
         className={scss.LessonsContent}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className={containerClass}>
            <h4 className={scss.title}>{title}</h4>
            <AnimatePresence mode="wait">
               {isLoading
                  ? renderLoading()
                  : error
                  ? renderError()
                  : rows.length
                  ? renderContent()
                  : renderEmpty()}
            </AnimatePresence>
         </div>
      </motion.div>
   );
});

LessonsContent.displayName = 'LessonsContent';
export default LessonsContent;
