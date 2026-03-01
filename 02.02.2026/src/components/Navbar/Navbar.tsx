import styles from "./Navbar.module.scss";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <Link to="/">Strona główna</Link>
        </li>
        <li>
          <Link to="/wpises">Wpisy</Link>
        </li>
        <li>
          <Link to="/contact">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
