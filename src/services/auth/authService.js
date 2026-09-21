import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async () => {
        const response = await http.get("/auth/me");
        return response.data;
    },
);
