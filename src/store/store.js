import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "@/features/counter";
import { productSlice } from "@/features/product";
import { addressApi } from "@/features/address/addressSlice";

export const store = configureStore({
    reducer: {
        [counterSlice.reducerPath]: counterSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        addressApi.middleware,
    ],
});

window.store = store;
