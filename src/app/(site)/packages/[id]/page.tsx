import { getPackages } from '@/app/sitemap';
import PackegesDetailContent from '@/components/pages/packages/PackegesDetailContent/PackegesDetailContent';
import { APP_URL } from '@/constants/url.constants';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const revalidate = 10;

export async function generateMetadata(props: {
   params: Promise<{ id: string }>;
}): Promise<Metadata> {
   const params = await props.params;
   const t = await getTranslations('');
   const defaultTitle = t.raw('seo.packageDetail.title');
   const defaultDescription = t.raw('descriptions.base');

   try {
      const data = (await getPackages()) as TOURS.ITourPackages[];
      const current = data?.find(v => v.id === parseInt(params.id));

      if (!current?.name) {
         throw new Error('Некорректные данные от API');
      }

      const title = defaultTitle.replace('{title}', current.name);
      const description = defaultDescription.replace('{title}', current.name);

      return {
         title,
         description,
         openGraph: { title, description },
         alternates: {
            canonical: `${APP_URL}/packages/${params.id}`,
         },
      };
   } catch (error) {
      console.error('Ошибка загрузки метаданных:', error);

      return {
         title: defaultTitle,
         description: defaultDescription,
         openGraph: { title: defaultTitle, description: defaultDescription },
         alternates: {
            canonical: `${APP_URL}/packages/${params.id}`,
         },
      };
   }
}

export default PackegesDetailContent;
