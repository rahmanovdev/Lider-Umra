'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import TrafficsSection from '../../home/TrafficsSection/TrafficsSection';
import TrafficFilters from '../../home/traffic-filters/TrafficFilters';
import scss from './PackegesContent.module.scss';
import { useState } from 'react';

const PackegesContent = () => {
	const { data: tours = [] } = useGetToursQuery();
	const [currentFilter, setCurrentFilter] = useState('all');

	const getFilteredTours = () => {
		if (!Array.isArray(tours)) return [];

		const sortedTours = [...tours].sort(
			(a, b) =>
				new Date(b.tour_date.start_tour).getTime() -
				new Date(a.tour_date.start_tour).getTime()
		);

		if (currentFilter === 'all') return sortedTours;

		return sortedTours.filter(tour => {
			const tourDate = new Date(tour.tour_date.start_tour);
			const tourMonth = tourDate.getMonth() + 1;

			switch (currentFilter) {
				case 'february':
					return tourMonth === 2;
				case 'march':
					return tourMonth === 3;
				case 'april':
					return tourMonth === 4;
				default:
					return true;
			}
		});
	};

	return (
		<div className={scss.PackegesContent}>
			<div className='container'>
				<TrafficsSection tours={getFilteredTours()}>
					<TrafficFilters onFilterChange={setCurrentFilter} />
				</TrafficsSection>
			</div>
		</div>
	);
};

export default PackegesContent;
