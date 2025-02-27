'use client';
import { FC, ReactNode } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import scss from './LayoutSite.module.scss';
import { useSize } from '@/hooks/use-size';
import SubmitRequest from '../common/submit-request/SubmitRequest';

interface LayoutSiteProps {
   children: ReactNode;
}
const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
   const size = useSize('#header');

   return (
      <div suppressHydrationWarning className={scss.LayoutSite}>
         <SubmitRequest />
         <Header />
         <main suppressHydrationWarning style={{ marginTop: size?.height }}>
            {children}
         </main>
         <Footer />
      </div>
   );
};

export default LayoutSite;
