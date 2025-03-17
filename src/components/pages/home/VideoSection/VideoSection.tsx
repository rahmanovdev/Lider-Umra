'use client';
import React from 'react';
import Link from 'next/link';
import scss from './VideoSection.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useGetLessonsQuery } from '@/redux/api/lessons';
import Loading from '@/components/ui/loading/Loading';
import { useLocale } from 'next-intl';
import Failed from '@/components/ui/failed/Failed';
import { GoArrowRight } from 'react-icons/go';
import CImage from '@/components/ui/cimage/CImage';

const VideoSection = () => {
   const { data = [], isLoading, error } = useGetLessonsQuery();
   const locale = useLocale();

   const latestVideos = data.slice(-3).reverse();

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
                     ? 'Биздин видеолор YouTube да'
                     : 'Биздин видеолор YouTube да'}
               </h2>
               <Link
                  href='/lessons'
                  className={scss.button + ' base-link-button'}
               >
                  {locale === 'ru' ? 'Биздин YouTube' : 'Биздин YouTube'}
                  <GoArrowRight />
               </Link>
            </div>
            <AnimatePresence mode='wait'>
               {isLoading ? (
                  <Loading />
               ) : error ? (
                  <Failed error={error} />
               ) : latestVideos.length ? (
                  <div key='videos' className={scss.grid}>
                     {latestVideos.map(video => (
                        <div
                           key={video.id + video.title}
                           className={clsx(scss.item, scss['fr-1'])}
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
                                    xmlns='http://www.w3.org/2000/svg'
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
                     {locale === 'ru'
                        ? 'Видео отсутствуют'
                        : 'Видео сабактар жок'}
                  </motion.p>
               )}
            </AnimatePresence>
         </div>
      </motion.section>
   );
};

export default VideoSection;
