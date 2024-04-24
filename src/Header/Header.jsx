import {useContext, useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import Logo from "./Logo.jsx";
import ProfileDrawer from "./ProfileDrawer.jsx";
import PropTypes from "prop-types";
import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import {DeviceThemeContext} from "../store/device-theme-context.jsx";
import {Tooltip} from "antd";

const Header = ({otvoriProfil, setOtvoriProfil}) => {
  const prviLink = useRef();

  const marker = useRef();
  const [markerPosition, setMarkerPosition] = useState(0);

  const {deviceType} = useContext(DeviceThemeContext);
  const mobile = deviceType === 'mobile';
  const tablet = deviceType === 'tablet';

  useEffect(() => {
    setMarkerPosition(prviLink.current?.offsetLeft);
  }, []);

  const indicator = ev => {
    setMarkerPosition(ev.target.offsetLeft);
  }

  return (
    <header className={`${classes.header} ${mobile ? classes.mobile : ''} ${tablet ? classes.tablet : ''}`}>
      <div className={classes.logo_and_org}>
        <Logo/>
        {!mobile && !tablet ? <div className={classes.org_and_modul}>
          <span>
            KIS :: Univerzitetski klinički centar Republike Srpske
          </span>
          <span>
            MODUL
          </span>
        </div> : null}
      </div>

      {!mobile ? <nav className={classes.navigation}>
        <a ref={prviLink} onClick={indicator}>Home</a>
        <a onClick={indicator}>About</a>
        <a onClick={indicator}>Contact</a>
        {markerPosition ?
          <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
      </nav> : null}

      {mobile || tablet ?
        <div className={classes.profile}>
          <MenuOutlined onClick={() => setOtvoriProfil(true)} className={classes.mobile_menu}/>
        </div> :
        <div className={classes.profile}>

          <div className={classes.user} onClick={() => setOtvoriProfil(true)}>
            <span>Korisnik:</span>
            Dejan Bajic
          </div>

          <Tooltip placement="bottom" title={'KLINIKA ZA KARDIOLOGIJU'}>
            <div className={classes.user}>
              <span>Klinika:</span>
              1012
            </div>
          </Tooltip>

          <Tooltip placement="bottom"
                   title={'Odjeljenje opšte kardiologije sa funkcionalnom dijagnostikom i kardiološkim ambulantama'}>
            <div className={classes.user}>
              <span>Odjeljenje:</span>
              10127
            </div>
          </Tooltip>
          <LogoutOutlined className={classes.logout}/>
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