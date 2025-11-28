import {Outlet} from "react-router-dom";
import classes from "./Root.module.css";
import {useContext, useState} from "react";
import {DeviceContext} from "../../store/device-context.jsx";
import {SideMenuContext} from "../../store/side-menu-context.jsx";
import {navigation} from "../../settings/header.js";
import Header from "../../UI/Header/Header.jsx";
import SideMenu from "../../UI/SideMenu/SideMenu.jsx";

const Root = () => {
  const {deviceType} = useContext(DeviceContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const [expandedMenu, setExpandedMenu] = useState(false);

  return (
    <>
      <SideMenuContext.Provider value={{mini: expandedMenu, setMini: setExpandedMenu}}>
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