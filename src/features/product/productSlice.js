import { getList } from "@/services/product/productService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    hasMore: true,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getList.fulfilled, (state, action) => {
                const items = action.payload.items || [];
                const page = action.meta.arg.page;

                if (page === 1) {
                    state.list = items;
                } else {
                    state.list = [...state.list, ...items];
                }

                state.hasMore = items.length > 0;
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
