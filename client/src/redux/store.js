import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./features/getPropertySlice";

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
});
