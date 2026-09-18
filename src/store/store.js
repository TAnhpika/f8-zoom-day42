import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "@/features/counter";
import { productSlice } from "@/features/product";
import { addressApi } from "@/features/address/addressSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

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

setupListeners(store.dispatch)

window.store = store;
