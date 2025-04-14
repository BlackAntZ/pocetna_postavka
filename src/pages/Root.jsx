import {Outlet} from "react-router-dom";
import classes from "./Root.module.css";
import {useContext, useState} from "react";
import {DeviceSessionContext} from "../store/device-session-context.jsx";
import {SideMenuContext} from "../store/side-menu-context.jsx";
import {navigation} from "../settings/header.js";
import Header from "../UI/Header/Header.jsx";
import SideMenu from "../UI/SideMenu/SideMenu.jsx";
import {tema} from "../settings/ant.js";
import srRS from 'antd/locale/sr_RS';
import {ConfigProvider} from "antd";

const Root = () => {
  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const [rasiriSide, setRasiriSide] = useState(false);

  return (
    <>
      <SideMenuContext.Provider value={{mini: rasiriSide, postaviMini: setRasiriSide}}>
        <ConfigProvider theme={tema} locale={srRS}>
          <Header/>

          {!mobile && navigation === 'side' ? <SideMenu/> : null}
        </ConfigProvider>
      </SideMenuContext.Provider>

      <div className={`${!mobile && navigation === 'side' ? classes.root : ''}`}>
        <Outlet/>
      </div>
    </>
  );
};

export default Root;