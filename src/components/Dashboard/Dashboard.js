import React, { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";
import Card from "../Card/Card";

import { useBooks } from "../../hooks";

const Dashboard = () => {
  const { books } = useBooks();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  useEffect(() => {
    setUser({
      userName: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
    });
  }, [user]);

  return (
    <div className={styles.dashboard__wrapper}>
      <div className={styles.menu_items}></div>
      <div className={styles.dashboard__content}>
        {books?.map((book, index) => (
          <Card
            key={index}
            title={book.title}
            description={book.description}
            isbn={book.isbn}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
