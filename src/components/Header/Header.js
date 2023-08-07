import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuthorized } from "../../hooks";

const Header = (props) => {
  const { isAuthenticated } = props;
  const { status } = useAuthorized({
    userName: localStorage.getItem("userName"),
    password: localStorage.getItem("password"),
  });
  return (
    <div className={styles.header__wrapper}>
      <div className={styles.header__content}>
        <div className={styles.logo}>
          <NavLink to="/">
            <h2>Book store</h2>
          </NavLink>
        </div>
        {isAuthenticated && (
          <div className={styles.menu}>
            <ul>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? `${styles.active}` : ""
                  }
                >
                  Books
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/new"
                  className={({ isActive }) =>
                    isActive ? `${styles.active}` : ""
                  }
                >
                  Create
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${styles.active}` : ""
                  }
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </NavLink>
              </li>

              <div className={styles.user}>
                <span>Hello, </span>
                <span>{localStorage.getItem("userName")}</span>
                <span>{status}</span>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
