'use client';
import AboutCards from '@/components/common/cards/about_cards/AboutCards';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import scss from './AboutSection.module.scss';
import Link from 'next/link';
import { Assets } from '@/assets'

const AboutSection = () => {
   const t = useTranslations();

   return (
      <div className={scss.AboutSection}>
         <div className='container'>
            <div className={scss.content}>
               <div className={scss.about_top}>
                  <div className={scss.about_texts}>
                     <div className={scss.title}>
                        <h1
                           dangerouslySetInnerHTML={{
                              __html: t.raw('about.title'),
                           }}
                        />
                        <p>{t('descriptions.base')}</p>
                     </div>
                     <Link className={scss.more} href='/aboutUs'>
                        узнать больше
                     </Link>

                     <div className={scss.tags}>
                        <div className={scss.tag_top}>
                           <span>{t('about.tags.prayer')}</span>
                           <span>{t('about.tags.umrah')}</span>
                           <span>{t('about.tags.purity')}</span>
                        </div>
                        <div className={scss.tag_bottom}>
                           <span>{t('about.tags.faith')}</span>
                           <span>{t('about.tags.quran')}</span>
                        </div>
                     </div>
                  </div>
                  <div className={scss.about_video}>
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
                  src={Assets.Images.About.Ornament}
                  alt='Ornament_bg'
                  width={700}
                  height={500}
                  quality={70}
                  priority
               />

               <Image
                  className={scss.lamp_element}
                  src={Assets.Images.Lamp}
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
