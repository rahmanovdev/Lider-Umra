import './styles/reset.scss';
import './styles/globals.scss';
import './styles/variables.scss';

import { Inter, Montserrat } from 'next/font/google';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { RootProvider } from '@/providers';
import { APP_URL } from '@/constants/url.constants';
import { SITE_KEYWORDS, SITE_NAME } from '@/constants/seo.constants';
const AppUrl = APP_URL ? new URL(APP_URL) : null;

export const generateMetadata = async () => {
   const locale = await getLocale();
   const t = await getTranslations();

   return {
      title: {
         absolute: SITE_NAME,
         template: `%s - ${SITE_NAME}`,
      },
      description: t('descriptions.base'),
      metadataBase: AppUrl,
      applicationName: SITE_NAME,
      keywords: SITE_KEYWORDS,
      generator: 'Next.js',
      creator: 'Лидер Умра',
      publisher: 'Лидер Умра',
      robots: {
         index: true,
         follow: true,
         googleBot: { index: true, follow: true },
      },
      icons: {
         icon: `${AppUrl}/logo.png`,
         shortcut: `${AppUrl}/logo.png`,
         apple: `${AppUrl}/logo.png`,
      },
      openGraph: {
         title: SITE_NAME,
         description: t('descriptions.base'),
         type: 'website',
         emails: [],
         locale: locale === 'ru' ? 'ru_RU' : 'kg_KG',
         images: [
            {
               url: `${AppUrl}/logo.png`,
               width: '192',
               height: '192',
               alt: 'Лидер Умра - Меккеге Зыярат',
            },
            {
               url: `${AppUrl}/logo.png`,
               width: 1200,
               height: 630,
               alt: 'Лидер Умра - Меккеге Зыярат',
            },
         ],
         ...(APP_URL ? { url: new URL(APP_URL) } : {}),
      },
      twitter: {
         title: SITE_NAME,
         description: t('descriptions.base'),
         images: [
            {
               url: `${AppUrl}/logo.png`,
               width: '192',
               height: '192',
               alt: 'Лидер Умра - Меккеге Зыярат',
            },
            {
               url: `${AppUrl}/logo.png`,
               width: 1200,
               height: 630,
               alt: 'Лидер Умра - Меккеге Зыярат',
            },
         ],
         ...(APP_URL ? { url: new URL(APP_URL) } : {}),
      },
   };
};

const interSans = Inter({
   variable: '--font-inter',
   subsets: ['latin'],
});

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
         <body className={`${interSans.variable}  ${montserrat.variable}`}>
            <div className='wrapper'>
               <NextIntlClientProvider messages={messages}>
                  <RootProvider>{children}</RootProvider>
               </NextIntlClientProvider>
            </div>
         </body>
      </html>
   );
}
