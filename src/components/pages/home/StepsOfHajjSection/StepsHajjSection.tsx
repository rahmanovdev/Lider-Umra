'use client';
import * as React from 'react';
import scss from './StepsHajjSection.module.scss';
import Image from 'next/image';
import img1 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage1.png';
import img2 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage2.png';
import img3 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage3.png';
import img4 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage4.png';
import img5 from '../../../../../public/assets/stepsOfHadj_img/hadj-stage5.png';

const colors: { [key: number]: string } = {
	1: 'rgb(220, 255, 220)', // Mint
	2: 'rgb(200, 230, 255)', // Light Sky Blue
	3: 'rgb(255, 250, 205)', // Lemon Chiffon
	4: 'rgb(225, 225, 255)', // Periwinkle
	5: 'rgb(230, 240, 210)' // Tea Green
};

const steps = [
	{ title: 'Хадж', img: img1 },
	{ title: 'Ихрам', img: img2 },
	{ title: 'Арафа', img: img3 },
	{ title: 'Таваф', img: img4 },
	{ title: "Са'й", img: img5 }
];

const StepsHajjSection = () => {
	const [currentStep, setCurrentStep] = React.useState(1);
	const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStep(prevStep => {
				const nextStep = prevStep < 5 ? prevStep + 1 : 1;

				// Scroll to the active element
				const container = scrollContainerRef.current;
				if (container) {
					const activeElement = document.getElementById(`step-${nextStep - 1}`);
					if (activeElement) {
						const containerWidth = container.offsetWidth;
						const elementOffset = activeElement.offsetLeft;
						const elementWidth = activeElement.offsetWidth;

						container.scrollTo({
							left: elementOffset - (containerWidth - elementWidth) / 2,
							behavior: 'smooth'
						});
					}
				}

				return nextStep;
			});
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className={scss.Main}>
			<div className={scss.pre_main}>
				<div className='container'>
					<div className={scss.content}>
						<h1>Столпы хаджа и обязательные действия</h1>
						<div className={scss.block_content} ref={scrollContainerRef}>
							{steps.map((step, index) => {
								const isActive = currentStep === index + 1;
								return (
									<div
										id={`step-${index}`}
										key={index}
										className={`${scss.block} ${
											isActive ? scss.active : scss.inactive
										}`}
										style={{
											background: colors[index + 1]
										}}
									>
										<h2>{step.title}</h2>
										<Image
											src={step.img}
											alt={step.title}
											width={700}
											height={300}
											priority={isActive}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StepsHajjSection;
