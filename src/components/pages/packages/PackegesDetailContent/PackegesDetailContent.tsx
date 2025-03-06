'use client';
import Loading from '@/components/ui/loading/Loading';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useParams } from 'next/navigation';
import AboutProgramDet from './AboutProgramDet/AboutProgramDet';
import About_ProgramDet from './About_ProgramDet/About_ProgramDet';
import Failed from '@/components/ui/failed/Failed';
import { DynamicHeadPackegeDet } from './Head_PackeckgeDet/HeadPackegeDet'

const PackegesDetailContent = () => {
   const params = useParams();
   const id = Number(params.id);

   const { data: tourData, isLoading, error } = useGetTourByIdQuery(id);

   if (isLoading) return <Loading />;

   if (error) return <Failed error={error} />;

   if (!tourData) return '';

   return (
      <>
         <DynamicHeadPackegeDet tourData={tourData} />
         <AboutProgramDet tourData={tourData} />
         <About_ProgramDet tourData={tourData} />
      </>
   );
};

export default PackegesDetailContent;
