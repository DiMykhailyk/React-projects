import React from "react";
import styles from "../Li/Li.module.css";

export const Li = ({ value }) => {
  return (
  <li className={styles.Li}>{value}</li>
  );
};
