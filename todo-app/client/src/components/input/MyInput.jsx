import React, { useEffect, useState } from "react";
import styles from "./MyInput.module.css";

export const MyInput = ({addTodoEnter, placeholder, type, inputValue, onChange }) => {
  return (
    <input
      value={inputValue}
      onChange={onChange}
      className={styles.MyInput}
      placeholder={placeholder}
      onKeyPress={addTodoEnter}
      type={type}
    />
  );
};
