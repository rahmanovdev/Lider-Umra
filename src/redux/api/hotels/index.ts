import { api as index } from '..';
import { Package } from '../tour-details/types';
import { HOTEL } from './types';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
	endpoints: build => ({
		getHotels: build.query<
			HOTEL.GetHotelsResponse,
			{ category?: Package.CategoryPackage }
		>({
			query: () => ({
				url: `${ENDPOINTS}/tour/hotels/`,
				method: 'GET'
			}),
			providesTags: ['hotels'],
			transformResponse(response: HOTEL.GetHotelsResponse, meta, { category }) {
				return response.filter(v => {
					if (
						category &&
						v.category.id === category.id &&
						v.category.name === category.name
					) {
						return true;
					}
					return false;
				});
			}
		}),
		getHotelsByCity: build.query<HOTEL.IHotel[], string>({
			query: city => ({
				url: `${ENDPOINTS}/tour/hotels/?city=${city}`,
				method: 'GET'
			}),
			providesTags: ['hotels']
		})
	})
});

export const { useGetHotelsQuery, useGetHotelsByCityQuery } = api;
