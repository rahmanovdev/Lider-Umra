'use client';
import TrafficCard from '@/components/ui/cards/traffic-card/TrafficCard';
import React from 'react';
import scss from './TrafficsSection.module.scss';

const TrafficsSection: React.FC<
  React.PropsWithChildren & {
    tours: TOURS.GetTourPackagesResponse;
  }
> = ({ children, tours }) => {
  return (
    <section className={scss.Main}>
      <div className="container"> 
        {children}
        <div className={scss.content}>
          <div className={scss.cards}>
            {tours.map((tour, index) => {
              const cardType = index === 1 ? 'comfort' : 'standart';
              const currentTour = tours[index];

              return (
                <div key={currentTour.id} className={scss[cardType]}>
                  <TrafficCard tour={tour} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrafficsSection;
