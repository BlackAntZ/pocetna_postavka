import {useContext, useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import Logo from "./Logo.jsx";
import ProfileDrawer from "./ProfileDrawer.jsx";
import PropTypes from "prop-types";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import {DeviceThemeContext} from "../store/device-theme-context.jsx";

const Header = ({otvoriProfil, setOtvoriProfil}) => {
  const prviLink = useRef();

  const marker = useRef();
  const [markerPosition, setMarkerPosition] = useState(0);

  const {deviceType} = useContext(DeviceThemeContext);
  const mobile = deviceType === 'mobile';

  useEffect(() => {
    setMarkerPosition(prviLink.current?.offsetLeft);
  }, []);

  const indicator = ev => {
    setMarkerPosition(ev.target.offsetLeft);
  }

  return (
    <header className={`${classes.header} ${classes.mobile}`}>
      <div className={classes.logo_and_org}>
        <Logo/>
        {!mobile ? <div className={classes.org_and_modul}>
          <span>
            KIS :: Univerzitetski klinički centar Republike Srpske :: MODUL
          </span>
          <div className={classes.clinic}>
            <span>
              1012 KLINIKA ZA KARDIOLOGIJU
            </span>
            <span>
              10127 Odjeljenje opšte kardiologije sa funkcionalnom dijagnostikom i kardiološkim ambulantama
            </span>
          </div>
        </div> : null}
      </div>

      {!mobile ? <nav className={classes.navigation}>
        <a ref={prviLink} onClick={indicator}>Home</a>
        <a onClick={indicator}>About</a>
        <a onClick={indicator}>Contact</a>
        {markerPosition ?
          <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
      </nav> : null}

      {mobile ?  <MenuOutlined onClick={() => setOtvoriProfil(true)} className={classes.mobile_menu}/>  :
        <div className={classes.profile}>

          <div className={classes.user} onClick={() => setOtvoriProfil(true)}>Dejan Bajic</div>
          <LogoutOutlined className={classes.logout} />
        </div>}

      <ProfileDrawer open={otvoriProfil} onClose={() => setOtvoriProfil(false)}/>
    </header>
  );
};

Header.propTypes = {
  otvoriProfil: PropTypes.bool.isRequired,
  setOtvoriProfil: PropTypes.func.isRequired,
}

export default Header;