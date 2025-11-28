import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DataContext} from "./data-context.jsx";
import {LoginContext} from "./login-context.jsx";
import {setDataState} from "../api/cfcGet.js";

export const DataContextProvider = (props) => {
  const {loginCompleted, setLoading} = useContext(LoginContext);

  const [drzave, setDrzave] = useState(null);

  useEffect(() => {
    if (!loginCompleted) return;

    (async () => {
      await setDataState('Drzave', setDrzave);

      setLoading(false);
    })();
  }, [loginCompleted, setLoading]);

  return (
    <DataContext.Provider
      value={{
        drzave: drzave,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node
}