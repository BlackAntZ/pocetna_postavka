import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./UnauthorizedPage.module.scss";

const UnauthorizedPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.icon}>
          <FaLock />
        </div>
        <h1 className={classes.title}>403 – Pristup odbijen</h1>
        <p className={classes.message}>
          Nemate potrebne privilegije da biste pristupili ovoj stranici.
        </p>
        <Link to="/" className={classes.button}>
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
