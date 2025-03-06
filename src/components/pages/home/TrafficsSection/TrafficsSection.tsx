'use client';
import TrafficCard from '@/components/common/cards/traffic-card/TrafficCard';
import Failed from '@/components/ui/failed/Failed';
import Loading from '@/components/ui/loading/Loading';
import { motion } from 'framer-motion';
import React, { memo, useCallback, useMemo } from 'react';
import scss from './TrafficsSection.module.scss';

interface IProps extends React.PropsWithChildren {
   tours: TOURS.GetTourPackagesResponse;
   isLoading?: boolean;
   error?: unknown;
}

const cardVariants = {
   hidden: { opacity: 0, y: 10 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const TourCard = memo<{ tour: TOURS.ITourPackages; cardType: 'standart' | 'comfort' }>(({ tour, cardType }) => (
   <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      variants={cardVariants}
      className={scss[cardType]}
   >
      <TrafficCard tour={tour} />
   </motion.div>
));
TourCard.displayName = 'TourCard';

const TrafficsSection = memo<IProps>(({ children, tours, isLoading, error }) => {
   const renderLoading = useCallback(() => <Loading />, []);
   const renderError = useCallback(() => <Failed error={error} />, [error]);
   const renderCards = useMemo(
      () => (
         <div className={scss.cards}>
            {tours.map((tour, index) => (
               <TourCard
                  key={tour.id}
                  tour={tour}
                  cardType={index === 1 ? 'comfort' : 'standart'}
               />
            ))}
         </div>
      ),
      [tours],
   );

   return (
      <section className={scss.Main}>
         <div className="container">
            {children}
            <div className={scss.content}>
               {isLoading ? renderLoading() : error ? renderError() : renderCards}
            </div>
         </div>
      </section>
   );
});

TrafficsSection.displayName = 'TrafficsSection';
export default TrafficsSection;
