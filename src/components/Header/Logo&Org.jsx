import classes from "./Header.module.css";
import Logo from "./Logo/Logo.jsx";
import {useContext} from "react";
import {DeviceSessionContext} from "../../store/device-session-context.jsx";
import {modul} from "../../util/konstante.js";

const LogoOrg = () => {
  const {deviceType, session} = useContext(DeviceSessionContext);
  const mobile = deviceType === 'mobile' || deviceType === 'tablet';

  return (
    <div className={classes.logo_and_org}>
      <Logo/>
      {!mobile ? <div className={classes.org_and_modul}>
          <span>
            KIS :: {session.naziv_klijenta}
          </span>
          <span>
            {modul}
          </span>
      </div> : null}
    </div>
  );
};

export default LogoOrg;