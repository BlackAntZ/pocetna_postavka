import {Divider, Drawer} from 'antd';
import classes from "./ProfileDrawer.module.css";
import {CloseCircleOutlined} from '@ant-design/icons';
import PropTypes from "prop-types";
import MobileDrawerProfile from "./MobileDrawerProfile.jsx";
import OdabirTeme from "./OdabirTeme.jsx";
import {useContext} from "react";
import {DeviceSessionContext} from "../../../store/device-session-context.jsx";
import MobileNavigation from "./MobileNavigation.jsx";

const ProfileDrawer = ({open, onClose}) => {
  const {session} = useContext(DeviceSessionContext);

  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  const title = <div>
    <span>
      {session.ime_korisnika}
    </span>
    <span className={classes.username}>@{session.korisnicko_ime}</span>
  </div>

  return (
    <Drawer width={500} onClose={onClose} open={open} closable={false}>
      <div className={classes.content}>

        <div className={classes.title}>
          {title}
          <CloseCircleOutlined className={classes.icon} onClick={onClose}/>
        </div>

        <Divider/>

        {mobile ? <MobileNavigation/> : null}

        <OdabirTeme drawerOpen={open}/>

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