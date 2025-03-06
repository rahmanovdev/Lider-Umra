'use client';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UsefulinfoContent.module.scss';
import { useSize } from '@/hooks/use-size';
import { generateRows } from '@/utils/generate-rows.util';
import Failed from '@/components/ui/failed/Failed';
import { memo, useCallback, useMemo } from 'react';

const BlogItem = memo<{ item: BLOG.Blog; fr: number; isSingle: boolean }>(
   ({ item, fr, isSingle }) => {
      const getClassName = useMemo(
         () =>
            [styles.item, styles[`fr-${fr}`], isSingle && styles.is_one]
               .filter(Boolean)
               .join(' '),
         [fr, isSingle],
      );

      const imageSrc = useMemo(
         () => item.image || '/images/placeholder.jpg',
         [item.image],
      );

      return (
         <Link href={`/usefulinfo/${item.id}`}>
            <div className={getClassName}>
               <Image
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
   },
);
BlogItem.displayName = 'BlogItem';

const UsefulinfoContent = memo(() => {
   const { data: blogs = [], isLoading, error } = useGetBlogsQuery();
   const { width = 0 } = useSize();

   const rows = useMemo(
      () => (blogs.length ? generateRows<BLOG.Blog>(blogs, width) : []),
      [blogs, width],
   );

   const renderLoading = useCallback(() => <div>Жүктөлүүдө...</div>, []);
   const renderEmpty = useCallback(() => <div>Маалымат табылган жок</div>, []);
   const renderError = useCallback(() => <Failed error={error} />, [error]);

   const renderRow = useCallback(
      (
         row: ReturnType<typeof generateRows<BLOG.Blog>>[number],
         rowIndex: number,
      ) => (
         <div className={styles.row} key={rowIndex}>
            {row.map(({ item, fr }) => (
               <BlogItem
                  key={item.id}
                  item={item}
                  fr={fr}
                  isSingle={row.length === 1}
               />
            ))}
         </div>
      ),
      [],
   );

   if (isLoading) return renderLoading();
   if (error) return renderError();
   if (!blogs.length) return renderEmpty();

   return (
      <div className={styles.use_full_info_content}>{rows.map(renderRow)}</div>
   );
});

UsefulinfoContent.displayName = 'UsefulinfoContent';
export default UsefulinfoContent;
