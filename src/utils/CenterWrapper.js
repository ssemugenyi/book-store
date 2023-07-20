import React from "react";
import styles from "./CenterWrapper.module.css";

const CenterWrapper = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default CenterWrapper;
