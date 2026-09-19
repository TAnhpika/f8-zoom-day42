import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/store/baseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (build) => ({
        getCurrentUser: build.query({
            query: () => `/auth/me`,
            transformResponse: (response) => {
                return response.data;
            },
        }),
    }),
});

export const { useGetCurrentUserQuery } = authApi;
