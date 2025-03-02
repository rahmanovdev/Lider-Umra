import { API_URL } from '@/constants/url.constants'
import {
   BaseQueryFn,
   createApi,
   fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
   baseUrl: API_URL,
   credentials: 'include',
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
   const result = await baseQuery(args, api, extraOptions);
   return result;
};

export const api = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryExtended,
   refetchOnFocus: true,
   refetchOnReconnect: true,
   tagTypes: ['tours', 'ajy', 'packageDetails', 'hotels', 'blogs'],
   endpoints: () => ({}),
});
