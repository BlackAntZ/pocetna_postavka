import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import SideMenu from "../components/Header/SideMenu.jsx";
import classes from "./Root.module.css";
import {useContext, useState} from "react";
import {DeviceSessionContext} from "../store/device-session-context.jsx";
import {SideMenuContext} from "../store/side-menu-context.js";
import {navigation} from "../settings/header.js";

const Root = () => {
  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const [rasiriSide, setRasiriSide] = useState(false);

  return (
    <>
      <SideMenuContext.Provider value={{mini: rasiriSide, postaviMini: setRasiriSide}}>
        <Header/>

        {!mobile && navigation === 'side' ? <SideMenu/> : null}
      </SideMenuContext.Provider>

      <div className={`${!mobile && navigation === 'side' ? classes.root : ''}`}>
        <Outlet/>
      </div>
    </>
  );
};

export default Root;