'use client';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useParams } from 'next/navigation';
import AboutProgramDet from './AboutProgramDet/AboutProgramDet';
import About_ProgramDet from './About_ProgramDet/About_ProgramDet';
import HeadPackegeDet from './Head_PackeckgeDet/HeadPackegeDet';

const PackegesDetailContent = () => {
	const params = useParams();
	const id = Number(params.id);

	const { data: tourData, isLoading, error } = useGetTourByIdQuery(id);

	if (isLoading) {
		return <div>Жүктөлүп жатат...</div>;
	}

	if (error) {
		console.error('Тур маалыматын алууда ката:', error);
		return <div>Тур маалыматын жүктөөдө ката кетти</div>;
	}

	if (!tourData) {
		return <div>Пакет табылган жок</div>;
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
