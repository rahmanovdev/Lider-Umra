import { API_URL } from '@/constants/url.constants';
import { COOKIE_NAME } from '@/utils/i18n/config';
import {
   BaseQueryFn,
   createApi,
   fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const Language = Cookies.get(COOKIE_NAME);
const Endpoint = Language == 'kg' ? '' : '/ru';

const baseQuery = fetchBaseQuery({
   baseUrl: API_URL + `${Endpoint}/api`,
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
   tagTypes: ['tours', 'ajy', 'packageDetails', 'hotels', 'blogs', 'clients'],
   endpoints: () => ({}),
});
