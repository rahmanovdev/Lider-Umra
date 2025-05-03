import Image from 'next/image';
import React from 'react';
import scss from './AboutCards.module.scss';
import card1 from '../../../../../public/assets/images/about_card1.svg';
import card2 from '../../../../../public/assets/images/about_card2.svg';
import card3 from '../../../../../public/assets/images/about_card3.svg';
import emblemCard from '../../../../../public/assets/images/emblem_card.svg';

const AboutCards = () => {
	return (
		<>
			<div className={scss.about_bottom}>
				<div className={scss.about_cards}>
					<div className={scss.card1}>
						<div className={scss.card_top}>
							<Image
								src={card1} 
								alt='Card_1'
								priority
								quality={70}
								width={45}
								height={45}
							/>
							<h2>10 лет опыта и доверия</h2>
						</div>
						<hr className={scss.divider} />
						<p>
							Уже 10 лет мы помогаем клиентам отправляться в духовные
							путешествия
						</p>
						<Image
							className={scss.emblem_card}
							src={emblemCard}
							alt='emblema'
							width={700}
							quality={70}
							height={500}
						/>
					</div>
					<div className={scss.card2}>
						<div className={scss.card_top}>
							<Image
								src={card2}
								alt='Card_1'
								priority
								quality={70}
								width={45}
								height={45}
							/>
							<h2>3000+ довольных клиентов</h2>
						</div>
						<hr className={scss.divider} />
						<p>
							Уже 3000+ человек доверили нам организацию своих путешествий в
							Умру. Мы обеспечиваем комфорт, надежность и внимание к каждой
							детали.
						</p>
						<Image
							className={scss.emblem_card}
							src={emblemCard}
							alt='emblema'
							width={700}
							quality={70}
							height={500}
						/>
					</div>
					<div className={scss.card3}>
						<div className={scss.card_top}>
							<Image
								src={card3}
								alt='Card_1'
								priority
								quality={70}
								width={45}
								height={45}
							/>
							<h2>50+ успешных туров</h2>
						</div>
						<hr className={scss.divider} />
						<p>
							Уже 50+ раз мы организовали духовные поездки для наших клиентов по
							всему миру. Мы обеспечиваем комфорт, надежность и внимание к
							каждой детали.
						</p>
						<Image
							className={scss.emblem_card}
							src={emblemCard}
							alt='emblema'
							width={700}
							quality={70}
							height={500}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutCards;
