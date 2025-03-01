'use client';
import { useGetBlogsQuery } from '@/redux/api/blogs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UsefulinfoContent.module.scss';
import { useSize } from '@/hooks/use-size';
import { generateRows } from '@/utils/generate-rows.util';
import Failed from '@/components/ui/failed/Failed';

const UsefulinfoContent = () => {
   const { data: blogs, isLoading, error } = useGetBlogsQuery();
   const size = useSize();
   if (isLoading) {
      return <div>Жүктөлүүдө...</div>;
   }

   if (error) {
      return <Failed error={error} />;
   }
   if (!blogs || blogs.length === 0) {
      return <div>Маалымат табылган жок</div>;
   }

   const rows = generateRows<BLOG.Blog>(blogs || [], size.width || 0);
   console.log(rows);
   return (
      <div className={styles.use_full_info_content}>
         {rows.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
               {row.map(item => (
                  <Link href={`/usefulinfo/${item.item.id}`} key={item.item.id}>
                     <div
                        className={`${styles['fr-' + item.fr]} ${
                           row.length == 1 && styles.is_one
                        } ${styles.item}`}
                     >
                        <Image
                           src={item.item.image || '/images/placeholder.jpg'}
                           alt={item.item.title}
                           width={375}
                           height={420}
                           priority
                        />
                        <div className={styles.content}>
                           <h2>{item.item.title}</h2>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         ))}
      </div>
   );
};

export default UsefulinfoContent;
