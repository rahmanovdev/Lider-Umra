import { Metadata } from 'next';
import { APP_URL } from './url.constants';

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } };

export const SITE_NAME = 'Лидер Умра';
export const SHORT_NAME = 'Лидер Умра';

export const SITE_DESCRIPTION =
   'Лидер Умра - ваш надежный партнер в совершении Умры. Мы предлагаем лучшие условия и поддержку для паломников.';

export const SITE_KEYWORDS = [
   'Лидер Умра',
   'Умра',
   'паломничество',
   'путешествия в Мекку',
   'религиозные туры',
   'паломники',
   'Умра 2023',
   'лучшие предложения Умра',
];

export const BASE_SEO_METADATA: Metadata = {
   title: {
      absolute: SITE_NAME,
      template: `%s - ${SITE_NAME}`,
   },
   description: SITE_DESCRIPTION,
   metadataBase: APP_URL ? new URL(APP_URL) : null,
   applicationName: SITE_NAME,
   keywords: SITE_KEYWORDS,
   generator: 'Next.js',
   creator: 'Ваше Имя',
   publisher: 'Лидер Умра',
   icons: {
      icon: '/logo.svg',
      shortcut: '/logo.svg',
      apple: '/logo.svg',
   },
   openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      type: 'website',
      emails: [],
      locale: 'kg_KG',
      images: [
         {
            url: '/logo.svg',
            width: '192',
            height: '192',
            alt: 'Лидер Умра - Паломничество в Мекку',
         },
      ],
      ...(APP_URL ? { url: new URL(APP_URL) } : {}),
   },
   twitter: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
         {
            url: '/logo.svg',
            width: '192',
            height: '192',
            alt: 'Лидер Умра - Паломничество в Мекку',
         },
      ],
   },
};
