import Header from "./Header/Header.jsx";
import {useState} from "react";
import {DeviceThemeContext} from "./store/device-theme-context.jsx";
import { deviceType } from 'react-device-detect';
import IntroAlt from "./Intro/IntroAlt.jsx";

function App() {
  const [tema, setTema] = useState("light");

  const [otvoriProfil, setOtvoriProfil] = useState(false);

  const setTheme = theme => {
    document.querySelector('body').setAttribute('data-theme', theme);
    setTema(theme);
  }

  return (
    <DeviceThemeContext.Provider value={{deviceType: deviceType, theme: tema, setTheme: setTheme}}>
      <IntroAlt/>
      {/*<Intro />*/}

      <Header otvoriProfil={otvoriProfil} setOtvoriProfil={setOtvoriProfil}/>

    </DeviceThemeContext.Provider>
  )
}

export default App
