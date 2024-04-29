import classes from "./Header.module.css";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {useContext} from "react";
import {DeviceSessionContext} from "../../store/device-session-context.jsx";
import PropTypes from "prop-types";
import {pocetnaStranicaUrl} from "../../util/konstante.js";

const UserQuit = ({setOtvoriProfil}) => {
  const {deviceType, session} = useContext(DeviceSessionContext);
  const mobile = deviceType === 'mobile' || deviceType === "tablet";

  return (
    <>
      {mobile ?
        <div className={classes.profile}>
          <MenuOutlined onClick={() => setOtvoriProfil(true)} className={classes.mobile_menu}/>
        </div> :
        <div className={classes.profile}>

          <div className={classes.user} onClick={() => setOtvoriProfil(true)}>
            <span>Korisnik:</span>
            {session.ime_korisnika}
          </div>

          <Tooltip placement="bottom" title={session.organizacija_naziv}>
            <div className={classes.user}>
              <span>Klinika:</span>
              {session.organizacija_sifra}
            </div>
          </Tooltip>

          <Tooltip placement="bottom"
                   title={session.organizacija_odjel_naziv}>
            <div className={classes.user}>
              <span>Odjeljenje:</span>
              {session.organizacija_odjel}
            </div>
          </Tooltip>
          <LogoutOutlined onClick={() => window.location = pocetnaStranicaUrl} className={classes.logout}/>
        </div>}
    </>
  );
};

UserQuit.propTypes = {
  setOtvoriProfil: PropTypes.func.isRequired,
}

export default UserQuit;