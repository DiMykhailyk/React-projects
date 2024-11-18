import React from "react";
import styles from "../Footer/Footer.module.css";
import { Li } from "../Li/Li.jsx";
import { Button } from "../button/Button.jsx";

export const Footer = ({ isVisible }) => {
  return (
    <footer style={isVisible} className={styles.Footer}>
      <span className={styles.Counter}>
        <strong className={styles.Count}>
          <span>1 </span>
        </strong>
        item left
      </span>
      <ul className={styles.UlWrapper}>
        <Li value="All" />
        <Li value="Active" />
        <Li value="Completed" />
      </ul>
      <Li value="Clear Completed" />
    </footer>
  );
};
