import classes from "./ProfileDrawer.module.css";
import {Divider} from "antd";
import {routes} from "../../../routes/routes.jsx";

const MobileNavigation = () => {
  return (
    <>
      <div className={classes.mobile_navigation}>
        {routes.map(ruta => <div key={ruta.lokacija}>{ruta.icon} {ruta.tekst}</div>)}
      </div>
      <Divider />
    </>
  );
};

export default MobileNavigation;