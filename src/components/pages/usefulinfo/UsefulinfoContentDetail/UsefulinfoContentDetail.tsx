'use client';
import React from 'react';
import scss from './UsefulinfoContentDetail.module.scss';
import { motion } from 'framer-motion';
import { useTimeLine } from '@/hooks/use-time-line';
import { useGetBlogByIdQuery } from '@/redux/api/blogs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';

const UsefulinfoContentDetail = () => {
   const params = useParams();
   const {
      data: blog,
      isLoading,
      error,
   } = useGetBlogByIdQuery(Number(params.id));

   const { containerRef, height, heightTransform, ref } = useTimeLine(false, [
      isLoading,
   ]);

   if (error) {
      return <Failed error={error} />;
   }
   if (isLoading) {
      return <Loading />;
   }

   return (
      <div className={`${scss.useFullInfoContentDetail}`}>
         <div className={`${scss['container']} container`}>
            <h4 className={scss.title}>{blog?.title}</h4>
            <div className={scss.wrapper} ref={containerRef}>
               <div ref={ref} className={scss.timelineContainer}>
                  {blog?.desc_blogs.map((item, index) => (
                     <div
                        key={index}
                        className={`${index === 0 && scss.isFirst} ${
                           scss.timelineEntry
                        }`}
                     >
                        <div
                           className={scss.timelineMark}
                           data-timeline-mark
                        ></div>

                        <div className={scss.contentWrapper}>
                           <figure className={scss['img-card']}>
                              <Image
                                 src={item.image}
                                 alt='Image'
                                 width={350}
                                 height={350}
                              />
                           </figure>
                           <div
                              className={scss['content']}
                              dangerouslySetInnerHTML={{ __html: item.text }}
                           />
                        </div>
                     </div>
                  ))}
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
};

export default UsefulinfoContentDetail;
