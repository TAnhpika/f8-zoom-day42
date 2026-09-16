import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/product/productSlice";
import counterSlice from "@/features/counter/counterSlice";

const store = configureStore({
    reducer: {
        [counterSlice.reducerPath]: counterSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
    },
});

export default store;
