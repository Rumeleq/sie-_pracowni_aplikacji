import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <a href="#">Strona główna</a>
        </li>
        <li>
          <a href="#">Kategorie</a>
        </li>
        <li>
          <a href="#">Wpisy</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
