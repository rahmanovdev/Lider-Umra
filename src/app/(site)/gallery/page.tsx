import GalleryPage from '@/components/pages/GalleryPage';
import { APP_URL } from '@/constants/url.constants'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata = async (): Promise<Metadata> => {
   const t = await getTranslations('');
   return {
      title: t.raw('seo.gallery.title'),
      description: t.raw('descriptions.base'),
      openGraph: {
         title: t.raw('seo.gallery.title'),
         description: t.raw('descriptions.base'),
      },
      alternates: {
         canonical: `${APP_URL}/gallery`,
      },
   };
};

export default GalleryPage;
