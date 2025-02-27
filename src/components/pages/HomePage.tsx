'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import scss from './HomePage.module.scss';
import AboutSection from './home/AboutSection/AboutSection';
import HeroSection from './home/HeroSection/HeroSection';
import InformationSection from './home/InformationSection/InformationSection';
import QuestionsSection from './home/QuestionsSection/QuestionsSection';
import StepsHajjSection from './home/StepsOfHajjSection/StepsHajjSection';
import TrafficsSection from './home/TrafficsSection/TrafficsSection';
import FAQ from '../ui/faq/FAQ';
import { useTranslations } from 'next-intl'
import { GoArrowRight } from 'react-icons/go'
import Link from 'next/link'

const HomePage = () => {
	const t = useTranslations()
	const { data: tours = [] } = useGetToursQuery();
	const getLastThreeTours = () => {
		if (!Array.isArray(tours)) return [];

		const sortedTours = [...tours].sort(
			(a, b) =>
				new Date(b.tour_date.start_tour).getTime() -
				new Date(a.tour_date.start_tour).getTime()
		);

		return sortedTours.slice(0, 3);
	};
	return (
		<>
			<div className={scss.HomePage}>
				<HeroSection />
				<AboutSection />
				<TrafficsSection tours={getLastThreeTours()}>
					<Link href="/packages" className={scss.more}>
						{t('packages.allPackages')}
						<GoArrowRight className={scss.icon} />
					</Link>
				</TrafficsSection>
				<StepsHajjSection />
				<QuestionsSection />
				<InformationSection />
				<FAQ />
			</div>
		</>
	);
};

export default HomePage;
