import { api as index } from '..';
import { CLIENT } from './types';


const api = index.injectEndpoints({
  endpoints: build => ({
    createClient: build.mutation<
      CLIENT.CreateClientResponse,
      CLIENT.CreateClientRequest
    >({
      query: clientData => ({
        url: `/crm/clients/`,
        method: 'POST',
        body: clientData,
      }),
      invalidatesTags: ['clients'],
    }),
  }),
});

export const { useCreateClientMutation } = api;
