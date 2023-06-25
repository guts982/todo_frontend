"use client";

import { store } from "@/lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todosApi } from "./redux/features/todo/fetchTodos";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider store={store}>{children}
    {/* <ApiProvider api={todosApi}>{children}</ApiProvider> */}
  </ReduxProvider>
);
