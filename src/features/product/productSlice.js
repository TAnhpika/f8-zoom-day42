import { getList } from "@/services/product/productService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getList.fulfilled, (state, action) => {
                state.list = action.payload.items;
                state.loading = false;
            })
            .addCase(getList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setList } = productSlice.actions;

export const { reducerPath } = productSlice;

export default productSlice;
