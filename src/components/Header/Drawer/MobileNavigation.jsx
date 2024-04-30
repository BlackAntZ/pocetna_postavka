import {rute} from "../../../util/konstante.jsx";
import classes from "./ProfileDrawer.module.css";
import {Divider} from "antd";

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