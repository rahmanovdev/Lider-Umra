'use client';
import styles from './styles.module.scss';
import { ImageSlider } from '../shared/ImageSlider';
import { useParams } from 'next/navigation';
import { useGetTourByIdQuery } from '@/redux/api/tour';
import React from 'react';
import { useGetPackageDetailQuery } from '@/redux/api/tour-details';

export const FoodSection: React.FC = () => {
	const params = useParams();
	const tourId = Number(params.id);

	const { data: tourData, isLoading: tourLoading } =
		useGetTourByIdQuery(tourId);
	const { data: foodInfo, isLoading: foodLoading } = useGetPackageDetailQuery({
		type: 'FoodInfo',
		category: tourData?.category
	});
	if (tourLoading || foodLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!foodInfo || foodInfo.length === 0 || !tourData) {
		return <div>Маалымат табылган жок</div>;
	}

	return (
		<div className={styles.foodSection}>
			<h3 className={styles.packageTitle}>
				{tourData.category.name.toLowerCase()} категориясындагы тамактар
			</h3>

			{foodInfo.length > 0 ? (
				foodInfo.map(food => (
					<div key={food.id} className={styles.foodContent}>
						<div className={styles.foodSlider}>
							{food.images && food.images.length > 0 ? (
								<ImageSlider images={food.images} height={400} />
							) : (
								<div>Сүрөт жок</div>
							)}
						</div>
						<div className={styles.foodInfo}>
							<h2>{food.title}</h2>
							<div
								className={styles.description_content}
								dangerouslySetInnerHTML={{ __html: food.description }}
							/>
						</div>
					</div>
				))
			) : (
				<div>Бул категория боюнча тамактар табылган жок</div>
			)}
		</div>
	);
};
