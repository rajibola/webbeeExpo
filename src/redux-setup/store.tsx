import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/category";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
