import {useContext, useEffect} from 'react';
import classes from "./Intro.module.css";
import {DeviceContext} from "../../store/device-context.jsx";

const Intro = () => {
  const {deviceType} = useContext(DeviceContext);
  const mobile = deviceType === "mobile" || deviceType === "tablet";

  useEffect(() => {
    setTimeout(() => {
      const logo = document.getElementById('logo');
      logo.classList.add(classes.fade);

      const container = document.getElementById('container');
      container.classList.add(classes.fade);
    }, 1000)

    setTimeout(() => {
      const shapeOne = document.getElementById('Shape 1');
      shapeOne.classList.add(classes.appear);

      const shapeTwo = document.getElementById('Shape 3');
      shapeTwo.classList.add(classes.appear);

      const shapeThree = document.getElementById('Shape 4');
      shapeThree.classList.add(classes.appear);

      const shapeFour = document.getElementById('Shape 2');
      shapeFour.classList.add(classes.appear);
    }, 100)
  }, []);

  return (
    <div id={'container'} className={classes.container}>
      <div id={'logo'} className={classes.text_container}>
        <svg viewBox="0 0 1080 986" className={classes.logo}>
          <path id="Shape 1" className={classes.fill} d="m403 72.9h274v841h-274z"/>
          <path id="Shape 3" className={classes.fill}
                d="m846.9 325c-69.7 0-126.1-56.3-126.1-126.1 0-69.7 56.4-126.1 126.1-126.1 69.7 0 126.1 56.4 126.1 126.1 0 69.8-56.4 126.1-126.1 126.1z"/>
          <path id="Shape 4" className={`${classes.stroke} ${classes.stroke1}`}
                d="m243.6 893.1c-64.2 0-116.1-51.9-116.1-116.1 0-64.2 51.9-116.1 116.1-116.1 64.2 0 116.1 51.9 116.1 116.1 0 64.2-51.9 116.1-116.1 116.1z"/>
          <path id="Shape 2" className={classes.stroke}
                d="m65 33h800c82.8 0 150 67.2 150 150v770h-800c-82.8 0-150-67.2-150-150z"/>
        </svg>

        <h2 className={`${classes.logo_animation} ${mobile ? classes.logo_animation_mobile : ''}`} data-text={"Računari"}>Računari</h2>
      </div>
    </div>
  );
};

export default Intro;