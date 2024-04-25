import {ConfigProvider, Divider, Drawer} from 'antd';
import classes from "./ProfileDrawer.module.css";
import {CloseCircleOutlined} from '@ant-design/icons';
import {tema} from "../../util/konstante.js";
import PropTypes from "prop-types";
import MobileDrawerProfile from "./MobileDrawerProfile.jsx";
import OdabirTeme from "./OdabirTeme.jsx";
import {useContext} from "react";
import {DeviceSessionContext} from "../../store/device-session-context.jsx";

const ProfileDrawer = ({open, onClose}) => {
  const {session} = useContext(DeviceSessionContext);


  const title = <div>
    <span>
      {session.ime_korisnika}
    </span>
    <span className={classes.username}>@{session.korisnicko_ime}</span>
  </div>

  return (
    <ConfigProvider theme={tema}>
      <Drawer width={500} onClose={onClose} open={open} closable={false}>
        <div className={classes.content}>

          <div className={classes.title}>
            {title}
            <CloseCircleOutlined className={classes.icon} onClick={onClose}/>
          </div>

          <Divider/>

          <OdabirTeme/>

          <MobileDrawerProfile/>

        </div>
      </Drawer>
    </ConfigProvider>
  );
};

ProfileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ProfileDrawer;