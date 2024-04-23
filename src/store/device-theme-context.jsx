import {createContext} from "react";

export const DeviceThemeContext = createContext({
  deviceType: '',
  theme: '',
  setTheme: undefined
});