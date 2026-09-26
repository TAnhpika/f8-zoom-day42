import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { persistReducer, persistStore } from "redux-persist";
import storageModule from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import { counterSlice } from "@/features/counter";
import { productSlice } from "@/features/product";
import { addressApi } from "@/features/address/addressSlice";
import { authSlice } from "@/features/auth/authSlice";

const storage = storageModule.default ?? storageModule;

const transforms = import.meta.env.DEV ? [] : [
    encryptTransform({
        secretKey: "my-super-secret-key",
        onError: function (error) {
            console.error(error);
        },
    }),
];

const persistConfig = {
    key: "root",
    storage,
    blacklist: [authSlice.reducerPath, productSlice.reducerPath],
    transforms,
};

const authPersistConfig = {
    key: authSlice.reducerPath,
    storage: storage,
    blacklist: ["fetching"],
    transforms,
};

const rootReducer = combineReducers({
    [authSlice.reducerPath]: persistReducer(
        authPersistConfig,
        authSlice.reducer,
    ),
    [counterSlice.reducerPath]: counterSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
});

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
