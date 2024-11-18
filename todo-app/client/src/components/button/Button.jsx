import React from "react";
import styles from "./Button.module.css";

export const Button = ({ label, onClick }) => {
  return <button className={styles.Button} onClick={onClick}>{label}</button>;
};
