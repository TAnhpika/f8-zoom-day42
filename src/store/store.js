import { configureStore } from "@reduxjs/toolkit";

import counterReducer, { reducerPath as counter} from "@/features/counter/counterSlice";

const store = configureStore({
    reducer: {
        [counter]: counterReducer,
    },
});

export default store;
