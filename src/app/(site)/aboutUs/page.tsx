import AboutUsPage from '@/components/pages/AboutUsPage';
import { APP_URL } from '@/constants/url.constants'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export const metadata = async (): Promise<Metadata> => {
   const t = await getTranslations('');
   return {
      title: t.raw('seo.aboutUs.title'),
      description: t.raw('descriptions.base'),
      openGraph: {
         title: t.raw('seo.aboutUs.title'),
         description: t.raw('descriptions.base'),
      },
      alternates: {
         canonical: `${APP_URL}/aboutUs`,
      },
   };
};

const page = () => <AboutUsPage />;

export default page;
