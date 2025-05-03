'use client';
import React from 'react';
import scss from './HeadPackegeDet.module.scss';
import Image from 'next/image';

interface HeadPackegeDetProps {
	tourData: TOURS.ITourPackages;
}

const Type = {
	ekonom: 'Эконом',
	comfort: 'Комфорт'
};

const HeadPackegeDet: React.FC<HeadPackegeDetProps> = ({ tourData }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const months = [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря'
		];
		return {
			day: date.getDate(),
			month: months[date.getMonth()],
			year: date.getFullYear()
		};
	};

	const startDate = formatDate(tourData.tour_date.start_tour);
	const endDate = formatDate(tourData.tour_date.end_tour);

	const packageType =
		tourData.category.name.toLowerCase() === 'комфорт' ? 'comfort' : 'ekonom';

	return (
		<div className={scss.HeadPackegeDet}>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.card_container}>
						<div className={scss.info_card}>
							<div className={scss.date_range}>
								<div className={scss.date_item}>
									<div className={scss.month_year}>
										<h1>{startDate.day}</h1>
										<div className={scss.month}>
											<h5>{startDate.month}</h5>
											<h5>{startDate.year}</h5>
										</div>
									</div>
								</div>
								<div className={scss.line} />
								<div className={scss.date_item}>
									<div className={scss.month_year}>
										<h1>{endDate.day}</h1>
										<div className={scss.month}>
											<h5>{endDate.month}</h5>
											<h5>{endDate.year}</h5>
										</div>
									</div>
								</div>
							</div>
							<hr />
							<div className={scss.text_card}>
								{/* Тибин көрсөтөбүз */}
								<h2>{Type[packageType]} пакет</h2>
								<p>{tourData.description}</p>
							</div>
						</div>

						<div className={scss.image_card}>
							<div className={scss.leader_container}>
								<div className={scss.leader_header}>
									<h3>Ажы башчы менен</h3>
								</div>
								<div className={scss.leader_content}>
									<div className={scss.leader_image}>
										<Image
											src={tourData.ajy.image}
											alt={tourData.ajy.name}
											width={300}
											height={300}
										/>
									</div>
									<div className={scss.leader_info}>
										<h4>{tourData.ajy.name}</h4>
										<p>{tourData.ajy.bio}</p>
										<div className={scss.card_info}>
											<div className={scss.info_line}>
												<h4>Колличество:</h4>
												<h5>{tourData.available_seats} мест</h5>
											</div>
											<div className={scss.info_line}>
												<h4>Длительность:</h4>
												<h5>{tourData.tour_date.duration} дней</h5>
											</div>
											<div className={scss.info_line}>
												<h4>Категория:</h4>
												<h5>{tourData.category.name}</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={scss.call_buttons}>
						<button>Арыз берүү</button>
						<button>Ватсапка жазуу</button>
						<button>Чалуу</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeadPackegeDet;
