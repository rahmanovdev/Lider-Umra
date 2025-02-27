'use client';
import AboutCards from '@/components/common/cards/about_cards/AboutCards';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BgOrnament from '../../../../../public/assets/images/bg_ornament.svg';
import lamp from '../../../../../public/assets/images/lamp.svg';
import scss from './AboutSection.module.scss';

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
                              __html: t('about.title'),
                           }}
                        />
                        <p>{t('descriptions.base')}</p>
                     </div>
                     <button>узнать больше</button>

                     <div className={scss.tags}>
                        <div className={scss.tag_top}>
                           <h5>{t('about.tags.prayer')}</h5>
                           <h5>{t('about.tags.umrah')}</h5>
                           <h5>{t('about.tags.purity')}</h5>
                        </div>
                        <div className={scss.tag_bottom}>
                           <h5>{t('about.tags.faith')}</h5>
                           <h5>{t('about.tags.quran')}</h5>
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
