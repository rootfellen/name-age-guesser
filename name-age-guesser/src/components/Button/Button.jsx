import React from "react";
import style from "./Button.module.scss";

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className={style.button}>
      {text}
    </button>
  );
};

export default Button;
