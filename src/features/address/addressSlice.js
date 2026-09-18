import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API,
    }),
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => `/address/provinces`,
            keepUnusedDataFor: 10,
        }),

        getProvinceById: build.query({
            query: (id) => `/address/provinces/${id}`,
        }),
    }),
});

export const { useGetProvincesQuery, useGetProvinceByIdQuery } = addressApi;
