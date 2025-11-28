import {testSession} from "./helper_objects.js";

export const envMap = {
  test: {
    buildFolder: undefined,
    backend: 'http://172.18.5.52:8080/kis/plate/',
    sessionBackend: undefined,
    session: testSession
  },
  production: {
    buildFolder: '/kis/klinicki_studij_novi/react/',
    backend: `${window.location.origin}/kis/klinicki_studij_novi/`,
    sessionBackend: window.location.origin,
    session: {}
  },
};