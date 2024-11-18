import React from "react";
import styles from '..//Text/Text.module.css';

export const Text = ({text}) => {
  return (
    <div className={styles.Text}>{text}</div>
  )
}