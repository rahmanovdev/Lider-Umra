import { api as index } from '..';
import { Package } from '../tour-details/types';
import { HOTEL } from './types';

const api = index.injectEndpoints({
   endpoints: build => ({
      getHotels: build.query<
         HOTEL.GetHotelsResponse,
         { category?: Package.CategoryPackage }
      >({
         query: () => ({
            url: `/tour/hotels/`,
            method: 'GET',
         }),
         providesTags: ['hotels'],
         transformResponse(
            response: HOTEL.GetHotelsResponse,
            meta,
            { category },
         ) {
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
         },
      }),
      getHotelsByCity: build.query<HOTEL.IHotel[], string>({
         query: city => ({
            url: `/tour/hotels/?city=${city}`,
            method: 'GET',
         }),
         providesTags: ['hotels'],
      }),
   }),
});

export const { useGetHotelsQuery, useGetHotelsByCityQuery } = api;
