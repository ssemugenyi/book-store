import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../New/NewBook/NewBookLIst.module.css";
import Button from "../Common/Button";
import { useBook } from "../../hooks";
import { BOOKSTORE_APIS } from "../../adapters";

const EditBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    pages: "",
    publish_date: "",
    publisher: "",
    subTitle: "",
    website: "",
  });
  //====Getting selected book====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const bookIsbn = query.get("isbn");
  const { selectedBook } = useBook(bookIsbn);

  useEffect(() => {
    setBook({
      author: selectedBook.author,
      description: selectedBook.description,
      isbn: selectedBook.isbn,
      pages: selectedBook.pages,
      publish_date: selectedBook.publish_date,
      publisher: selectedBook.publisher,
      subTitle: selectedBook.subTitle,
      title: selectedBook.title,
      website: selectedBook.website,
    });
  }, [selectedBook]);

  const [itemInError, setItemInError] = useState("");
  const errorMessage = itemInError && `${itemInError} is required`;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const addBookHandler = (e) => {
    e.preventDefault();
    if (book.title.length < 1) {
      window.scrollTo(0, 0);
      setItemInError("Book Title");
    }
    if (book.author.length < 1) {
      setItemInError("Book Author");
    }
    if (book.isbn.length < 1) {
      setItemInError("ISBN");
    }

    const bookDetails = {
      userId: localStorage.getItem("userId"),
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      pages: +book.pages,
      publish_date: book.publish_date,
      publisher: book.publisher,
      subTitle: book.subTitle,
      website: book.website,
    };

    try {
      const response = BOOKSTORE_APIS.editBook(bookDetails, bookIsbn);

      if (response.status === 200) {
        navigate("/dashboard");
        setBook({
          title: "",
          author: "",
          description: "",
          isbn: "",
          pages: "",
          publish_date: "",
          publisher: "",
          subTitle: "",
          website: "",
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.book__form}>
        <form>
          <h3>Edit Book</h3>
          <span className="error">{errorMessage}</span>
          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="Book title"
              name="title"
              value={book.title}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="Sub Title"
              name="subTitle"
              value={book.subTitle}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <textarea
              placeholder="Description"
              name="description"
              value={book.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <input
              type="number"
              placeholder="Number of pages"
              name="pages"
              value={book.pages}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={book.author}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="Publisher"
              name="publisher"
              value={book.publisher}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="ISBN"
              name="publisher"
              value={book.isbn}
              onChange={onChangeHandler}
            />
          </div>

          <div className={styles.form__input}>
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={book.website}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.add__book}>
            {" "}
            <Button
              title="Edit Book"
              buttonStyles={styles.add__book__button}
              onClick={addBookHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
