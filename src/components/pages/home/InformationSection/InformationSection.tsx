'use client';
import React, { memo } from 'react';
import scss from './InformationSection.module.scss';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import { useTranslations } from 'next-intl';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';
import Link from 'next/link'
import CImage from '@/components/ui/cimage/CImage'

const InformationSection = memo(() => {
   const t = useTranslations();
   const { data, isLoading, error } = useGetBlogsQuery();

   return (
      <section className={scss.Main}>
         <div className={scss.container}>
            <div className={scss.content}>
               <h1>{t('information.title')}</h1>
               {isLoading ? (
                  <Loading />
               ) : error ? (
                  <Failed error={error} />
               ) : (
                  <div className={scss.main_card}>
                     {data?.map(blog => (
                        <Link
                           href={`/usefullinfo/${blog.id}`}
                           key={blog.id || blog.title}
                           className={scss.card}
                        >
                           <div className={scss.imageWrapper}>
                              <CImage
                                 src={blog.image}
                                 alt={blog.title || 'Card Image'}
                                 fill
                                 sizes='(max-width: 560px) 90vw, (max-width: 1240px) 50vw, 25vw'
                                 className={scss.image}
                                 priority={false}
                                 loading='lazy'
                              />
                           </div>
                           <div
                              className={scss.textOverlay}
                              dangerouslySetInnerHTML={{ __html: blog.title }}
                           />
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </section>
   );
});

InformationSection.displayName = 'InformationSection';
export default InformationSection;
