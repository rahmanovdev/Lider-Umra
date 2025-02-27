'use client';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import { useParams } from 'next/navigation';
import AboutProgramDet from './AboutProgramDet/AboutProgramDet';
import About_ProgramDet from './About_ProgramDet/About_ProgramDet';
import HeadPackegeDet from './Head_PackeckgeDet/HeadPackegeDet';
import Loading from '@/components/ui/loading/Loading';
import { useTranslations } from 'next-intl';

const PackegesDetailContent = () => {
	const t = useTranslations('packageDetails');
	const params = useParams();
	const id = Number(params.id);

	const { data: tourData, isLoading, error } = useGetTourByIdQuery(id);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		console.error('Тур маалыматын алууда ката:', error);
		return <div>{t('error')}</div>;
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
