import { configureStore } from "@reduxjs/toolkit";
import sectionSlice from "./sectionSlice";
export const store = configureStore({
  reducer: {  sectionSlice },
});
