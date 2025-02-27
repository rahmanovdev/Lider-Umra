import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { boolSlicesReducer } from './slices/bool.slices'

export const store = configureStore({
   reducer: {
      [api.reducerPath]: api.reducer,
      bool: boolSlicesReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
