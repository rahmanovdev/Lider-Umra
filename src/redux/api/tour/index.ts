import { api as index } from '..';


const api = index.injectEndpoints({
	endpoints: build => ({
		getTours: build.query<TOURS.GetTourPackagesResponse, void>({
			query: () => ({
				url: `/tour/packages`,
				method: 'GET'
			}),
			providesTags: ['tours']
		}),
		getTourById: build.query<TOURS.ITourPackages, number>({
			query: id => ({
				url: `/tour/packages/${id}/`,
				method: 'GET'
			}),
			providesTags: ['tours']
		})
	})
});

export const { useGetToursQuery, useGetTourByIdQuery } = api;
