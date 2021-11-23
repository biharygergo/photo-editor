import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type Image = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

// Define a service using a base URL and expected endpoints
export const picsumApi = createApi({
  reducerPath: "picsumApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://picsum.photos/v2/" }),
  endpoints: (builder) => ({
    getPictures: builder.query<Image[], number | void>({
      query: (page = 1) => `list/?limit=6&page=${page}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPicturesQuery } = picsumApi;
