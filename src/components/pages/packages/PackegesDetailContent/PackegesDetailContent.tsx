'use client';
import Loading from '@/components/ui/loading/Loading';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import AboutProgramDet from './AboutProgramDet/AboutProgramDet';
import About_ProgramDet from './About_ProgramDet/About_ProgramDet';
import HeadPackegeDet from './Head_PackeckgeDet/HeadPackegeDet';
import Failed from '@/components/ui/failed/Failed';

const PackegesDetailContent = () => {
   const t = useTranslations('packages.detail');
   const params = useParams();
   const id = Number(params.id);

   const { data: tourData, isLoading, error } = useGetTourByIdQuery(id);

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Failed error={error} />;
   }

   if (!tourData) {
      return <div>{t('notFound')}</div>;
   }

   return (
      <>
         <HeadPackegeDet tourData={tourData} />
         <AboutProgramDet tourData={tourData} />
         <About_ProgramDet tourData={tourData} />
      </>
   );
};

export default PackegesDetailContent;
