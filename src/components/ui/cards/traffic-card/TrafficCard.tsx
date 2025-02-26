'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import scss from './TrafficCard.module.scss';
import { FaStar } from 'react-icons/fa';

type TProps = {
  tour: TOURS.ITourPackages;
};

const TrafficCard: React.FC<TProps> = ({ tour }) => {
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
      'декабря',
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div className={scss.Main}>
      <h2>{tour.category.name}</h2>
      <div className={scss.data_block}>
        <p>
          от <span>{formatDate(tour.tour_date.start_tour)}</span>
        </p>
        <div className={scss.line}></div>
        <p>
          до <span>{formatDate(tour.tour_date.end_tour)}</span>
        </p>
      </div>
      <div className={scss.img_block}>
        <Image src={tour.image} alt={tour.name} width={700} height={300} />
      </div>
      <div className={scss.card_container}>
        <div className={scss.line}>
          <h4>Ажы башчы: </h4>
          <h5>{tour.ajy.name}</h5>
        </div>
        <hr className={scss.divider} />
        <div className={scss.line}>
          <h4>Категория:</h4>
          <h5>{tour.category.name}</h5>{' '}
          {/* Категориянын аты кошуу (мисалы, "Стандарт") */}
        </div>
        <hr className={scss.divider} />
        <div className={scss.line}>
          <h4>Колличество:</h4>
          <h5>{tour.available_seats} мест</h5>
        </div>
        <hr className={scss.divider} />
        <div className={scss.line}>
          <h4>Длительность:</h4>
          <h5>{tour.tour_date.duration} дней</h5>
        </div>
        <hr className={scss.divider} />
        <div className={scss.line}>
          <h4>Категория отеля</h4>
          <StarRating count={4} />{' '}
          {/* Бул жерде категорияны турдун category.name менен алмаштыруу мүмкүн, эгер керек болсо */}
        </div>
        <hr className={scss.divider} />
      </div>
      <div className={scss.link}>
        <Link href={`/packages/${tour.id}`}>Подробнее</Link>
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
