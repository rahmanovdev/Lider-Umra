'use client';
import CImage from '@/components/ui/cimage/CImage';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { useGetLessonsQuery } from '@/redux/api/lessons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import scss from './VideoSection.module.scss';

const VideoSection = () => {
   const { data = [], isLoading, error } = useGetLessonsQuery();
   const locale = useLocale();
   const [currentIndex, setCurrentIndex] = useState(0);

   const latestVideos = data.slice().reverse();

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex(prevIndex => {
            const maxIndex = Math.ceil(latestVideos.length / 3) - 1;
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
         });
      }, 5000);

      return () => clearInterval(interval);
   }, [latestVideos.length]);

   const currentVideos = latestVideos.slice(
      currentIndex * 3,
      currentIndex * 3 + 3,
   );

   const getYouTubeThumbnail = React.useCallback((url: string) => {
      const videoIdMatch = url.match(
         /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/,
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      return videoId
         ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
         : null;
   }, []);

   return (
      <motion.section
         className={scss.VideoSection}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className={clsx(scss.content, 'container')}>
            <div className={scss.headerContainer}>
               <h2 className={scss.title}>
                  {locale === 'ru'
                     ? 'Наши видео в YouTube'
                     : 'Биздин видеолор YouTube да'}
               </h2>
               <a
                  target='_blank'
                  href={'https://www.youtube.com/@Bilim.Mainaev'}
                  className={scss.button + ' base-link-button'}
               >
                  {locale === 'ru' ? 'Наш YouTube' : 'Биздин YouTube'}
                  <GoArrowRight />
               </a>
            </div>
            <AnimatePresence mode='wait'>
               {isLoading ? (
                  <Loading />
               ) : error ? (
                  <Failed error={error} />
               ) : currentVideos.length ? (
                  <div key='videos' className={scss.grid}>
                     {currentVideos.map(video => (
                        <motion.div
                           key={video.id}
                           className={clsx(scss.item, scss['fr-1'])}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                        >
                           <Link
                              href={video.video_url}
                              target='_blank'
                              className={scss.videoLink}
                           >
                              <CImage
                                 src={
                                    getYouTubeThumbnail(video.video_url) ||
                                    '/default-thumbnail.jpg'
                                 }
                                 alt={`Video - ${video.title}`}
                                 width={360}
                                 height={260}
                                 className={scss.image}
                                 loading='lazy'
                              />
                              <div className={scss.playOverlay}>
                                 <svg
                                    width='48'
                                    height='48'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                 >
                                    <circle
                                       cx='12'
                                       cy='12'
                                       r='10'
                                       fill='#FF0000'
                                       opacity='0.8'
                                    />
                                    <polygon
                                       points='10 8 16 12 10 16'
                                       fill='#FFFFFF'
                                    />
                                 </svg>
                              </div>
                           </Link>
                           <p className={scss.videoTitle}>{video.title}</p>
                        </motion.div>
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
                     {locale === 'ru' ? 'Видео отсутствуют' : 'Видеолор жок'}
                  </motion.p>
               )}
            </AnimatePresence>
         </div>
      </motion.section>
   );
};

export default VideoSection;
