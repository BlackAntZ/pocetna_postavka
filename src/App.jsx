import Header from "./Header/Header.jsx";
import {DeviceSessionContext} from "./store/device-session-context.jsx";
import {deviceType} from 'react-device-detect';
import Intro from "./Intro/Intro.jsx";
import {sesijaTestna} from "./util/konstante.js";

function App() {
  //podatke o sesiji u pravoj aplikaciji postaviti na stejt

  return (
    <DeviceSessionContext.Provider value={{deviceType: deviceType, session: sesijaTestna}}>
      <Intro/>

      <Header/>
    </DeviceSessionContext.Provider>
  )
}

export default App
