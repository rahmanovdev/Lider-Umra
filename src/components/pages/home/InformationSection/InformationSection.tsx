import React from 'react';
import scss from './InformationSection.module.scss';
import infoImg from '../../../../../public/assets/info_img/test img.jpeg';
import Image from 'next/image';

const InformationSection = () => {
	return (
		<section className={scss.Main}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1>Полезные информации</h1>
					<div className={scss.main_card}>
						{Array.from({ length: 4 }).map((_, idx) => (
							<div key={idx} className={scss.card}>
								<div className={scss.imageWrapper}>
									<Image
										src={infoImg}
										alt='Card Image'
										className={scss.image}
										width={700}
										height={300}
									/>
								</div>
								<div className={scss.textOverlay}>
									<p className={scss.text}>
										Lorem ipsum dolor sit amet consectetur.
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default InformationSection;
