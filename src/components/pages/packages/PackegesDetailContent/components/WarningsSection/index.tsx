'use client';
import styles from './styles.module.scss';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import Loading from '@/components/ui/loading/Loading';
import Failed from '@/components/ui/failed/Failed';
import { Warning } from '../../types';
import ImageSlider from '../shared/ImageSlider';

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
            {(warnings as Warning[]).map(warning => (
               <article key={warning.id} className={styles.warningItem}>
                  {warning.images && (
                     <div className={styles.warningImageWrapper}>
                        <ImageSlider images={warning.images} />
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
