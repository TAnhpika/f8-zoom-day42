import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API,
    }),
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => `/address/provinces`,
        }),
        
        getProvinceById: build.query({
            query: (id) => `/address/provinces/${id}`,
        }),
    }),
    refetchOnFocus: true
});

export const { useGetProvincesQuery , useGetProvinceByIdQuery} = addressApi;
