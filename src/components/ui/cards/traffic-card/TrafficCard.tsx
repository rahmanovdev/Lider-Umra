'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import scss from './TrafficCard.module.scss';
import { FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/utils/format-date';

type TProps = {
	tour: TOURS.ITourPackages;
};

const TrafficCard: React.FC<TProps> = ({ tour }) => {
	const t = useTranslations('traffics.card');
	return (
		<div className={scss.Main}>
			<h2>{tour.category.name}</h2>
			<div className={scss.data_block}>
				<p>
					{t('from')}{' '}
					<span>
						{formatDate(tour.tour_date.start_tour).day}
						{formatDate(tour.tour_date.start_tour).month}
					</span>
				</p>
				<div className={scss.line}></div>
				<p>
					{t('to')}{' '}
					<span>
						{' '}
						{formatDate(tour.tour_date.end_tour).day}
						{formatDate(tour.tour_date.end_tour).month}
					</span>
				</p>
			</div>
			<div className={scss.img_block}>
				<Image src={tour.image} alt={tour.name} width={700} height={300} />
			</div>
			<div className={scss.card_container}>
				<div className={scss.line}>
					<h4>{t('ajy')}</h4>
					<h5>{tour.ajy.name}</h5>
				</div>
				<hr className={scss.divider} />
				<div className={scss.line}>
					<h4>{t('category')}</h4>
					<h5>{tour.category.name}</h5>
				</div>
				<hr className={scss.divider} />
				<div className={scss.line}>
					<h4>{t('seats')}</h4>
					<h5>{tour.available_seats} мест</h5>
				</div>
				<hr className={scss.divider} />
				<div className={scss.line}>
					<h4>{t('duration')}</h4>
					<h5>{tour.tour_date.duration} дней</h5>
				</div>
				<hr className={scss.divider} />
				<div className={scss.line}>
					<h4>{t('hotelCategory')}</h4>
					<StarRating count={4} />
				</div>
				<hr className={scss.divider} />
			</div>
			<div className={scss.link}>
				<Link href={`/packages/${tour.id}`}>{t('details')}</Link>
			</div>
		</div>
	);
};

const StarRating = ({ count }: { count: number }) => {
	return (
		<div className={scss.starRating}>
			{[...Array(count)].map((_, index) => (
				<FaStar key={index} className={scss.star} />
			))}
		</div>
	);
};

export default TrafficCard;
