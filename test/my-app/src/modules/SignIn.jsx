import React from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import "./modules.css";
import { Link } from "react-router-dom";

const SignIn = ()  => {
  return (
    <div className="SignIn">
      <MyInput
      type="text"
      placeholder='login'
      >  
      </MyInput>
      <MyInput
      type="password"
      placeholder='password'
      >  
      </MyInput>
     <Link to='/'> <MyButton value="Sign In"></MyButton> </Link>
    </div>
  )
}

export default SignIn;