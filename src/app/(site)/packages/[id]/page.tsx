import PackegesDetailContent from '@/components/pages/packages/PackegesDetailContent/PackegesDetailContent';
import { API_URL } from '@/constants/url.constants';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
   params,
}: {
   params: { id: string };
}): Promise<Metadata> {
   console.log(params);

   const t = await getTranslations('');
   try {
      const response = await fetch(`${API_URL}/tour/packages/${params.id}/`);
      const data = await response.json();
      return {
         title: (t.raw('seo.packageDetail.title') as string).replace(
            '{title}',
            data.name,
         ),
         description: (t.raw('descriptions.base') as string).replace(
            '{title}',
            data.name,
         ),
         openGraph: {
            title: (t.raw('seo.packageDetail.title') as string).replace(
               '{title}',
               data.name,
            ),
            description: (t.raw('descriptions.base') as string).replace(
               '{title}',
               data.name,
            ),
         },
      };
   } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
         title: t.raw('seo.packageDetail.title'),
         description: t.raw('descriptions.base'),
         openGraph: {
            title: t.raw('seo.packageDetail.title'),
            description: t.raw('descriptions.base'),
         },
      };
   }
}

export default PackegesDetailContent;
