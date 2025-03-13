import { Metadata } from 'next';
import { APP_URL } from './url.constants';

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } };

export const SITE_NAME = 'Lider-Umra';
export const SHORT_NAME = 'Lider-Umra';

export const SITE_DESCRIPTION = 'Lider-Umra';

export const SITE_KEYWORDS = ['Lider-Umra'];

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
   creator: '',
   publisher: '',
   icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
   },
   openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      type: 'website',
      emails: [],
      locale: 'ru_RU',
      images: [
         {
            url: '/logo.png',
            width: '192',
            height: '192',
            alt: SITE_NAME,
         },
      ],
      ...(APP_URL ? { url: new URL(APP_URL) } : {}),
   },
   twitter: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
         {
            url: '/logo.png',
            width: '192',
            height: '192',
            alt: SITE_NAME,
         },
      ],
   },
};
