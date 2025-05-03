'use client';
import React from 'react';
import styles from './PlacesSection.module.scss';
import Image from 'next/image';
import { Modal } from '../shared/Modal';
import PlaceCard from '../PlaceCard/PlaceCard';
import { placesData } from '../../data/content';

const PlacesSection = () => {
	const [selectedPlaceId, setSelectedPlaceId] = React.useState<number | null>(
		null
	);

	const selectedPlace = placesData.find(p => p.id === selectedPlaceId);
	return (
		<div className={styles.placesContent}>
			<h1>Проживание в отелях</h1>
			<div className={styles.hotelContainer}>
				<div className={styles.HostelContent}>
					<h2>Проживание в Медине</h2>
					<div className={styles.ImageCard}>
						<Image
							src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/1b/3c/df/hostel-nomad.jpg?w=1200&h=-1&s=1'
							alt='Medina Hotel'
							width={500}
							height={400}
							priority
						/>
						<h3 className={styles.hotelName}>Maien Taiba (или аналог)</h3>
					</div>
					<div className={styles.infoGrid}>
						<div className={styles.infoItem}>
							<span>Расстояние до мечети Пророка</span>
							<span>300м</span>
						</div>
						<div className={styles.infoItem}>
							<span>Размещение</span>
							<span>Четырехместное</span>
						</div>
						<div className={styles.infoItem}>
							<span>Питание</span>
							<span>Завтрак и ужин - шведский стол</span>
						</div>
						<div className={styles.infoItem}>
							<span>Количество ночей</span>
							<span>3</span>
						</div>
					</div>
				</div>

				<div className={styles.HostelContent}>
					<h2>Проживание в Мекке</h2>
					<div className={styles.ImageCard}>
						<Image
							src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/1b/3c/df/hostel-nomad.jpg?w=1200&h=-1&s=1'
							alt='Mecca Hotel'
							width={500}
							height={400}
							priority
						/>
						<h3 className={styles.hotelName}>Infinity (или аналог)</h3>
					</div>
					<div className={styles.infoGrid}>
						<div className={styles.infoItem}>
							<span>Расстояние до Аль-Харама</span>
							<span>700 метров</span>
						</div>
						<div className={styles.infoItem}>
							<span>Размещение</span>
							<span>Четырехместное</span>
						</div>
						<div className={styles.infoItem}>
							<span>Питание</span>
							<span>Завтрак и ужин (шведский стол)</span>
						</div>
						<div className={styles.infoItem}>
							<span>Количество ночей</span>
							<span>10</span>
						</div>
					</div>
				</div>
			</div>
			{selectedPlace && (
				<Modal
					title={selectedPlace.title}
					content={selectedPlace.fullDescription}
					onClose={() => setSelectedPlaceId(null)}
					isOpen={Boolean(selectedPlaceId)}
				/>
			)}
			<div className={styles.others_places}>
				<h1>Места для посещения</h1>
				<div className={styles.placesList}>
					{placesData.map(place => (
						<PlaceCard
							onOpen={() => setSelectedPlaceId(place.id)}
							key={place.id}
							place={place}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PlacesSection;
