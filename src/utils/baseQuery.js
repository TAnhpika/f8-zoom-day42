import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

export default baseQuery;
