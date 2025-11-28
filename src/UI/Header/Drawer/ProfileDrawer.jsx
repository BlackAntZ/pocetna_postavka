import {Divider, Drawer} from 'antd';
import classes from "./ProfileDrawer.module.css";
import {CloseCircleOutlined} from '@ant-design/icons';
import PropTypes from "prop-types";
import MobileDrawerProfile from "./MobileDrawerProfile.jsx";
import ThemeSelection from "./ThemeSelection.jsx";
import {useContext} from "react";
import {DeviceContext} from "../../../store/device-context.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
import {LoginContext} from "../../../store/login-context.jsx";

const ProfileDrawer = ({open, onClose}) => {
  const {session} = useContext(LoginContext);
  const {deviceType} = useContext(DeviceContext);

  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const title = <div>
    <span>
      {session.ime_korisnika}
    </span>
    <span className={classes.username}>@{session.korisnicko_ime}</span>
  </div>

  return (
    <Drawer size={500} onClose={onClose} open={open} closable={false}>
      <div className={classes.content}>

        <div className={classes.title}>
          {title}
          <CloseCircleOutlined className={classes.icon} onClick={onClose}/>
        </div>

        <Divider/>

        {mobile ? <MobileNavigation/> : null}

        <ThemeSelection drawerOpen={open}/>

        <MobileDrawerProfile/>

      </div>
    </Drawer>
  );
};

ProfileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ProfileDrawer;