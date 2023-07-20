import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [response, setResponse] = useState({});

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
  }, [values]);

  useEffect(() => {
    setValues({ name: "", password: "" });
  }, [isLogin]);

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
        const response = await axios.post(
          "https://bookstore.toolsqa.com/Account/v1/User",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic c3NlbXVnZW55aTppc2FhYw==",
            },
          }
        );
        console.log(response.data);

        setFeedback({
          ...feedback,
          message: `${data.userName} is created successfully`,
        });

        setIsLoading(false);
        setIsLogin(true);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      const data = {
        userName: values.name,
        password: values.password,
      };
      try {
        const response = await axios.post(
          "https://bookstore.toolsqa.com/Account/v1/GenerateToken",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic c3NlbXVnZW55aTppc2FhYw==",
            },
          }
        );
        console.log(response.data);
        setAuthToken(response?.data?.token);
        if (response?.data.status === "Failed") {
          setFeedback({
            ...feedback,
            error: `${data.userName} is not authorised`,
          });
        } else {
          setFeedback({
            ...feedback,
            message: `${data.userName} is authorised`,
          });
        }

        setIsLoading(false);
        navigate("/dashboard");
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
