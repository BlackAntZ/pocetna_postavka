import {useContext, useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import {DeviceSessionContext} from "../store/device-session-context.jsx";

const NavigationLinks = () => {
  const prviLink = useRef();

  const marker = useRef();
  const [markerPosition, setMarkerPosition] = useState(0);

  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === 'mobile';

  useEffect(() => {
    setMarkerPosition(prviLink.current?.offsetLeft);
  }, []);

  const indicator = ev => {
    setMarkerPosition(ev.target.offsetLeft);
  }

  return (
    <>
      {!mobile ? <nav className={classes.navigation}>
        <a ref={prviLink} onClick={indicator}>Home</a>
        <a onClick={indicator}>About</a>
        <a onClick={indicator}>Contact</a>
        {markerPosition ?
          <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
      </nav> : null}
    </>
  );
};

export default NavigationLinks;