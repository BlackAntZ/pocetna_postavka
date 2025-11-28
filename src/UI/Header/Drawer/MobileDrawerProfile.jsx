import classes from "./ProfileDrawer.module.css";
import {Divider} from "antd";
import {useContext} from "react";
import {DeviceContext} from "../../../store/device-context.jsx";
import {module} from "../../../settings/header.js";
import {LoginContext} from "../../../store/login-context.jsx";

const MobileDrawerProfile = () => {
  const {deviceType} = useContext(DeviceContext);
  const {session} = useContext(LoginContext);

  const mobile = deviceType === "mobile" || deviceType === 'tablet';

  return (
    <>
      {mobile ?
        <div className={classes.mobile_personal_info}>
          <Divider/>

          <div>
            KIS
          </div>
          <div>
            <span>
              Lokacija:
            </span>
            {session.naziv_klijenta}
          </div>
          <div>
            <span>
              Modul:
            </span>
            {module}
          </div>
          <div>
            <span>
              Klinika:
            </span>
            {session.organizacija_sifra} {session.organizacija_naziv}
          </div>
          <div>
            <span>
              Odjeljenje:
            </span>
            {session.organizacija_odjel} {session.organizacija_odjel_naziv}
          </div>
        </div>
        : null}
    </>
  );
};

export default MobileDrawerProfile;