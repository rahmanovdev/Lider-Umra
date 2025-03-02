import UsefulinfoContentDetail from '@/components/pages/usefulinfo/UsefulinfoContentDetail/UsefulinfoContentDetail';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { API_URL } from '@/constants/url.constants';

export async function generateMetadata({
   params,
}: {
   params: { id: string };
}): Promise<Metadata> {
   console.log(params);

   const t = await getTranslations('');
   try {
      const response = await fetch(`${API_URL}//blog/blogs/${params.id}`);
      const data = await response.json();
      console.log(data, 'DATA')
      return {
         title: (t.raw('seo.usefullinfoDetail.title') as string).replace(
            '{title}',
            data.name,
         ),
         description: (t.raw('descriptions.base') as string).replace(
            '{title}',
            data.name,
         ),
         openGraph: {
            title: (t.raw('seo.usefullinfoDetail.title') as string).replace(
               '{title}',
               data.name,
            ),
            description: (t.raw('descriptions.base') as string).replace(
               '{title}',
               data.name,
            ),
         },
      };
   } catch (err) {
      console.log(err, "ERROR")
      return {
         title: t.raw('seo.usefullinfoDetail.title'),
         description: t.raw('descriptions.base'),
         openGraph: {
            title: t.raw('seo.usefullinfoDetail.title'),
            description: t.raw('descriptions.base'),
         },
      };
   }
}

export default UsefulinfoContentDetail;
