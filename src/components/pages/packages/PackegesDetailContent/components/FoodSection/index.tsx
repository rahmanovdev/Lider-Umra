'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useGetFoodInfoQuery } from '@/redux/api/tour-details'

export const FoodSection: React.FC = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { data: foodInfo, isLoading } = useGetFoodInfoQuery('FoodInfo');

	if (isLoading) {
		return <div>Жүктөлүүдө...</div>;
	}

	if (!foodInfo || foodInfo.length === 0) {
		return <div>Маалымат табылган жок</div>;
	}

	const currentFood = foodInfo[0];

	return (
		<div className={styles.foodContent}>
			<div className={styles.foodSlider}>
				<div className={styles.sliderWrapper}>
					<button
						className={styles.sliderButton}
						onClick={() =>
							setCurrentImageIndex(prev =>
								prev === 0 ? currentFood.images.length - 1 : prev - 1
							)
						}
					>
						←
					</button>
					<div className={styles.imageWrapper}>
						<Image
							src={currentFood.images[currentImageIndex]}
							alt={`Food ${currentImageIndex + 1}`}
							width={600}
							height={400}
							objectFit='cover'
						/>
					</div>
					<button
						className={styles.sliderButton}
						onClick={() =>
							setCurrentImageIndex(prev =>
								prev === currentFood.images.length - 1 ? 0 : prev + 1
							)
						}
					>
						→
					</button>
				</div>
				<div className={styles.sliderDots}>
					{currentFood.images.map((_, index) => (
						<button
							key={index}
							className={clsx(styles.dot, {
								[styles.activeDot]: index === currentImageIndex
							})}
							onClick={() => setCurrentImageIndex(index)}
						/>
					))}
				</div>
			</div>
			<div className={styles.foodInfo}>
				<h2>{currentFood.title}</h2>
				<p>{currentFood.description}</p>
			</div>
		</div>
	);
};
