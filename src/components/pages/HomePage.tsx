'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import FAQ from '../common/faq/FAQ';
import scss from './HomePage.module.scss';
import AboutSection from './home/AboutSection/AboutSection';
import HeroSection from './home/HeroSection/HeroSection';
import InformationSection from './home/InformationSection/InformationSection';
import QuestionsSection from './home/QuestionsSection/QuestionsSection';
import StepsHajjSection from './home/StepsOfHajjSection/StepsHajjSection';
import TrafficsSection from './home/TrafficsSection/TrafficsSection';
import VideoSection from './home/VideoSection/VideoSection';

const HomePage = () => {
   const t = useTranslations();
   const { data: tours = [], isLoading, error } = useGetToursQuery();

   const getLastThreeTours = React.useMemo(() => {
      if (!Array.isArray(tours)) return [];

      const sortedTours = [...tours].sort(
         (a, b) =>
            new Date(b.tour_date.start_tour).getTime() -
            new Date(a.tour_date.start_tour).getTime(),
      );

      return sortedTours.slice(0, 3);
   }, [tours]);

   return (
      <>
         <div className={scss.HomePage}>
            <HeroSection />
            <AboutSection />
            <TrafficsSection
               isLoading={isLoading}
               error={error}
               tours={getLastThreeTours}
            >
               <Link href='/packages' className={scss.more}>
                  {t('packages.allPackages')}
                  <GoArrowRight className={scss.icon} />
               </Link>
            </TrafficsSection>
            <VideoSection />
            <StepsHajjSection />
            <QuestionsSection />
            <InformationSection />
            <FAQ />
         </div>
      </>
   );
};

export default HomePage;
