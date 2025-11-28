import {moduleShort, sessionBackendUrl} from "../settings/dev_env.js";
import {mapCfcBackendData} from "./cfcGet.js";

export const getSession = async () => {
  const response = await fetch(
    `${sessionBackendUrl}?method=get_session`
  );

  return await response.json();
};

export const getVersion = async () => {
  const response = await fetch(
    `${sessionBackendUrl}?method=get_version&module=${moduleShort}`
  );

  const parsedResponse = await response.json();

  return mapCfcBackendData(parsedResponse.lista)[0];
};