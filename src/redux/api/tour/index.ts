import { api as index } from '..';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
	endpoints: build => ({
		getTours: build.query<TOURS.GetTourPackagesResponse, void>({
			query: () => ({
				url: `${ENDPOINTS}/tour/packages`,
				method: 'GET'
			}),
			providesTags: ['tours']
		}),
		getTourById: build.query<TOURS.ITourPackages, number>({
			query: id => ({
				url: `${ENDPOINTS}/tour/packages/${id}/`,
				method: 'GET'
			}),
			providesTags: ['tours']
		})
	})
});

export const { useGetToursQuery, useGetTourByIdQuery } = api;
