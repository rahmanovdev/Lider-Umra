'use client';
import Image from 'next/image';
import React from 'react';
import scss from './AboutCards.module.scss';
import { useTranslations } from 'next-intl';
import { Assets } from '@/assets';

const AboutCards = () => {
   const t = useTranslations();
   const cards = t.raw('about.cards') as {
      title: string;
      description: string;
   }[];

   return (
      <div className={scss.about_bottom}>
         <div className={scss.about_cards}>
            {cards.map((card, index) => (
               <div key={index + card.title} className={scss[`card${index + 1}`]}>
                  <div className={scss.card_top}>
                     <Image
                        src={Assets.Icons.AboutCard[index]}
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
                     src={Assets.Images.CardEmblem}
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
