'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import scss from './HeroSection.module.scss';

type HeroTextProps = {
	className?: string;
};

type HeroButtonsProps = {
	className?: string;
};

type IndicatorsProps = {
	current: number;
	total: number;
	onClick: (index: number) => void;
};

const slides = [
	{
		src: '/assets/images/Bg_hero.png',
		alt: 'Hero background 1'
	},
	{
		src: '/assets/images/bg_2hero.png',
		alt: 'Hero background 2'
	},
	{
		src: '/assets/images/bg_hero3.jpg',
		alt: 'Hero background 3'
	}
] as const;

const HeroText = memo(({ className }: HeroTextProps) => (
	<div className={`${scss.hero_text} ${className || ''}`}>
		<h1>
			Совершите Умру <br /> с комфортом.
		</h1>
		<p>Lorem ipsum dolor sit amet consectetur.</p>
	</div>
));
HeroText.displayName = 'HeroText';

const HeroButtons = memo(({ className }: HeroButtonsProps) => (
	<div className={`${scss.hero_btn} ${className || ''}`}>
		<button className={scss.btn_tours}>К списку туров</button>
		<button className={scss.btn_podrobnee}>подробнее</button>
	</div>
));
HeroButtons.displayName = 'HeroButtons';

const Indicators = memo(({ current, total, onClick }: IndicatorsProps) => (
	<div className={scss.indicators}>
		{Array.from({ length: total }, (_, index) => (
			<button
				key={index}
				className={`${scss.indicator} ${current === index ? scss.active : ''}`}
				onClick={() => onClick(index)}
				aria-label={`Slide ${index + 1}`}
			/>
		))}
	</div>
));
Indicators.displayName = 'Indicators';

const HeroSection: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [, setIsLoading] = useState(true);

	const handleSlideChange = useCallback((index: number) => {
		setCurrentSlide(index);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 4000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className={scss.HeroSection}>
			{slides.map((slide, index) => (
				<div
					key={slide.src}
					className={`${scss.imageWrapper} ${
						currentSlide === index ? scss.active : ''
					}`}
				>
					<Image
						src={slide.src}
						alt={slide.alt}
						priority={index === 0}
						quality={75}
						className={scss.backgroundImage}
						onLoadingComplete={() => setIsLoading(false)}
						sizes='94vw'
						fill
					/>
				</div>
			))}

			<div className={scss.overlay} />

			<div className='container'>
				<div className={scss.content}>
					<HeroText />
					<HeroButtons />
				</div>
			</div>

			<Indicators
				current={currentSlide}
				total={slides.length}
				onClick={handleSlideChange}
			/>
		</div>
	);
};

export default memo(HeroSection);
