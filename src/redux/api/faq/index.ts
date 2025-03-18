import { api } from '..';

const faqApi = api.injectEndpoints({
   endpoints: build => ({
      getFaqs: build.query<FAQ.ITEM[], void>({
         query: () => ({
            url: `/blog/faq/`,
         }),
      }),
   }),
});

export const { useGetFaqsQuery } = faqApi;
