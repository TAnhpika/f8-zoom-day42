import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { persistReducer, persistStore } from "redux-persist";
import storageModule from "redux-persist/lib/storage";

import { counterSlice } from "@/features/counter";
import { productSlice } from "@/features/product";
import { addressApi } from "@/features/address/addressSlice";
import { authSlice } from "@/features/auth/authSlice";

const rootReducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [counterSlice.reducerPath]: counterSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
});

const storage = storageModule.default ?? storageModule;

const persistConfig = {
    key: "root",
    storage,
};

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        addressApi.middleware,
    ],
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

// Trick
window.store = store;

export { store, persistor };
