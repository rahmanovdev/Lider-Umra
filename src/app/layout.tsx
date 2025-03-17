import './styles/reset.scss';
import './styles/globals.scss';
import './styles/variables.scss';

import { Inter, Montserrat } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { BASE_SEO_METADATA } from '@/constants/seo.constants';
import { RootProvider } from '@/providers';

export const generateMetadata = async () => {
   const locale = await getLocale()
   return BASE_SEO_METADATA(locale);
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
