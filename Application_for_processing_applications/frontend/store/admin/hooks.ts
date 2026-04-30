import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AdminRootState, AdminAppDispatch } from "./store";

export const useAdminDispatch: () => AdminAppDispatch = useDispatch;
export const useAdminSelector: TypedUseSelectorHook<AdminRootState> = useSelector;
