'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import scss from './AboutUsImage.module.scss';
import Link from 'next/link'
import { GoArrowRight } from 'react-icons/go'

const localImages = [
	'/assets/about.webp',
	'/assets/about.webp',
	'/assets/about.webp',
	'/assets/about.webp',
	'/assets/about.webp',
	'/assets/about.webp',
	'/assets/about.webp'
];

interface TextDictionary {
	kg: string[];
	ru: string[];
	en: string[];
}

const AboutUsImages = () => {
	const [showImages, setShowImages] = useState<boolean[]>(Array(6).fill(false));

	useEffect(() => {
		const delays = [2000, 3000, 4000, 2500, 3500, 4500];

		delays.forEach((delay, index) => {
			setTimeout(() => {
				setShowImages(prev => {
					const updated = [...prev];
					updated[index] = true;
					return updated;
				});
			}, delay);
		});
	}, []);

	const getAltText = (index: number) => {
		const texts: TextDictionary = {
			kg: ['Биринчи', 'Экинчи', 'Үчүнчү', 'Төртүнчү', 'Бешинчи', 'Алтынчы'],
			ru: ['Первое', 'Второе', 'Третье', 'Четвёртое', 'Пятое', 'Шестое'],
			en: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']
		};

		return `Биз жөнүндө - ${texts.kg[index]}`;
	};

	return (
		<section className={scss.photos_anim_block}>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.photos_anim_inner}>
						{showImages[0] && (
							<div className={scss.firstIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[0]}
									alt={getAltText(0)}
									width={320}
									height={500}
									loading='lazy'
								/>
							</div>
						)}
						{showImages[3] && (
							<div className={scss.forthIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[3]}
									alt={getAltText(3)}
									width={260}
									height={300}
									loading='lazy'
								/>
							</div>
						)}
						{showImages[1] && (
							<div className={scss.secIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[1]}
									alt={getAltText(1)}
									width={350}
									height={450}
									loading='lazy'
								/>
							</div>
						)}
						{showImages[4] && (
							<div className={scss.fifthIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[4]}
									alt={getAltText(4)}
									width={350}
									height={450}
									loading='lazy'
								/>
							</div>
						)}
						{showImages[2] && (
							<div className={scss.thirdIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[2]}
									alt={getAltText(2)}
									width={260}
									height={300}
									loading='lazy'
								/>
							</div>
						)}
						{showImages[5] && (
							<div className={scss.sixthIm}>
								<Image
									className={scss.photos_anim}
									src={localImages[5]}
									alt={getAltText(5)}
									width={320}
									height={500}
									loading='lazy'
								/>
							</div>
						)}
					</div>
					<div className={scss.link_photo}>
						<Link href='/gallery'>
							Все галереи
							<GoArrowRight className={scss.icon} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUsImages;
