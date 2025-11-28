import {LoginContext} from "./login-context.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getSession, getVersion} from "../api/getSession&Version.js";
import {applicationVersion, environment, initSession} from "../settings/dev_env.js";

export const LoginContextProvider = ({ children }) => {
  const [loginCompleted, setLoginCompleted] = useState(false);

  const [session, setSession] = useState(initSession);
  const [applicationRefresh, setApplicationRefresh] = useState(false);

  const [loading, setLoading] = useState(true);

  //getting session data
  useEffect(() => {
    (async () => {
      if (environment === "production") {
        const result = await getSession();

        setSession(result);
      }
      setLoginCompleted(true);
    })();
  }, []);

  //version check
  useEffect(() => {
    if (environment === "production") {
      const checkVersion = async () => {
        const version = await getVersion();
        if (version?.verzija !== applicationVersion)
          setApplicationRefresh(true);
      };

      // Call immediately
      checkVersion().then();

      // Then every 10 seconds
      const interval = setInterval(checkVersion,  10 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <LoginContext.Provider value={{
      loginCompleted,
      loading,
      setLoading,
      applicationRefresh,
      session
    }}>
      {children}
    </LoginContext.Provider>
  );
};

LoginContextProvider.propTypes = {
  children: PropTypes.node,
};