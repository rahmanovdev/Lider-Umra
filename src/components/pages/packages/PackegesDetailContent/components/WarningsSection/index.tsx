'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';

export const WarningsSection: React.FC = () => {
   const {
      data: warnings,
      isLoading,
      error,
   } = useGetPackageDetailQuery({
      type: 'Restrictions',
   });

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Failed error={error} />;
   }

   if (!warnings || warnings.length === 0) {
      return <div className={styles.noData}>Эскертүүлөр табылган жок</div>;
   }

   return (
      <section className={styles.warningsContent}>
         <h1>Көңүл буруңуз!</h1>
         <div className={styles.warningsList}>
            {warnings.map(warning => (
               <article key={warning.id} className={styles.warningItem}>
                  {warning.image && (
                     <div className={styles.warningImageWrapper}>
                        <Image
                           src={warning.image}
                           alt={warning.title || 'Warning image'}
                           width={300}
                           height={200}
                           loading='lazy'
                           className={styles.warningImage}
                           onError={e => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none'; // Сүрөт жүктөлбөсө жашырылат
                           }}
                        />
                     </div>
                  )}
                  <div className={styles.warningInfo}>
                     <h3>{warning.title}</h3>
                     <div
                        className={styles.descriptionContent}
                        dangerouslySetInnerHTML={{
                           __html: warning.description || '',
                        }}
                     />
                  </div>
               </article>
            ))}
         </div>
      </section>
   );
};

export default WarningsSection;
