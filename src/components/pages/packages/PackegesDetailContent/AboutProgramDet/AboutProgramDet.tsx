'use client';
import RequiredOfYou from '@/components/ui/required-of-you/RequiredOfYou';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import {
	MdCalendarMonth,
	MdCardGiftcard,
	MdLocationOn,
	MdThumbDown,
	MdThumbUp
} from 'react-icons/md';
import { FoodSection } from '../components/FoodSection';
import { GiftsSection } from '../components/GiftsSection';
import PlacesSection from '../components/PlacesSection/PlaceSection';
import { WarningsSection } from '../components/WarningsSection';
import styles from './AboutProgramDet.module.scss';

interface Section {
	id: number;
	title: string;
	type: string;
	icon: React.ReactNode;
}

interface Place {
	id: number;
	title: string;
	image: string;
	shortDescription: string;
	fullDescription: string;
}

const sections: Section[] = [
	{
		id: 1,
		title: 'Питание',
		type: 'food',
		icon: <MdCalendarMonth className={styles.icon} />
	},
	{
		id: 2,
		title: 'Какие места посетим',
		type: 'places',
		icon: <MdLocationOn className={styles.icon} />
	},
	{
		id: 3,
		title: 'Мы рекомендуем!',
		type: 'recommendations',
		icon: <MdThumbUp className={styles.icon} />
	},
	{
		id: 4,
		title: 'Не рекомендуем',
		type: 'warnings',
		icon: <MdThumbDown className={styles.icon} />
	},
	{
		id: 5,
		title: 'Вам дадим',
		type: 'gifts',
		icon: <MdCardGiftcard className={styles.icon} />
	}
];

interface AboutProgramDetProps {
	tourData: TOURS.ITourPackages;
}

const AboutProgramDet = ({ tourData }: AboutProgramDetProps) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [isHovered, setIsHovered] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			if (!isHovered) {
				setActiveIndex(prevIndex =>
					prevIndex === sections.length - 1 ? 0 : prevIndex + 1
				);
			}
		}, 5000);
	};

	useEffect(() => {
		startInterval();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isHovered]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const renderContent = (section: Section) => {
		switch (section.type) {
			case 'food':
				return (
					<div
						className={styles.contentCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<FoodSection />
					</div>
				);

			case 'places':
				return (
					<div
						className={styles.contentCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<PlacesSection />
					</div>
				);

			// case 'requirements':
			// 	return (
			// 		<div
			// 			className={styles.contentCard}
			// 			onMouseEnter={handleMouseEnter}
			// 			onMouseLeave={handleMouseLeave}
			// 		>
			// 			<RequiredOfYou />
			// 		</div>
			// 	);

			case 'recommendations':
				return (
					<div
						className={styles.contentCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className={styles.recommendContent}>
							<RequiredOfYou />
						</div>
					</div>
				);

			case 'warnings':
				return (
					<div
						className={styles.contentCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<WarningsSection />
					</div>
				);

			case 'gifts':
				return (
					<div
						className={styles.contentCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<GiftsSection />
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className='container'>
			<div className={styles.sectionList}>
				{sections.map((section, index) => (
					<button
						key={section.id}
						className={clsx(styles.sectionButton, {
							[styles.active]: index === activeIndex
						})}
						onClick={() => setActiveIndex(index)}
					>
						<span className={styles.buttonText}>{section.title}</span>
						<div className={styles.iconContainer}>
							<span className={styles.iconWrapper}>{section.icon}</span>
						</div>
					</button>
				))}
			</div>

			{activeIndex !== null && renderContent(sections[activeIndex])}
			{selectedPlace && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<button
							className={styles.closeButton}
							onClick={() => setSelectedPlace(null)}
						>
							×
						</button>
						<h2>{selectedPlace.title}</h2>
						<p>{selectedPlace.fullDescription}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default AboutProgramDet;
