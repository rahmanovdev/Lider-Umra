'use client';
import styles from './styles.module.scss';
import { useGetFoodInfoQuery } from '@/redux/api/tour-details';
import { ImageSlider } from '../shared/ImageSlider'; // ImageSlider компонентин импорттойбуз

export const FoodSection: React.FC = () => {
	const { data: foodInfo, isLoading } = useGetFoodInfoQuery('FoodInfo');

	console.log('foodInfo data:', foodInfo); // Маалыматты текшеребиз

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!foodInfo || foodInfo.length === 0) {
		return <div>Маалымат табылган жок</div>;
	}

	return (
		<div className={styles.foodSection}>
			{foodInfo.map(food => (
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
							dangerouslySetInnerHTML={{
								__html: food.description
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
