'use client';
import { Assets } from '@/assets';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import scss from './AboutUsImage.module.scss';

const localImages = Assets.Images.About.Galleries;

const AboutUsImages = () => {
   const t = useTranslations('aboutUs');
   const [showImages, setShowImages] = useState<boolean[]>(
      Array(6).fill(false),
   );

   useEffect(() => {
      const delays = [2000, 3000, 4000, 2500, 3500, 4500];

      delays.forEach((delay, index) => {
         setTimeout(() => {
            setShowImages(prev => {
               const updated = [...prev];
               updated[index] = true;
               return updated;
            });
         }, delay);
      });
   }, []);

   return (
      <section className={scss.photos_anim_block}>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.photos_anim_inner}>
                  {showImages[0] && (
                     <div className={scss.firstIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[0]}
                           alt={'IMAGE '}
                           width={320}
                           height={500}
                           loading='lazy'
                        />
                     </div>
                  )}
                  {showImages[3] && (
                     <div className={scss.forthIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[3]}
                           alt={'IMAGE '}
                           width={260}
                           height={300}
                           loading='lazy'
                        />
                     </div>
                  )}
                  {showImages[1] && (
                     <div className={scss.secIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[1]}
                           alt={'IMAGE '}
                           width={350}
                           height={450}
                           loading='lazy'
                        />
                     </div>
                  )}
                  {showImages[4] && (
                     <div className={scss.fifthIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[4]}
                           alt={'IMAGE '}
                           width={350}
                           height={450}
                           loading='lazy'
                        />
                     </div>
                  )}
                  {showImages[2] && (
                     <div className={scss.thirdIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[2]}
                           alt={'IMAGE '}
                           width={260}
                           height={300}
                           loading='lazy'
                        />
                     </div>
                  )}
                  {showImages[5] && (
                     <div className={scss.sixthIm}>
                        <Image
                           className={scss.photos_anim}
                           src={localImages[5]}
                           alt={'IMAGE '}
                           width={320}
                           height={500}
                           loading='lazy'
                        />
                     </div>
                  )}
               </div>
               <div className={scss.link_photo}>
                  <Link href='/gallery'>
                     {t('allGallery')}
                     <GoArrowRight className={scss.icon} />
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AboutUsImages;
