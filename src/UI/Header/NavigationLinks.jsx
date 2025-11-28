import {useEffect, useRef, useState} from 'react';
import classes from "./Header.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {routes} from "../../routes/routes.jsx";

const NavigationLinks = () => {
  const location = useLocation();

  const marker = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(0);

  useEffect(() => {
    const updateMarker = () => {
      const link = document.getElementById(location.pathname);
      if (link) {
        setMarkerPosition(link.offsetLeft);
      }
    };

    updateMarker();
  }, [location.pathname]);

  return (
    <nav className={classes.navigation}>
      {routes.map(ruta => <NavLink key={ruta.lokacija} to={ruta.lokacija} id={ruta.lokacija}>{ruta.tekst}</NavLink>)}
      {markerPosition ?
        <div ref={marker} style={{left: `${markerPosition}px`}} className={classes.marker}></div> : null}
    </nav>
  );
};

export default NavigationLinks;