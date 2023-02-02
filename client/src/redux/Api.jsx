import {
  buildCreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => (
    {
      getCards: builder.query({
        query: () => "/tasks",
        providesTags: ["Tasks"],
        transformResponse: (response) =>
          response.sort((a, b) => a.capacity - b.capacity),
        // response.filter((e) => e.capacity === "1"),
      }),
      invalidatesTags: ["Tasks"],
    },
    // PRUEBAS JOEL
    {
      getPropertys: builder.query({
        query: () => "/property/getproperty",
      }),
    }
  ),
});

export const { useGetCardsQuery, useGetPropertysQuery } = apiSlice;
