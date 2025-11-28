import {DeviceContext} from "./store/device-context.jsx";
import {deviceType} from 'react-device-detect';
import {RouterProvider} from 'react-router-dom';
import {useContext} from "react";
import {ConfigProvider, Spin} from "antd";
import classes from "./App.module.css";
import Intro from "./UI/Intro/Intro.jsx";
import {theme} from "./settings/ant.js";
import srRS from "antd/locale/sr_RS";
import ApplicationRefresh from "./components/Version/ApplicationRefresh.jsx";
import {LoginContext} from "./store/login-context.jsx";
import useRoute from "./routes/useRoute.jsx";

function App() {
  //spiner tokom učitavanja
  const {loading} = useContext(LoginContext);

  const {router} = useRoute();

  return (
    <DeviceContext.Provider value={{deviceType: deviceType}}>
      <Intro/>

      <Spin fullscreen spinning={loading} className={classes.spinner}/>

      <ConfigProvider theme={theme} locale={srRS}>
        <ApplicationRefresh/>
        <RouterProvider router={router}/>
      </ConfigProvider>
    </DeviceContext.Provider>
  )
}

export default App