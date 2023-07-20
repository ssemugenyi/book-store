import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const { title, buttonStyles, onClick, disable } = props;
  return (
    <button
      className={`${buttonStyles} ${styles.button}  `}
      onClick={onClick}
      disabled={disable}
    >
      {title}
    </button>
  );
};

export default Button;
