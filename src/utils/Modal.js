import React, { useState } from "react";
import styles from "./Modal.module.css";
import Button from "../components/Common/Button";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active__modal");
  } else {
    document.body.classList.remove("active__modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn__modal">
        Open
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modal__content}>
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>

            <div className={styles.buttons__wrapper}>
              <Button
                title="CLOSE"
                buttonStyles={styles.close__modal}
                onClick={toggleModal}
              />
              <Button title="DELETE" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
