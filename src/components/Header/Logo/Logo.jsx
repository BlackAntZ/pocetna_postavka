import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <svg viewBox="0 0 1080 986">
        <path id="Shape 1" className={classes.fill} d="m403 72.9h274v841h-274z"/>
        <path id="Shape 3" className={classes.fill}
              d="m846.9 325c-69.7 0-126.1-56.3-126.1-126.1 0-69.7 56.4-126.1 126.1-126.1 69.7 0 126.1 56.4 126.1 126.1 0 69.8-56.4 126.1-126.1 126.1z"/>
        <path id="Shape 4" className={classes.stroke}
              d="m243.6 893.1c-64.2 0-116.1-51.9-116.1-116.1 0-64.2 51.9-116.1 116.1-116.1 64.2 0 116.1 51.9 116.1 116.1 0 64.2-51.9 116.1-116.1 116.1z"/>
        <path id="Shape 2" className={classes.stroke}
              d="m65 33h800c82.8 0 150 67.2 150 150v770h-800c-82.8 0-150-67.2-150-150z"/>
      </svg>
    </div>
  );
};

export default Logo;