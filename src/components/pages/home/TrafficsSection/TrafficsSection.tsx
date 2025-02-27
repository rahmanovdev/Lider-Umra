'use client';
import TrafficCard from '@/components/ui/cards/traffic-card/TrafficCard';
import React from 'react';
import scss from './TrafficsSection.module.scss';
import { motion } from 'framer-motion';
const TrafficsSection: React.FC<
	React.PropsWithChildren & {
		tours: TOURS.GetTourPackagesResponse;
	}
> = ({ children, tours }) => {
	return (
		<section className={scss.Main}>
			<div className='container'>
				{children}
				<div className={scss.content}>
					<div className={scss.cards}>
						{tours.map((tour, index) => {
							const cardType = index === 1 ? 'comfort' : 'standart';
							const currentTour = tours[index];

							return (
								<motion.div
									initial={"hidden"}
									animate={"visible"}
									transition={{ duration: 0.3 }}
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
									}}
									key={currentTour.id}
									className={scss[cardType]}
								>
									<TrafficCard tour={tour} />
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TrafficsSection;
