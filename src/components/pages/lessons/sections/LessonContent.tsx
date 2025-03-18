'use client';
import React, { memo, useCallback, useMemo } from 'react';
import scss from './LessonsContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useGetLessonsQuery } from '@/redux/api/lessons';
import Loading from '@/components/ui/loading/Loading';
import { useLocale } from 'next-intl';
import Failed from '@/components/ui/failed/Failed';
import CImage from '@/components/ui/cimage/CImage';
import Link from 'next/link';

interface Lesson {
   id: number;
   title: string;
   video_url: string;
}

const getYouTubeThumbnail = (url: string) => {
   const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/,
   );
   const videoId = videoIdMatch ? videoIdMatch[1] : null;
   return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : '';
};

const LessonItem = memo<{ item: Lesson }>(({ item }) => {
   const embedUrl = useMemo(
      () => getYouTubeThumbnail(item.video_url),
      [item.video_url],
   );

   return (
      <Link href={item.video_url} target='_blank' className={scss.item}>
         <CImage
            src={embedUrl}
            alt='Alt'
            width={260}
            height={260}
            title={item.title}
            className={scss.image}
         />
         <div className={scss.playOverlay}>
            <svg
               width='48'
               height='48'
               viewBox='0 0 24 24'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <circle cx='12' cy='12' r='10' fill='#FF0000' opacity='0.8' />
               <polygon points='10 8 16 12 10 16' fill='#FFFFFF' />
            </svg>
         </div>
         <p className={scss.imageTitle}>{item.title}</p>
      </Link>
   );
});
LessonItem.displayName = 'LessonItem';

const LessonsContent = memo(() => {
   const { data: lessons = [], isLoading, error } = useGetLessonsQuery();
   const locale = useLocale();

   const title = useMemo(
      () => (locale === 'ru' ? 'Видео уроки' : 'Видео сабактар'),
      [locale],
   );
   const containerClass = useMemo(() => clsx(scss.content, 'container'), []);

   const renderLoading = useCallback(() => <Loading />, []);
   const renderError = useCallback(() => <Failed error={error} />, [error]);
   const renderEmpty = useCallback(
      () => (
         <motion.p
            key='no-items'
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
         <div key='videos' className={scss.grid}>
            {lessons.map((lesson, index) => (
               <LessonItem key={`lesson-id-${index}`} item={lesson} />
            ))}
         </div>
      ),
      [lessons],
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
            <AnimatePresence mode='wait'>
               {isLoading
                  ? renderLoading()
                  : error
                  ? renderError()
                  : lessons.length
                  ? renderContent()
                  : renderEmpty()}
            </AnimatePresence>
         </div>
      </motion.div>
   );
});

LessonsContent.displayName = 'LessonsContent';
export default LessonsContent;
