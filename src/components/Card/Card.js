import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import image from "../../assets/bookstore.jpg";
import styles from "./Card.module.css";
import { BOOKSTORE_APIS } from "../../adapters";

const Card = (props) => {
  const navigate = useNavigate();
  const { title, description, isbn } = props;
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__details}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.card__buttons}>
          <Button
            title="EDIT"
            onClick={() => {
              navigate(`/dashboard/edit/?isbn=${isbn}`);
            }}
          />
          <Button
            title="DELETE"
            buttonStyles={styles.delete}
            onClick={() => {
              const data = {
                isbn: isbn,
                userId: localStorage.getItem("userId"),
              };
              try {
                const response = BOOKSTORE_APIS.deleteBook(data);
                return response;
              } catch (error) {
                return error;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
