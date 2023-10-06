import React from "react";
import "./input.scss";

const Input = ({ forAttr, name, ...rest }) => {
  return (
    <div className="inputCont">
      <label htmlFor={forAttr}>{name}</label>
      <input type="text" id={forAttr} {...rest} />
    </div>
  );
};

export default Input;
