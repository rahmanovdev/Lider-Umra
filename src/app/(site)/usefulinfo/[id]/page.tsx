import UsefulinfoContentDetail from '@/components/pages/usefulinfo/UsefulinfoContentDetail/UsefulinfoContentDetail';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { APP_URL } from '@/constants/url.constants';
import { getBlogs } from '@/app/sitemap';

export async function generateMetadata(props: {
   params: Promise<{ id: string }>;
}): Promise<Metadata> {
   const params = await props.params;
   const t = await getTranslations('');
   const defaultTitle = t.raw('seo.usefullinfoDetail.title');
   const defaultDescription = t.raw('descriptions.base');

   try {
      const data = (await getBlogs()) as { id: number; title: string }[];
      const current = data?.find(v => v.id === parseInt(params.id));

      if (!current?.title) {
         throw new Error('Invalid data format');
      }

      const title = defaultTitle.replace('{title}', current.title);
      const description = defaultDescription.replace('{title}', current.title);

      return {
         title,
         description,
         openGraph: { title, description },
         alternates: {
            canonical: `${APP_URL}/usefulinfo/${params.id}`,
         },
      };
   } catch (error) {
      console.error('Metadata fetch error:', error);

      return {
         title: defaultTitle,
         description: defaultDescription,
         openGraph: { title: defaultTitle, description: defaultDescription },
         alternates: {
            canonical: `${APP_URL}/usefulinfo/${params.id}`,
         },
      };
   }
}

export default UsefulinfoContentDetail;
