import {createContext} from "react";

export const LoginContext = createContext({
  loginCompleted: false,
  loading: false,
  setLoading: undefined,
  applicationRefresh: false,
  session: {},
});