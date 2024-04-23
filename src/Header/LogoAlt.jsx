import classes from "./Logo.module.css";

const LogoAlt = () => {
  return (
    <div className={classes.logo_alt}>
      <svg viewBox="0 0 1000 1000">
        <path
          id="rect846"
          className={classes.logo_alt_c1}
          d="m 4.8194232,52.356732 v 55.833798 112.61535 c 0,17.47915 14.0713788,31.55105 31.5505288,31.55105 h 99.297298 37.60132 31.55053 V 220.80588 196.52312 83.907778 c 0,-17.47915 -14.07138,-31.551046 -31.55053,-31.551046 H 73.970757 Z"/>
        <rect
          className={classes.logo_alt_c2}          id="rect1591"
          width="42.18895"
          height="172.9962"
          x="83.724785"
          y="65.858719"/>
        <ellipse
          className={classes.logo_alt_c3}          id="path1717"
          cx="165.28107"
          cy="90.749016"
          rx="24.267555"
          ry="24.267544"/>
        <ellipse
          className={classes.logo_alt_c4}          id="path1717-6"
          cx="44.228466"
          cy="212.95914"
          rx="24.267515"
          ry="24.26754"/>
      </svg>
    </div>
  );
};

export default LogoAlt;