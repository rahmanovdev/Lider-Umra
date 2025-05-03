'use client';

import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useParams } from 'next/navigation';
import QuestionsSection from '../../home/QuestionsSection/QuestionsSection';
import AboutProgramDet from './AboutProgramDet/AboutProgramDet';
import About_ProgramDet from './About_ProgramDet/About_ProgramDet';
import HeadPackegeDet from './Head_PackeckgeDet/HeadPackegeDet';

const PackegesDetailContent = () => {
	const params = useParams();
	const {
		data: tourData,
		isLoading,
		error
	} = useGetTourByIdQuery(Number(params.id));

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		console.error('Error fetching tour:', error);
		return <div>Error loading tour data</div>;
	}

	if (!tourData) {
		return <div>Package not found</div>;
	}

	return (
		<>
			<HeadPackegeDet tourData={tourData} />
			<AboutProgramDet tourData={tourData} />
			<About_ProgramDet tourData={tourData} />
			<QuestionsSection />
		</>
	);
};

export default PackegesDetailContent;
