import React from "react";
import Button from "../Common/Button";
import image from "../../assets/bookstore.jpg";
import styles from "./Card.module.css";

const Card = (props) => {
  const { title, description } = props;
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__image}>
        <img src={image} />
      </div>
      <div className={styles.card__details}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.card__buttons}>
        <Button title="EDIT" />
        <Button title="DELETE" buttonStyles={styles.delete} />
      </div>
    </div>
  );
};

export default Card;
