import { api } from '..';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const faqApi = api.injectEndpoints({
	endpoints: build => ({
		getFaqs: build.query<FAQ.ITEM[], void>({
			query: () => ({
				url: `/${ENDPOINTS}/blog/faq/`
			})
		})
	})
});

export const { useGetFaqsQuery } = faqApi;
