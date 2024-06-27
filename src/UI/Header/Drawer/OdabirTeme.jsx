import classes from "./ProfileDrawer.module.css";
import {CheckOutlined, MoonFilled, RightOutlined, SunFilled} from "@ant-design/icons";
import {useState} from "react";
import useComponentVisible from "./useComponentVisible.jsx";
import PropTypes from "prop-types";

const OdabirTeme = ({drawerOpen}) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(drawerOpen);
  const [tema, setTema] = useState(document.querySelector('body').getAttribute('data-theme') || 'light');

  const podesiTemu = tema => {
    setTema(tema);
    document.querySelector('body').setAttribute('data-theme', tema);
    setIsComponentVisible(false);
  }

  return (
    <div ref={ref} className={classes.theme_container} id={'odabir_teme'}>
      <div className={classes.theme} onClick={() => setIsComponentVisible(prevState => !prevState)}>
        <div>
          {tema === 'dark' ? <MoonFilled/> : <SunFilled/>}
          Tema: {tema === 'light' ? 'Svijetla' : tema === 'dark' ? 'Tamna' : 'Svijetla 2'}
        </div>
        <RightOutlined/>
      </div>
        <div ref={ref} className={`${classes.theme_choice} ${isComponentVisible ? classes.active : ''}`}>
        <div onClick={() => podesiTemu('light')}>{tema === 'light' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Svijetla 1
        </div>
        <div onClick={() => podesiTemu('light_alt')}>{tema === 'light_alt' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Svijetla 2
        </div>
        <div onClick={() => podesiTemu('dark')}>{tema === 'dark' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Tamna
        </div>
      </div>
    </div>
  );
};

OdabirTeme.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
}

export default OdabirTeme;