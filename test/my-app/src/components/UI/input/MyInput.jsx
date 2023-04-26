import React from "react";
import "./MyInput.css";

const MyInput = ({type, placeholder}) => {
  return (
    <input 
    type={type}
    className="inpt" 
    placeholder={placeholder}>
    </input>
  )
}

export default MyInput;