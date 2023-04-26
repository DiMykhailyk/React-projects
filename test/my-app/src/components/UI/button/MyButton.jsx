import React from "react";
import "./MyButton.css";

const MyButton = (props) => {
  return (
    <button className="btn">{props.value}</button>
  )
}

export default MyButton;