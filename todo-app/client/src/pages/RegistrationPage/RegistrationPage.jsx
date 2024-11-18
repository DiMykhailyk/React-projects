import React, { useState } from "react";
import styles from "./RegistrationPage.module.css";
import { Text } from "..//..//components/Text/Text.jsx";
import { MyInput } from "..//..//components/input/MyInput.jsx";
import { Button } from "..//..//components/button/Button.jsx";
import { NavLink } from "react-router-dom";
import { useCallApi } from "..//..//hooks/useCallApi.js";

export const RegistrationPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const loginHandleChange = (e) => {
    setLogin(e.target.value)
  }
  const passwordHandleChange = (e) => {
    setPassword(e.target.value)
  }
  const repeatPasswordHandleChange = (e) => {
    setRepeatPassword(e.target.value)
  }

  const addUser = () => {
    if(login === '' || password === '' || repeatPassword === '') {
      return 
    } 
    if (password === repeatPassword) {
     useCallApi('http://localhost:3001/reg',{
      method: 'POST',   
      name: login,
      password,
      }).then((data) => console.log(data))
    } else {
      return <h1 className={styles.hideErrorPass}>password and repeat password doesnt same!</h1>
    }
  }

  return (
    <>
      <Text text="Registration" />
      <div className={styles.Registration}>
        <div className={styles.Wrapper}>
          <MyInput 
          onChange={loginHandleChange}
          value={login} 
          placeholder="login" 
          type="text" />
          <MyInput 
          onChange={passwordHandleChange}
          value={password} 
          placeholder="password" 
          type="password" />
          <MyInput
            onChange={repeatPasswordHandleChange}
            value={repeatPassword}
            placeholder="repeat password"
            type="password"
          />
          <NavLink to="/login">
            <Button onClick={addUser} label="Create" />
          </NavLink>
        </div>
      </div>
    </>
  );
};
