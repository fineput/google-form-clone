import { configureStore } from '@reduxjs/toolkit';
import { formApi} from "../api/formApi.ts";
import formReducer from './formSlice.ts';

export const store = configureStore({
    reducer: {
        forms: formReducer,
        [formApi.reducerPath]: formApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(formApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;