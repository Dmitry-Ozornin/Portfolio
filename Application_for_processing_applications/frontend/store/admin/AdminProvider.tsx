"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeAdminStore, AdminStore } from "./store";

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AdminStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeAdminStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
