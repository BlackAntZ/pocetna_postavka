import {ConfigProvider, Menu} from "antd";
import classes from "./Header.module.css";
import {sideMeniPostavka, tema} from "../../util/konstante.jsx";
import {useLocation} from "react-router-dom";
import {useContext} from "react";
import {SideMenuContext} from "../../store/side-menu-context.js";

const SideMenu = () => {
  const location = useLocation();

  const {mini} = useContext(SideMenuContext);

  return (
    <div className={`${classes.side_menu_container} ${mini ? classes.side_menu_container_expanded : ''}`}>
      <ConfigProvider theme={tema}>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          theme="light"
          inlineCollapsed={!mini}
          items={sideMeniPostavka}
          rootClassName={classes.side_menu}
        />
      </ConfigProvider>
    </div>
  );
};

export default SideMenu;