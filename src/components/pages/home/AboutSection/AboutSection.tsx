import React from 'react';
import scss from './AboutSection.module.scss';
import card1 from '../../../../../public/assets/images/about_card1.svg';
import card2 from '../../../../../public/assets/images/about_card2.svg';
import card3 from '../../../../../public/assets/images/about_card3.svg';
import Image from 'next/image';
import emblemCard from '../../../../../public/assets/images/emblem_card.svg';
import BgOrnament from '../../../../../public/assets/images/bg_ornament.svg';
import star from '../../../../../public/assets/images/star.svg';
import star2 from '../../../../../public/assets/images/star2.svg';
import star3 from '../../../../../public/assets/images/star3.svg';
import lamp from '../../../../../public/assets/images/lamp.svg';
import AboutCards from '@/components/ui/cards/about_cards/AboutCards';

const AboutSection = () => {
	return (
		<div className={scss.AboutSection}>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.about_top}>
						<div className={scss.about_texts}>
							<div className={scss.title}>
								<h1>
									О компании <span>«Lider Umra»</span>
								</h1>
								<p>
									Lorem ipsum dolor sit amet consectetur. Tortor nunc
									pellentesque <br /> egestas velit vitae curabitur. Amet diam
									mattis at sit feugiat diam in. <br /> Tempor ac cursus neque
									in ipsum ut at donec. Bibendum scelerisque <br /> suscipit
									sociis cum ut egestas. Vitae amet adipiscing lacus ornare.
									Ligula <br /> at natoque gravida proin vestibulum in faucibus.
									Donec vulputate eget id sapien metus velit egestas luctus. Non
									eleifend egestas neque metus cursus risus ornare vel. Urna
									blandit
								</p>

								{/* <Image
									className={scss.star}
									src={star}
									alt='star'
									width={60}
									height={60}
									quality={70}
									priority
								/>

								<Image
									className={scss.star2}
									src={star2}
									alt='star2'
									width={100}
									height={80}
									quality={70}
									priority
								/> */}
							</div>
							<button>узнать больше</button>

							<div className={scss.tags}>
								<div className={scss.tag_top}>
									<h5>намаз</h5>
									<h5>умра</h5>
									<h5>чистота</h5>
								</div>
								<div className={scss.tag_bottom}>
									<h5>иман</h5>
									<h5>коран</h5>
								</div>
							</div>
						</div>
						<div className={scss.about_video}>
							{/* <Image
								className={scss.star3}
								src={star3}
								alt='star3'
								width={140}
								height={110}
								quality={70}
								priority
							/> */}

							<div className={scss.video_container}>
								<iframe
									width='560'
									height='315'
									src='https://www.youtube.com/embed/6i2rjWV5Djc'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
					<div className={scss.about_bottom}>
						<AboutCards />
					</div>
					<Image
						className={scss.bg_ornament}
						src={BgOrnament}
						alt='Ornament_bg'
						width={700}
						height={500}
						quality={70}
						priority
					/>

					<Image
						className={scss.lamp_element}
						src={lamp}
						alt='lamp'
						width={140}
						height={140}
						quality={70}
						priority
					/>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
