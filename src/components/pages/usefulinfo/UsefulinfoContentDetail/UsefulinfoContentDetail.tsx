'use client';
import React, { memo, useCallback, useMemo } from 'react';
import scss from './UsefulinfoContentDetail.module.scss';
import { motion } from 'framer-motion';
import { useTimeLine } from '@/hooks/use-time-line';
import { useGetBlogByIdQuery } from '@/redux/api/blogs';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';
import CImage from '@/components/ui/cimage/CImage';

const TimelineEntry = memo<{ item: BLOG.DetailDescription; isFirst: boolean }>(
   ({ item, isFirst }) => {
      const entryClass = useMemo(
         () =>
            [scss.timelineEntry, isFirst && scss.isFirst]
               .filter(Boolean)
               .join(' '),
         [isFirst],
      );
      
      return (
         <div className={entryClass}>
            <div className={scss.timelineMark} data-timeline-mark />
            <div className={scss.contentWrapper}>
               <figure className={scss['img-card']}>
                  <CImage
                     src={item.image}
                     alt={item.text.slice(0, 50)}
                     width={350}
                     height={350}
                     sizes='(max-width: 768px) 100vw, 350px'
                  />
               </figure>
               <div
                  className={scss.content}
                  dangerouslySetInnerHTML={{ __html: item.text }}
               />
            </div>
         </div>
      );
   },
);
TimelineEntry.displayName = 'TimelineEntry';

const UsefulinfoContentDetail = memo(() => {
   const params = useParams();
   const {
      data: blog,
      isLoading,
      error,
   } = useGetBlogByIdQuery(Number(params.id));
   const { containerRef, height, heightTransform, ref } = useTimeLine(false, [
      isLoading,
   ]);

   console.log(blog);

   const wrapperClass = useMemo(() => scss.useFullInfoContentDetail, []);
   const containerClass = useMemo(() => `${scss.container} container`, []);
   const renderLoading = useCallback(() => <Loading />, []);
   const renderError = useCallback(() => <Failed error={error} />, [error]);
   const renderTimeline = useCallback(
      () =>
         blog?.desc_blogs.map((item, index) => (
            <TimelineEntry key={item.id} item={item} isFirst={index === 0} />
         )),
      [blog],
   );

   if (isLoading) return renderLoading();
   if (error) return renderError();
   if (!blog) return null;

   return (
      <div className={wrapperClass}>
         <div className={containerClass}>
            <h4 className={scss.title}>{blog.title}</h4>
            <div className={scss.wrapper} ref={containerRef}>
               <div ref={ref} className={scss.timelineContainer}>
                  {renderTimeline()}
                  <div style={{ height }} className={scss.timelineLine}>
                     <motion.div
                        style={{ height: heightTransform }}
                        className={scss.timelineProgress}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
});

UsefulinfoContentDetail.displayName = 'UsefulinfoContentDetail';
export default UsefulinfoContentDetail;
