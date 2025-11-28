import {envMap} from "./env.js";

//test || production
export const environment = 'test';

const config = envMap[environment];

export const buildFolder = config.buildFolder;
export const backendUrl = config.backend;

export const commonFunctionsLocation = "/kis/common/common.cfc";
export const sessionBackendUrl = config.sessionBackend + commonFunctionsLocation;

export const initSession = config.session;

export const applicationVersion = '1.1.7';
export const moduleShort = 'studije';