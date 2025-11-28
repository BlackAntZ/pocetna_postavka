import classes from "./Header.module.css";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {useContext} from "react";
import {DeviceContext} from "../../store/device-context.jsx";
import PropTypes from "prop-types";
import {navigation, showSelectClinic, showSelectDepartment, returnToHomepage} from "../../settings/header.js";
import {LoginContext} from "../../store/login-context.jsx";

const UserQuit = ({setOtvoriProfil}) => {
  const {deviceType} = useContext(DeviceContext);
  const {session} = useContext(LoginContext);

  const mobile = deviceType === 'mobile' || deviceType === "tablet";

  return (
    <>
      {mobile ?
        <div className={classes.profile}>
          <MenuOutlined onClick={() => setOtvoriProfil(true)} className={classes.mobile_menu}/>
        </div> :
        <div className={`${classes.profile} ${navigation === 'side' ? classes.profile__alt : ''}`}>

          <div className={classes.user} onClick={() => setOtvoriProfil(true)}>
            <span>Korisnik:</span>
            {session.ime_korisnika}
          </div>

          {showSelectClinic ? <Tooltip placement="bottom" title={session.organizacija_naziv}>
            <div className={classes.user}>
              <span>Klinika:</span>
              {session.organizacija_sifra}
            </div>
          </Tooltip> : null}

          {showSelectDepartment ? <Tooltip placement="bottom"
                                           title={session.organizacija_odjel_naziv}>
            <div className={classes.user}>
              <span>Odjeljenje:</span>
              {session.organizacija_odjel}
            </div>
          </Tooltip> : null}

          <LogoutOutlined onClick={returnToHomepage} className={classes.logout}/>
        </div>}
    </>
  );
};

UserQuit.propTypes = {
  setOtvoriProfil: PropTypes.func.isRequired,
}

export default UserQuit;