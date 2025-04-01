import {useEffect, useState} from "react";
import {postaviSifrarnik} from "../settings/pomocne_funkcije.js";
import PropTypes from "prop-types";
import {SifrarniciContext} from "./sifrarnici-context.jsx";

export const SifrarniciContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [drzave, setDrzave] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await postaviSifrarnik('Drzave', setDrzave);

      setLoading(false);
    })();
  }, []);

  return (
    <SifrarniciContext.Provider
      value={{
        drzave: drzave,
        loading: loading,
      }}
    >
      {props.children}
    </SifrarniciContext.Provider>
  );
};

SifrarniciContextProvider.propTypes = {
  children: PropTypes.node
}