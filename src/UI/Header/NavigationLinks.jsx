import {useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {rute} from "../../podesavanja/rute.jsx";

const NavigationLinks = () => {
  const location = useLocation();

  const marker = useRef();
  const [markerPosition, setMarkerPosition] = useState(0);

  useEffect(() => {
    console.log(location.pathname);
    const link = document.getElementById(location.pathname);
    setMarkerPosition(link.offsetLeft);
  }, [location.pathname]);

  return (
    <nav className={classes.navigation}>
      {rute.map(ruta => <NavLink key={ruta.lokacija} to={ruta.lokacija} id={ruta.id}>{ruta.tekst}</NavLink>)}
      {markerPosition ?
        <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
    </nav>
  );
};

export default NavigationLinks;