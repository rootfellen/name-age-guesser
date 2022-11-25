import React from "react";
import style from "./Input.module.scss";

const Input = ({ value, onChange }) => {
  return (
    <>
      <label className={style.label} htmlFor="nameInput">
        <span>Please enter a name here:</span>
        <input
          className={style.input}
          id="nameInput"
          name="nameInput"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default Input;
