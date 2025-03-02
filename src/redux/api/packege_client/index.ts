import { api as index } from '..';
import { CLIENT } from './types';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: build => ({
    createClient: build.mutation<
      CLIENT.CreateClientResponse,
      CLIENT.CreateClientRequest
    >({
      query: clientData => ({
        url: `${ENDPOINTS}/crm/clients/`,
        method: 'POST',
        body: clientData,
      }),
      invalidatesTags: ['clients'], // Кэшти жаңыртуу үчүн
    }),
  }),
});

export const { useCreateClientMutation } = api;
