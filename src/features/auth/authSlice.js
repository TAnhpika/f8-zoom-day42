import { getCurrentUser } from "@/services/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.currentUser = null;
        });
    },
});

export const { setList } = authSlice.actions;

export const { reducerPath } = authSlice;

export default authSlice;
