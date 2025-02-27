'use client';
import { useGetToursQuery } from '@/redux/api/tour';
import TrafficsSection from '../../home/TrafficsSection/TrafficsSection';
import TrafficFilters from '../../home/traffic-filters/TrafficFilters';
import scss from './PackegesContent.module.scss';
import React, { useState } from 'react';
import Loading from '@/components/ui/loading/Loading';
import { formatDate, months } from '@/utils/format-date';

const PackegesContent = () => {
	const { data: tours = [], isLoading, error } = useGetToursQuery();
	const [currentFilter, setCurrentFilter] = useState('all');

	const getFilteredTours = React.useCallback(() => {
		if (!Array.isArray(tours)) return [];

		const sortedTours = [...tours].sort(
			(a, b) =>
				new Date(b.tour_date.start_tour).getTime() -
				new Date(a.tour_date.start_tour).getTime()
		);

		if (currentFilter === 'all') return sortedTours;

		const monthIndex = months.findIndex(month => month.value === currentFilter);

		if (monthIndex === -1) return sortedTours;

		return sortedTours.filter(tour => {
			const tourDate = new Date(tour.tour_date.start_tour);
			const tourMonth = tourDate.getMonth();
			return tourMonth === monthIndex;
		});
	}, [currentFilter, tours]);

	const dates = React.useMemo(
		() =>
			tours.map(v => ({
				start: formatDate(v.tour_date.start_tour),
				end: formatDate(v.tour_date.end_tour)
			})),
		[tours]
	);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <div></div>;
	}

	return (
		<div className={scss.PackegesContent}>
			<div className='container'>
				<TrafficsSection key={currentFilter} tours={getFilteredTours()}>
					<TrafficFilters
						value={currentFilter}
						dates={dates}
						onFilterChange={setCurrentFilter}
					/>
				</TrafficsSection>
			</div>
		</div>
	);
};

export default PackegesContent;
