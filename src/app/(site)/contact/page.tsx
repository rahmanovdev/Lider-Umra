import ContactPage from '@/components/pages/contact/ContactPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata = async (): Promise<Metadata> => {
   const t = await getTranslations('seo.contact');
   return {
      title: t.raw('title'),
      description: t.raw('description'),
      openGraph: {
         title: t.raw('title'),
         description: t.raw('description'),
      },
   };
};

export default ContactPage;
