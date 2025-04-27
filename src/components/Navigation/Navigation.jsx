import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header>
      <nav className={s.nav}>
        <NavLink to="/" className={s.navLink} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.navLink} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;