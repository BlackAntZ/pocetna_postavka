import classes from "./Header.module.css";
import Logo from "./Logo/Logo.jsx";
import {useContext} from "react";
import {DeviceContext} from "../../store/device-context.jsx";
import {module} from "../../settings/header.js";
import {LoginContext} from "../../store/login-context.jsx";

const LogoOrg = () => {
  const {deviceType} = useContext(DeviceContext);
  const {session} = useContext(LoginContext);

  const mobile = deviceType === 'mobile' || deviceType === 'tablet';

  return (
    <div className={classes.logo_and_org}>
      <Logo/>
      {!mobile ? <div className={classes.org_and_modul}>
          <span>
            KIS :: {session.naziv_klijenta}
          </span>
          <span>
            {module}
          </span>
      </div> : null}
    </div>
  );
};

export default LogoOrg;