import { Metadata } from 'next';
import { APP_URL } from './url.constants';

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } };

export const SITE_NAME = 'Lider-Umra';
export const SHORT_NAME = 'Lider-Umra';

export const SITE_DESCRIPTION = 'Lider-Umra';

export const SITE_KEYWORDS = ['Lider-Umra'];

export const BASE_SEO_METADATA = (locale: string): Metadata => ({
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
      icon: '/logo.svg',
      shortcut: '/logo.svg',
      apple: '/logo.svg',
   },
   openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      type: 'website',
      emails: [],
      locale: locale === 'kg' ? 'kg_KG' : 'ru_RU',
      images: [
         {
            url: '/logo.svg',
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
            url: '/logo.svg',
            width: '192',
            height: '192',
            alt: SITE_NAME,
         },
      ],
   },
});
