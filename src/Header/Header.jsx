import {useContext, useState} from 'react';
import classes from "./Header.module.css";
import ProfileDrawer from "./Drawer/ProfileDrawer.jsx";
import {DeviceSessionContext} from "../store/device-session-context.jsx";
import LogoOrg from "./Logo&Org.jsx";
import NavigationLinks from "./NavigationLinks.jsx";
import UserQuit from "./User&Quit.jsx";

const Header = () => {
  const [otvoriProfil, setOtvoriProfil] = useState(false);

  const {deviceType} = useContext(DeviceSessionContext);
  const mobile = deviceType === 'mobile';
  const tablet = deviceType === 'tablet';

  return (
    <header className={`${classes.header} ${mobile ? classes.mobile : ''} ${tablet ? classes.tablet : ''}`}>
      <LogoOrg />

      <NavigationLinks />

      <UserQuit setOtvoriProfil={setOtvoriProfil} />

      <ProfileDrawer open={otvoriProfil} onClose={() => setOtvoriProfil(false)}/>
    </header>
  );
};

export default Header;