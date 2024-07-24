import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagingResults, Result } from '@models/result.model';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getItems: builder.query<PagingResults, { page: string | null; searchQuery: string | null }>({
      query: ({ page, searchQuery }) => {
        const queryParams = new URLSearchParams();

        if (page) {
          queryParams.set('page', page);
        }

        if (searchQuery) {
          queryParams.set('name', searchQuery);
        }

        return `/character${page || searchQuery ? '?' : ''}${queryParams}`;
      },
    }),
    getItemDetails: builder.query<Result, string | null>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemDetailsQuery } = apiSlice;
