import {createBrowserRouter} from "react-router-dom";
import {buildFolder} from "../settings/dev_env.js";
import Root from "../pages/Root/Root.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UnauthorizedPage from "../pages/Protected/UnauthorizedPage.jsx";

const UseRoute = () => {
  return {
    router: createBrowserRouter(
      [
        {
          path: "/", element: <Root/>, children: [
            {index: true, element: <HomePage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'contact', element: <ContactPage/>},
            {path: "unauthorized", element: <UnauthorizedPage/>},

          ]
        },
      ],
      {basename: buildFolder}
    )
  };
};

export default UseRoute;