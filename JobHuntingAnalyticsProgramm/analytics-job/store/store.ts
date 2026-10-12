import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "@/store/dataSlice";
import analyticsReducer from "@/store/AnalyticsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      jobSites: dataReducer,
      Analytics: analyticsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
