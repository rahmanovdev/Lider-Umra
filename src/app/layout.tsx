import './styles/reset.scss';
import './styles/globals.scss';
import './styles/variables.scss';

import { Inter, Montserrat } from 'next/font/google';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { RootProvider } from '@/providers';
import { APP_URL } from '@/constants/url.constants';
import { SITE_KEYWORDS, SITE_NAME } from '@/constants/seo.constants';
import { Metadata } from 'next';

const AppUrl = APP_URL ? new URL(APP_URL) : null;

export const generateMetadata = async (): Promise<Metadata> => {
   const locale = await getLocale();
   const t = await getTranslations();

   return {
      title: SITE_NAME,
      description: t('descriptions.base'),
      metadataBase: AppUrl,
      applicationName: SITE_NAME,
      keywords: SITE_KEYWORDS,
      generator: 'iant.kg',
      creator: 'Лидер Умра',
      publisher: 'Лидер Умра',
      alternates: { canonical: `${APP_URL}` },
      icons: [
         { type: 'image/png', url: '/seo/favicon-16x16.png', sizes: '16x16' },
         { type: 'image/png', url: '/seo/favicon-32x32.png', sizes: '32x32' },
         { type: 'icon', url: '/seo/favicon.ico', sizes: '32x32' },
         {
            type: 'image/png',
            url: '/seo/apple-touch-icon.png',
            sizes: '180x180',
         },
         { type: 'image/png', url: '/seo/favicon.png', sizes: 'any' },
         {
            type: 'image/png',
            url: '/seo/android-chrome-192x192.png',
            sizes: '192x192',
         },
         {
            type: 'image/png',
            url: '/seo/android-chrome-512x512.png',
            sizes: '512x512',
         },
      ],
      openGraph: {
         title: SITE_NAME,
         description: t('descriptions.base'),
         type: 'website',
         url: `${APP_URL}`,
         siteName: 'Лидер Умра',
         locale: locale === 'ru' ? 'ru_RU' : 'kg_KG',
         countryName: 'Kyrgyzstan',
         images: [
            { url: '/seo/android-chrome-192x192.png', width: 192, height: 192 },
            { url: '/seo/android-chrome-512x512.png', width: 512, height: 512 },
            { url: '/seo/apple-touch-icon.png', width: 180, height: 180 },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: SITE_NAME,
         description: t('descriptions.base'),
         images: [
            { url: '/seo/android-chrome-192x192.png', width: 192, height: 192 },
            { url: '/seo/android-chrome-512x512.png', width: 512, height: 512 },
         ],
      },
      robots: {
         index: true,
         follow: true,
         'max-snippet': -1,
         'max-image-preview': 'large',
         'max-video-preview': -1,
      },
      other: {
         'theme-color': '#ffffff',
         'msapplication-TileColor': '#ffffff',
         'msapplication-TileImage': '/seo/android-chrome-192x192.png',
      },
   };
};

const interSans = Inter({ variable: '--font-inter', subsets: ['latin'] });
const montserrat = Montserrat({
   variable: '--font-montserrat-sans',
   subsets: ['latin'],
});

export default async function RootLayout({
   children,
}: Readonly<React.PropsWithChildren>) {
   const locale = await getLocale();
   const messages = await getMessages();

   return (
      <html lang={locale} suppressHydrationWarning>
         <head>
            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'https://schema.org',
                     '@type': 'WebSite',
                     name: SITE_NAME,
                     url: APP_URL,
                     publisher: {
                        '@type': 'Organization',
                        name: 'Лидер Умра',
                        logo: {
                           '@type': 'ImageObject',
                           url: `${APP_URL}/seo/android-chrome-192x192.png`,
                        },
                     },
                  }),
               }}
            />
         </head>
         <body className={`${interSans.variable} ${montserrat.variable}`}>
            <div className='wrapper'>
               <NextIntlClientProvider messages={messages}>
                  <RootProvider>{children}</RootProvider>
               </NextIntlClientProvider>
            </div>
         </body>
      </html>
   );
}
