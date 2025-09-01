import { api as index } from '..';

const api = index.injectEndpoints({
   endpoints: build => ({
      getAjy: build.query<TOURS.GetTourAjyResponse, void>({
         query: () => ({
            url: `/tour/ajy`,
            method: 'GET',
         }),
         providesTags: ['ajy'],
      }),
   }),
});

export const { useGetAjyQuery } = api;
