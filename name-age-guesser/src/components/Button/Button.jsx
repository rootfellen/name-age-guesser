import React from "react";
import style from "./Button.module.scss";

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={style.button}>
      Submit
    </button>
  );
};

export default Button;
