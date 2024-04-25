import {createContext} from "react";

export const DeviceSessionContext = createContext({
  deviceType: '',
  session: {}
});