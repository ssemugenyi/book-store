import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";

import { BOOKSTORE_APIS } from "../../adapters";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    userID: "",
  });

  const [feedback, setFeedback] = useState({
    error: "",
    message: "",
  });

  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    setFeedback({ error: "", message: "" });
    setValues({ name: "", password: "" });
  }, [isLogin]);

  useEffect(() => {
    navigate("/dashboard");
  }, [authToken]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (values.name.length < 1 || values.password.length < 1) {
      setFeedback({ ...feedback, error: "Username or password is required" });
    }
    if (!isLogin) {
      const data = {
        userName: values.name,
        password: values.password,
      };

      try {
        const response = await BOOKSTORE_APIS.registerUser(data);

        if (response.status === 201) {
          setUser({
            userID: response.data?.userID,
            userName: response.data?.username,
          });
          setFeedback({
            ...feedback,
            message: `${data.userName} is created successfully`,
          });
          setIsLogin(true);
        }
        localStorage.setItem("userId", response.data?.userID);

        setValues({ name: "", password: "" });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      const data = {
        userName: values.name,
        password: values.password,
      };
      try {
        const response = await BOOKSTORE_APIS.loginUser(data);

        if (response?.data.status === "Failed") {
          setFeedback({
            ...feedback,
            error: `${data.userName} is not authorized`,
          });
        } else {
          setFeedback({
            ...feedback,
            message: `${data.userName} is authorized`,
          });

          setAuthToken(response?.data?.token);

          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("date", response?.data?.expires);
          localStorage.setItem("userName", data.userName);
        }
        setValues({ name: "", password: "" });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <section>
      <div>
        <form className={styles.form}>
          <h2>{isLogin ? "Welcome Back" : "Sign Up"}</h2>
          <p
            className={
              feedback.error.length > 0 ? styles.error : styles.success
            }
          >
            {feedback.error.length > 0 ? feedback.error : feedback.message}
          </p>
          <div className={styles.form__content}>
            <div className={styles.form__control}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Username"
                value={values.name}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles.form__control}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <Button
            title={isLogin ? "LOGIN" : "REGISTER"}
            buttonStyles={styles.button}
            onClick={submitHandler}
            disable={isLoading}
          />
          <Button
            title={
              isLogin ? "Not yet a member? Register" : "Already a member? Login"
            }
            buttonStyles={styles.register__link}
            onClick={toggleForm}
          />
        </form>
        {/* <h4>{response}</h4> */}
      </div>
    </section>
  );
};

export default Form;
