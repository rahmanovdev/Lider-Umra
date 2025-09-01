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
import { useState, useRef, useEffect } from 'react';
import { Modal } from '../shared/Modal';

const WarningsSection_: React.FC = () => {
   const t = useTranslations('warningsSection');
   const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
   const [shouldTruncate, setShouldTruncate] = useState<{
      [key: string]: boolean;
   }>({});
   const descriptionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
   const imageWrapperRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
      {},
   );

   const {
      data: warnings,
      isLoading,
      error,
   } = useGetPackageDetailQuery({
      type: 'Restrictions',
   });

   useEffect(() => {
      const checkTruncation = () => {
         const truncateStates: { [key: string]: boolean } = {};

         Object.keys(descriptionRefs.current).forEach(id => {
            const descriptionEl = descriptionRefs.current[id];
            const imageWrapperEl = imageWrapperRefs.current[id];

            if (descriptionEl && imageWrapperEl) {
               // Получаем реальную высоту warningImageWrapper
               const imageHeight =
                  imageWrapperEl.getBoundingClientRect().height;
               const descriptionHeight = descriptionEl.scrollHeight;

               truncateStates[id] = descriptionHeight > imageHeight - 40;
            }
         });

         setShouldTruncate(truncateStates);
      };

      checkTruncation();

      const resizeObserver = new ResizeObserver(checkTruncation);

      Object.values(imageWrapperRefs.current).forEach(el => {
         if (el) resizeObserver.observe(el);
      });

      Object.values(descriptionRefs.current).forEach(el => {
         if (el) resizeObserver.observe(el);
      });

      return () => {
         resizeObserver.disconnect();
         window.removeEventListener('resize', checkTruncation);
      };
   }, [warnings]);

   const handleReadMore = (warning: Warning) => {
      setSelectedWarning(warning);
   };

   if (isLoading) return <Loading />;
   if (error) return <Failed error={error} />;
   if (!warnings || warnings.length === 0) return <EmptyState />;

   return (
      <>
         <section className={styles.warningsContent}>
            <h1>{t('title')}</h1>
            <div className={styles.warningsList}>
               {(warnings as Warning[]).map(warning => (
                  <article key={warning.id} className={styles.warningItem}>
                     {warning.images && (
                        <div
                           className={styles.warningImageWrapper}
                           ref={el => {
                              imageWrapperRefs.current[warning.id] = el;
                           }}
                        >
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
                           className={`${styles.descriptionContent} ${
                              shouldTruncate[warning.id] ? styles.truncated : ''
                           }`}
                           ref={el => {
                              descriptionRefs.current[warning.id] = el;
                           }}
                           dangerouslySetInnerHTML={{
                              __html: warning.description,
                           }}
                        />
                        {shouldTruncate[warning.id] && (
                           <button
                              className={styles.readMore}
                              onClick={() => handleReadMore(warning)}
                           >
                              {t('readMore')}
                           </button>
                        )}
                     </div>
                  </article>
               ))}
            </div>
         </section>

         {selectedWarning && (
            <Modal
               isOpen={!!selectedWarning}
               onClose={() => setSelectedWarning(null)}
               title={selectedWarning.title}
               content={
                  <div
                     dangerouslySetInnerHTML={{
                        __html: selectedWarning.description,
                     }}
                  />
               }
            />
         )}
      </>
   );
};

export default WarningsSection_;

export const WarningsSection = dynamic(() => import('.'), {
   ssr: false,
   loading: () => <Loading />,
});
