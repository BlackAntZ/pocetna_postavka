import {useContext, useState} from 'react';
import classes from "./Header.module.css";
import ProfileDrawer from "./Drawer/ProfileDrawer.jsx";
import {DeviceContext} from "../../store/device-context.jsx";
import LogoOrg from "./Logo&Org.jsx";
import NavigationLinks from "./NavigationLinks.jsx";
import UserQuit from "./User&Quit.jsx";
import {navigation} from "../../settings/header.js";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const {deviceType} = useContext(DeviceContext);
  const mobile = deviceType === 'mobile';
  const tablet = deviceType === 'tablet';

  return (
    <header className={`${classes.header} ${mobile ? classes.mobile : ''} ${tablet ? classes.tablet : ''}`}>
      <LogoOrg />

      {navigation === 'top' && !mobile ? <NavigationLinks/> : null}

      <UserQuit setOtvoriProfil={setOpenProfile} />

      <ProfileDrawer open={openProfile} onClose={() => setOpenProfile(false)}/>
    </header>
  );
};

export default Header;