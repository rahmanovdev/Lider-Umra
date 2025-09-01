'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import scss from '../HeadPackegeDet.module.scss';
import { Modal } from '../../components/shared/Modal';
import CImage from '@/components/ui/cimage/CImage'

interface LeaderSectionProps {
   ajy: { name: string; image: string; bio: string };
   t: (key: string) => string;
   isModalOpen: boolean;
   setIsModalOpen: (value: boolean) => void;
}

const LeaderSection: React.FC<LeaderSectionProps> = memo(
   ({ ajy, t, isModalOpen, setIsModalOpen }) => {
      const bioContentRef = useRef<HTMLDivElement>(null);
      const [showReadMore, setShowReadMore] = useState(false);

      useEffect(() => {
         const checkOverflow = () => {
            if (bioContentRef.current) {
               setShowReadMore(
                  bioContentRef.current.scrollHeight >
                     bioContentRef.current.clientHeight,
               );
            }
         };

         checkOverflow();
         window.addEventListener('resize', checkOverflow);
         return () => window.removeEventListener('resize', checkOverflow);
      }, [ajy.bio]);

      return (
         <>
            <div className={scss.leader_container}>
               <div className={scss.leader_header}>
                  <h3>{t('leader')}</h3>
               </div>
               <div className={scss.leader_content}>
                  <div className={scss.leader_image}>
                     <CImage
                        src={ajy.image}
                        alt={ajy.name}
                        width={300}
                        height={300}
                        loading='lazy'
                        sizes='(max-width: 768px) 100vw, 300px'
                     />
                  </div>
                  <div className={scss.leader_info}>
                     <h4>{ajy.name}</h4>
                     <div className={scss.bio_container}>
                        <div
                           ref={bioContentRef}
                           className={scss.bio_content}
                           dangerouslySetInnerHTML={{ __html: ajy.bio }}
                        />
                        {showReadMore && (
                           <button
                              className={scss.readMore}
                              onClick={() => setIsModalOpen(true)}
                           >
                              {t('readMore')}
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <Modal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               title={ajy.name}
               content={ajy.bio}
            />
         </>
      );
   },
);

LeaderSection.displayName = 'LeaderSection';
export default LeaderSection;
