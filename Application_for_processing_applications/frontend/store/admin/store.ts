import { configureStore } from "@reduxjs/toolkit";
import adminUsersReducer from "./slices/usersSlice";

export const makeAdminStore = () => {
  return configureStore({
    reducer: {
      users: adminUsersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AdminStore = ReturnType<typeof makeAdminStore>;
export type AdminRootState = ReturnType<AdminStore["getState"]>;
export type AdminAppDispatch = AdminStore["dispatch"];
