import { api as index } from '..';
import { HOTEL } from './types';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: build => ({
    getHotels: build.query<HOTEL.GetHotelsResponse, void>({
      query: () => ({
        url: `${ENDPOINTS}/tour/hotels/`,
        method: 'GET'
      }),
      providesTags: ['hotels']
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
