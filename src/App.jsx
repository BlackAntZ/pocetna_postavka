import {DeviceSessionContext} from "./store/device-session-context.jsx";
import {deviceType} from 'react-device-detect';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Root from "./pages/Root.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Intro from "./UI/Intro/Intro.jsx";
import {sesijaTestna} from "./podesavanja/pomocni_objekat.js";

const router = createBrowserRouter([
  {path: "/", element: <Root />, children: [
    {index: true, element: <HomePage />},
    {path: 'about', element: <AboutPage />},
    {path: 'contact', element: <ContactPage />},
    ]},
])

function App() {
  //podatke o sesiji u pravoj aplikaciji postaviti u stejt

  return (
    <DeviceSessionContext.Provider value={{deviceType: deviceType, session: sesijaTestna}}>
      <Intro/>

      <RouterProvider router={router} />
    </DeviceSessionContext.Provider>
  )
}

export default App
