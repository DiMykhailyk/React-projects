import React, { useState } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import { Text } from "..//..//components/Text/Text.jsx";
import { MyInput } from "..//..//components/input/MyInput.jsx";
import { Button } from "..//..//components/button/Button.jsx";
import { NavLink } from "react-router-dom";
import { useCallApi } from "..//..//hooks/useCallApi.js";

export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandleChange = (e) => {
    setLogin(e.target.value);
  };
  const passwordHandleChange = (e) => {
    setPassword(e.target.value);
  };

  const authUser = () => {
    useCallApi("http://localhost:3001/login", {
      method: "POST",
      login,
      password,
    }).then((data) => {
      try {
        const refreshTokenData = data.refreshToken.token;
        const tokenData = data.token;

        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        localStorage.setItem(
          "refreshTokenData",
          JSON.stringify(refreshTokenData)
        );
        return res;
      } catch (err) {
        useCallApi("http://localhost:3001/refresh", {
          method: "POST",
          login,
          password,
        });
      }
    });
  };

  return (
    <>
      <Text text="Login" />
      <div className={styles.Login}>
        <div className={styles.Wrapper}>
          <MyInput
            value={login}
            placeholder="Login"
            type="text"
            onChange={loginHandleChange}
          />
          <MyInput
            value={password}
            placeholder="Password"
            type="password"
            onChange={passwordHandleChange}
          />
          <NavLink to="/todos">
            <Button onClick={authUser} label="Sign in" />
          </NavLink>
        </div>
      </div>
    </>
  );
};
