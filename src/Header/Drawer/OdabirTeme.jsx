import classes from "./ProfileDrawer.module.css";
import {CheckOutlined, MoonFilled, RightOutlined, SunFilled} from "@ant-design/icons";
import {useRef} from "react";

const OdabirTeme = () => {
  const odabirTeme = useRef();

  const temaTrenutna = document.querySelector('body').getAttribute('data-theme') || 'light';

  const otvoriZatvoriOdairTeme = () => {
    odabirTeme.current?.classList.toggle(classes.active);
  }

  const podesiTemu = tema => {
    document.querySelector('body').setAttribute('data-theme', tema);
    otvoriZatvoriOdairTeme();
  }

  return (
    <div className={classes.theme_container}>
      <div className={classes.theme} onClick={otvoriZatvoriOdairTeme}>
        <div>
          {temaTrenutna === 'dark' ? <MoonFilled/> : <SunFilled/>}
          Tema: {temaTrenutna === 'light' ? 'Svijetla' : temaTrenutna === 'dark' ? 'Tamna' : 'Svijetla 2'}
        </div>
        <RightOutlined/>
      </div>
      <div ref={odabirTeme} className={classes.theme_choice}>
        <div onClick={() => podesiTemu('light')}>{temaTrenutna === 'light' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Svijetla 1
        </div>
        <div onClick={() => podesiTemu('light_alt')}>{temaTrenutna === 'light_alt' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Svijetla 2
        </div>
        <div onClick={() => podesiTemu('dark')}>{temaTrenutna === 'dark' ?
          <CheckOutlined className={classes.theme_checked}/> : null}Tamna
        </div>
      </div>
    </div>
  );
};

export default OdabirTeme;