import { getList } from "@/services/product/productService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
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
        builder.addCase(getList.fulfilled, (state, action) => {
            state.list = action.payload.items;
        });
    },
});

export const { setList } = productSlice.actions;

export const { reducerPath } = productSlice;

export default productSlice;
