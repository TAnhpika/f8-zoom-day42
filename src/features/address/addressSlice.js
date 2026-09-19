import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/store/baseQuery";

export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery,
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => `/address/provinces`,
            keepUnusedDataFor: 10,
            transformResponse: (response) => {
                return response.data;
            },
        }),

        getProvinceById: build.query({
            query: (id) => `/address/provinces/${id}`,
        }),
    }),
    // refetchOnFocus: true
    refetchOnReconnect: true,
});

export const { useGetProvincesQuery, useGetProvinceByIdQuery } = addressApi;
