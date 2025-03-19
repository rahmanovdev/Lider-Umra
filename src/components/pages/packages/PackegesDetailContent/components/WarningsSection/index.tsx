'use client';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';
import { Warning } from '../../types';
import styles from './styles.module.scss';
import Slider from '../shared/Slider';
import dynamic from 'next/dynamic';
import EmptyState from '@/components/ui/empty-state/EmptyState';
import { useTranslations } from 'next-intl';

const WarningsSection_: React.FC = () => {
   const t = useTranslations('warningsSection'); // Use 'warningsSection' namespace
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
      return <EmptyState />;
   }

   return (
      <section className={styles.warningsContent}>
         <h1>{t('title')}</h1>   
         <div className={styles.warningsList}>
            {(warnings as Warning[]).map(warning => (
               <article key={warning.id} className={styles.warningItem}>
                  {warning.images && (
                     <div className={styles.warningImageWrapper}>
                        <Slider
                           slides={warning.images.map(v => ({
                              src: v,
                              type: 'image',
                           }))}
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

export default WarningsSection_;

export const WarningsSection = dynamic(() => import('.'), {
   ssr: false,
   loading: () => <Loading />,
});
