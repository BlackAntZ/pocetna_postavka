import {useEffect} from 'react';
import classes from "./Intro.module.css";

const Intro = () => {
  useEffect(() => {
    setTimeout(() => {
      const logo = document.getElementById('logo');
      logo.classList.add(classes.fade);

      const container = document.getElementById('container');
      container.classList.add(classes.fade);
    }, 1000)
  }, []);

  return (
    <div id={'container'} className={classes.container}>
      <div id={'logo'} className={classes.text_container}>
        <h2 className={classes.logo_animation} data-text={"LOGO"}>LOGO</h2>
      </div>
    </div>
  );
};

export default Intro;