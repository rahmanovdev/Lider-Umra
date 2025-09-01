'use client';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import Link from 'next/link';
import styles from './UsefulinfoContent.module.scss';
import Failed from '@/components/ui/failed/Failed';
import CImage from '@/components/ui/cimage/CImage';
import { memo, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';

const BlogItem = memo<{ item: BLOG.Blog }>(({ item }) => {
   const imageSrc = useMemo(
      () => item.image || '/images/placeholder.jpg',
      [item.image],
   );

   return (
      <Link href={`/usefullinfo/${item.id}`}>
         <div className={styles.item}>
            <CImage
               src={imageSrc}
               alt={item.title}
               fill
               sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 375px'
               className={styles.image}
            />
            <div className={styles.content}>
               <h2>{item.title}</h2>
            </div>
         </div>
      </Link>
   );
});
BlogItem.displayName = 'BlogItem';

const UsefulinfoContent = memo(() => {
   const { data: blogs = [], isLoading, error } = useGetBlogsQuery();
   const t = useTranslations();

   const renderLoading = useCallback(() => <div>{t('loading')}</div>, [t]);
   const renderError = useCallback(() => <Failed error={error} />, [error]);

   const renderRow = useCallback(
      (item: BLOG.Blog, index: number) => (
         <div className={styles.row} key={`blog-item-${index}`}>
            <BlogItem key={item.id} item={item} />
         </div>
      ),
      [],
   );

   if (isLoading) return renderLoading();
   if (error) return renderError();

   return (
      <div className={styles.use_full_info_content}>{blogs.map(renderRow)}</div>
   );
});

UsefulinfoContent.displayName = 'UsefulinfoContent';
export default UsefulinfoContent;
