import { configureStore } from "@reduxjs/toolkit";
import RepliesSlice from "./RepliesSlice.js";
import sectionSlice from "./sectionSlice";
export const store = configureStore({
  reducer: { RepliesSlice, sectionSlice },
});
