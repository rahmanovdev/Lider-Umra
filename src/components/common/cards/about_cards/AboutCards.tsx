'use client';
import Image from 'next/image';
import React from 'react';
import scss from './AboutCards.module.scss';
import card1 from '../../../../../public/assets/images/about_card1.svg';
import card2 from '../../../../../public/assets/images/about_card2.svg';
import card3 from '../../../../../public/assets/images/about_card3.svg';
import emblemCard from '../../../../../public/assets/images/emblem_card.svg';
import { useTranslations } from 'next-intl';

const AboutCards = () => {
	const t = useTranslations();
	const cards = t.raw('about.cards') as { title: string; description: string }[];

	return (
		<div className={scss.about_bottom}>
			<div className={scss.about_cards}>
				{cards.map((card, index) => (
					<div key={index} className={scss[`card${index + 1}`]}>
						<div className={scss.card_top}>
							<Image
								src={index === 0 ? card1 : index === 1 ? card2 : card3}
								alt={`Card_${index + 1}`}
								priority
								quality={70}
								width={45}
								height={45}
							/>
							<h2>{card.title}</h2>
						</div>
						<hr className={scss.divider} />
						<p>{card.description}</p>
						<Image
							className={scss.emblem_card}
							src={emblemCard}
							alt='emblema'
							width={700}
							quality={70}
							height={500}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default AboutCards;
