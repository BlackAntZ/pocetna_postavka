import classes from "./ProfileDrawer.module.css";
import {Divider} from "antd";
import {useContext} from "react";
import {DeviceSessionContext} from "../../../store/device-session-context.jsx";
import {modul} from "../../../util/konstante.js";

const MobileDrawerProfile = () => {
  const {deviceType, session} = useContext(DeviceSessionContext);
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
            {modul}
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