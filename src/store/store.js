import { configureStore } from "@reduxjs/toolkit";

import {counterSlice} from "@/features/counter";
import { productSlice } from "@/features/product";

const store = configureStore({
    reducer: {
        [counterSlice.reducerPath]: counterSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
    },
});

export default store;
