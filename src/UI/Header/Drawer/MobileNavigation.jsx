import classes from "./ProfileDrawer.module.css";
import {Divider} from "antd";
import {rute} from "../../../settings/rute.jsx";

const MobileNavigation = () => {
  return (
    <>
      <div className={classes.mobile_navigation}>
        {rute.map(ruta => <div key={ruta.lokacija}>{ruta.icon} {ruta.tekst}</div>)}
      </div>
      <Divider />
    </>
  );
};

export default MobileNavigation;