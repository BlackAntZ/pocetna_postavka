import {useContext, useRef} from 'react';
import {ConfigProvider, Divider, Drawer} from 'antd';
import classes from "./ProfileDrawer.module.css";
import {CheckOutlined, CloseCircleOutlined, MoonFilled, RightOutlined, SunFilled} from '@ant-design/icons';
import {tema} from "../util/konstante.js";
import PropTypes from "prop-types";
import {DeviceThemeContext} from "../store/device-theme-context.jsx";

const ProfileDrawer = ({open, onClose}) => {
  const odabirTeme = useRef();

  const { deviceType, theme, setTheme } = useContext(DeviceThemeContext);
  const mobile = deviceType === "mobile" || deviceType === 'tablet';

  const otvoriZatvoriOdairTeme = () => {
    odabirTeme.current?.classList.toggle(classes.active);
  }

  const podesiTemu = tema => {
    setTheme(tema);
    otvoriZatvoriOdairTeme();
  }

  const title = <div>
    <span>
      Dejan Bajic
    </span>
    <span className={classes.username}>@dejan.bajic</span>
  </div>

  return (
    <ConfigProvider
      theme={tema}
    >
      <Drawer width={500} onClose={onClose} open={open} closable={false}>
        <div className={classes.content}>

          <div className={classes.title}>
            {title}
            <CloseCircleOutlined className={classes.icon} onClick={onClose} />
          </div>

          <Divider/>

          {mobile ?
            <div className={classes.mobile_personal_info}>
              <div>
                KIS
              </div>
              <div>
                <span>
                  Lokacija:
                </span>
                Univerzitetski klinički centar Republike Srpske
              </div>
              <div>
                <span>
                  Modul:
                </span>
                 MODUL
              </div>
              <div>
                <span>
                  Klinika:
                </span>
                1012 KLINIKA ZA KARDIOLOGIJU
              </div>
              <div>
                <span>
                  Odjeljenje:
                </span>
                10127 Odjeljenje opšte kardiologije sa funkcionalnom dijagnostikom i kardiološkim
                ambulantama
              </div>

              <Divider/>
            </div>
            : null}

          <div className={classes.theme_container}>
            <div className={classes.theme} onClick={otvoriZatvoriOdairTeme}>
              <div>
                {theme === 'dark' ? <MoonFilled /> : <SunFilled/>}
                Tema: {theme === 'light' ? 'Svijetla' : theme === 'dark' ? 'Tamna' : 'Svijetla 2'}
              </div>
              <RightOutlined />
            </div>
            <div ref={odabirTeme} className={classes.theme_choice}>
              <div onClick={() => podesiTemu('light')}>{theme === 'light' ? <CheckOutlined className={classes.theme_checked} /> : null}Svijetla 1</div>
              <div onClick={() => podesiTemu('light_alt')}>{theme === 'light_alt' ? <CheckOutlined className={classes.theme_checked} /> : null}Svijetla 2</div>
              <div onClick={() => podesiTemu('dark')}>{theme === 'dark' ? <CheckOutlined className={classes.theme_checked} /> : null}Tamna</div>
            </div>
          </div>

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