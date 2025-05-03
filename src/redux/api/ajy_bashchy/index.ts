import { api as index } from '..';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
	endpoints: build => ({
		getAjy: build.query<TOURS.GetTourAjyResponse, void>({
			query: () => ({
				url: `${ENDPOINTS}/tour/ajy`,
				method: 'GET'
			}),
			providesTags: ['ajy']
		})
	})
});

export const { useGetAjyQuery } = api;
