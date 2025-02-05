import {DeviceSessionContext} from "./store/device-session-context.jsx";
import {deviceType} from 'react-device-detect';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Root from "./pages/Root.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import {sesijaTestna} from "./settings/pomocni_objekat.js";
import {aplikacijaVerzija, buildFolder, environment} from "./settings/razvojno_okruzenje.js";
import {useContext, useEffect, useState} from "react";
import {povuciSesiju, povuciVerziju} from "./settings/pomocne_funkcije.js";
import {SifrarniciContext} from "./store/sifrarnici-context.jsx";
import {ConfigProvider, Spin} from "antd";
import classes from "./App.module.css";
import {tema} from "./settings/ant.js";
import srRS from 'antd/locale/sr_RS';
import OsvjeziAplikaciju from "./components/Verzija/OsvjeziAplikaciju.jsx";
import Intro from "./UI/Intro/Intro.jsx";

//definisanje ruta
const router = createBrowserRouter([
  {path: "/", element: <Root />, children: [
    {index: true, element: <HomePage />},
    {path: 'about', element: <AboutPage />},
    {path: 'contact', element: <ContactPage />},
    ]},
], {basename: environment === 'test' ? undefined : buildFolder})

function App() {
  const [sesijaPodaci, setSesijaPodaci] = useState(sesijaTestna);

  const [osvjeziAplikaciju, setOsvjeziAplikaciju] = useState(false);

  //spiner tokom učitavanja
  const {loading} = useContext(SifrarniciContext);

  //povlačenje podataka o sesiji
  useEffect(() => {
    if (environment === 'production') {

      (async () => {
        const url = window.location.origin;
        const rez = await povuciSesiju(url);

        setSesijaPodaci(rez);
      })();
    }
  }, []);

  //provjera verzije
  useEffect(() => {
    if (environment === 'production') {
      (async () => {
        const verzija = await povuciVerziju();
        if (verzija[0].verzija !== aplikacijaVerzija) setOsvjeziAplikaciju(true);
        else setOsvjeziAplikaciju(false);
      })();
    }
  }, []);

  return (
    <DeviceSessionContext.Provider value={{deviceType: deviceType, session: sesijaPodaci}}>
      <Intro />

      <Spin fullscreen spinning={loading} className={classes.spinner}/>

      <ConfigProvider theme={tema} locale={srRS}>

        <OsvjeziAplikaciju closeModal={() => setOsvjeziAplikaciju(false)} open={osvjeziAplikaciju} />

        <RouterProvider router={router}/>
      </ConfigProvider>
    </DeviceSessionContext.Provider>
  )
}

export default App
