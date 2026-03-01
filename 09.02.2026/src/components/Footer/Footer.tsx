import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.Footer}>
      Copyright &copy; {new Date().getFullYear()} | ZSK
    </footer>
  );
}

export default Footer;
