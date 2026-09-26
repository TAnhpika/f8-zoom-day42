import { getCurrentUser } from "@/services/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    fetching: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.fetching = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.fetching = false;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.currentUser = null;
            state.fetching = false;
        });
    },
});

export const { setCurrentUser } = authSlice.actions;

export const { reducerPath } = authSlice;

export default authSlice;
