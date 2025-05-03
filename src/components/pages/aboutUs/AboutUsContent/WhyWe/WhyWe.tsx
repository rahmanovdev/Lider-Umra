'use client';
import React from 'react';
import scss from './WhyWe.module.scss';
import Image from 'next/image';
import { useTimeLine } from '@/hooks/use-time-line';
import { motion } from 'framer-motion';

const Whywe = () => {
  const { containerRef, height, heightTransform, ref, activeSections } = useTimeLine();

  return (
    <section className={scss.whywe}>
      <div className={`${scss.container} container`}>
        <h2>Что нас отличает от других компаний?</h2>
        <div className={scss['content']}>
          <figure className={scss['figure']}>
            <Image
              width={490}
              height={650}
              src='/assets/images/about-page-advantages.jpg'
              alt='about-page-advantages.jpg'
            />
          </figure>
          <div className={scss.wrapper} ref={containerRef}>
            <div ref={ref} className={scss.timelineContainer}>
              {packages.map((item, index) => (
                <div
                  key={index}
                  className={`${index === 0 && scss.isFirst} ${scss.timelineEntry}`}
                >
                  <div className={scss.timelineMark} data-timeline-mark>
                    <div
                      className={`${scss.markCircleOuter} ${
                        activeSections.includes(index) && scss.active
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className={scss.contentWrapper}>
                    <h3 className={scss.markTitle}>{item.title}</h3>
                    {item.content}
                  </div>
                </div>
              ))}
              <div
                style={{
                  height: height + 'px'
                }}
                className={scss.timelineLine}
              >
                <motion.div
                  style={{
                    height: heightTransform
                  }}
                  className={scss.timelineProgress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const packages = [
  {
    title: 'Работаем с 2006 года',
    content: 'Один из самых первых и крупных Хадж/Умра операторов России'
  },
  {
    title: 'Более 30 сотрудников в Саудовской Аравии',
    content: 'Мы - компания с круглогодичным постоянным персоналом в Саудовской Аравии'
  },
  {
    title: 'Еженедельные вылеты',
    content: 'Работаем по всей России, принимаем граждан любых стран'
  },
  {
    title: 'Программы на любой бюджет',
    content: 'Всё включено, Комфорт, Премиум, Люкс'
  },
  {
    title: 'Отличный сервис',
    content: 'Только хорошие отели и новые автобусы вне зависимости от выбранной программы'
  },
  {
    title: 'Питание',
    content: 'Завтрак и ужин - шведский стол во всех программах'
  },
  {
    title: 'Круглосуточный автобус',
    content: 'От отеля до мечети Аль-Харам курсирует бесплатный трансфер 24 часа в сутки каждые 20 минут'
  },
  {
    title: 'Радиогид',
    content: 'Все экскурсии и коллективные молитвы с радиогидом – специальные наушники, с помощью которых паломники слышат гида до 100 метров'
  },
  {
    title: 'Ежедневная и насыщенная программа',
    content: 'Экскурсии, лекции, дополнительные групповые Тавафы'
  },
  {
    title: 'Совершение Умры 5 раз за одну поездку',
    content: 'С вывозом паломников до разных микатов (границ, где входят в состояние ихрама для совершения Умры) за счет компании'
  },
  {
    title: 'Удобная оплата',
    content: 'Наличными в офисе компании, банковским переводом, банковской картой на сайте'
  },
  {
    title: 'Подарки',
    content: 'Фирменный рюкзак, книга, антисептик для рук (подходит для ихрама), бейджик, вода Зам-Зам'
  }
];

export default Whywe;