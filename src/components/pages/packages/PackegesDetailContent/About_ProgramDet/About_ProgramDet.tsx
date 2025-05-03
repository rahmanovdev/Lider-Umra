import React from 'react';
import scss from './About_ProgramDet.module.scss';
import Image from 'next/image';

interface AboutProgramDetProps {
	tourData: TOURS.ITourPackages;
}

const About_ProgramDet = ({ tourData }: AboutProgramDetProps) => {
	return (
		<section className={scss.About_ProgramDet}>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.program_left}>
						<Image
							width={700}
							height={500}
							priority
							quality={70}
							src={'/assets/images/about-page-advantages.jpg'}
							alt='about_program'
						/>
					</div>
					<div className={scss.about_text}>
						<h1>Программа жөнүндө</h1>
						<p>
							Эң популярдуу Аль-Харамга 24 сааттык транспорту бар 3-4*
							мейманканаларда жайгашуу. Турдун баасына төмөнкүлөр кирет: виза,
							авиабилет, Меккедеги 3-4* мейманканада жайгашуу: 3 түн Мадина 10
							түн Мекке, күнүнө эки маал: эртең мененки жана кечки тамак - швед
							столунда, тажрыйбалуу ажы башчыдан сабак жана баяндар, ыйык
							жерлерге зыяраттар жана ыңгайлуу автобустар менен шаарлардын
							ортосунда трансферлер. Бизде гана: бир сапарда 4 жолу умра кылуу,
							бардык зыяраттар жана баяндар радио гид менен! Төлөмдөр
							компаниянын ички курсуна ылайык төлөнөт.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About_ProgramDet;
