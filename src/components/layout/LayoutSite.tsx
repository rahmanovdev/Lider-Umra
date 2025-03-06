'use client';
import Header from './header/Header';
import Footer from './footer/Footer';
import scss from './LayoutSite.module.scss';
import { useSize } from '@/hooks/use-size';

const LayoutSite: React.FC<React.PropsWithChildren> = ({ children }) => {
   const size = useSize('#header');
   return (
      <div suppressHydrationWarning className={scss.LayoutSite}>
         <Header />
         <main suppressHydrationWarning style={{ marginTop: size?.height }}>
            {children}
         </main>
         <Footer />
      </div>
   );
};

export default LayoutSite;
