import {useContext, useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import {DeviceSessionContext} from "../../store/device-session-context.jsx";
import {NavLink, useLocation} from "react-router-dom";
import {rute} from "../../util/konstante.js";

const NavigationLinks = () => {
  const location = useLocation();

  const marker = useRef();
  const [markerPosition, setMarkerPosition] = useState(0);

  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === 'mobile';

  useEffect(() => {
    const link = document.getElementById(location.pathname);
    setMarkerPosition(link.offsetLeft);
  }, [location.pathname]);

  return (
    <>
      {!mobile ? <nav className={classes.navigation}>
        {rute.map(ruta => <NavLink key={ruta.lokacija} to={ruta.lokacija} id={ruta.lokacija}>{ruta.tekst}</NavLink>)}
        {markerPosition ?
          <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
      </nav> : null}
    </>
  );
};

export default NavigationLinks;