import Header from "../UI/Header/Header.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import SideMenu from "../UI/SideMenu/SideMenu.jsx";
import classes from "./Root.module.css";
import {useContext, useState} from "react";
import {DeviceSessionContext} from "../store/device-session-context.jsx";
import {SideMenuContext} from "../store/side-menu-context.jsx";
import {ConfigProvider, Spin} from "antd";
import {navigation} from "../podesavanja/header.js";
import {tema} from "../podesavanja/ant.js";

const Root = () => {
  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const navigate = useNavigation();

  const [rasiriSide, setRasiriSide] = useState(false);

  return (
    <>
      <SideMenuContext.Provider value={{mini: rasiriSide, postaviMini: setRasiriSide}}>
        <ConfigProvider theme={tema} >
          <Header/>

          {!mobile && navigation === 'side' ? <SideMenu/> : null}
        </ConfigProvider>
      </SideMenuContext.Provider>

      <Spin fullscreen spinning={navigate.state === 'loading'} />

      <div className={`${!mobile && navigation === 'side' ? classes.root : ''}`}>
        <Outlet/>
      </div>
    </>
  );
};

export default Root;