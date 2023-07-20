import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Card from "../Card/Card";
import Button from "../Common/Button";
import { NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";

const BookList = ({ response }) => {
  {
    response?.map((book, index) => (
      <Card key={index} title={book.title} description={book.description} />
    ));
  }
};

const Dashboard = () => {
  const [response, setResponse] = useState([]);
  console.log(response);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bookstore.toolsqa.com/BookStore/v1/Books",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic c3NlbXVnZW55aTppc2FhYw==",
          },
        }
      );
      setResponse(response?.data?.books);
    } catch (error) {}
  };
  return (
    <div className={styles.dashboard__wrapper}>
      <div className={styles.menu_items}>
        <div className={styles.menu__item}>
          <NavLink to="users">
            <Button title="Users" buttonStyles={styles.buttons} />
          </NavLink>
        </div>
        <div className={styles.menu__item}>
          <NavLink to="books">
            {" "}
            <Button title="Books" buttonStyles={styles.buttons} />
          </NavLink>
        </div>
      </div>
      <div className={styles.dashboard__content}>
        {response?.map((book, index) => (
          <Card key={index} title={book.title} description={book.description} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
