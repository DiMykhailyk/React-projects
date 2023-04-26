import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import './modules.css'

const SignUp = () => {

  const initialSignUp = {
    login: '',
    password: '',
    repeatPassword: '',
  }

  const [state, setState] = useState(initialSignUp)

  const error = 'You have diferend password';

  const onChangeHandler = ({ target }) => {
    setState({
      ...state,
    [target.name]: target.value
    }) 
  }

const setStorage = (e) => {

  if (state.value !== ''){
    localStorage.setItem(state.login, state.password)
  } else {
    console.log('=(')
  }
}

  return (
    <div className="SignUp">
    <MyInput
    value={state.login}
    type="text"
    placeholder='login'
    >
    </MyInput>
    <MyInput
    type="password"
    value={state.password}
    placeholder='password'
    >  
    </MyInput>
    <MyInput
    type="password"
    value={state.repeatPassword}
    placeholder='repeat password'
    >
    </MyInput>
  
   <Link to = 'SignIn'> <MyButton value="Submit" onClick={ setStorage }></MyButton> </Link>
   
    </div>
    
  )
}

export default SignUp;