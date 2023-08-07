import React from "react";
import Button from "../../Common/Button";
import styles from "./NewBookLIst.module.css";
import { useState } from "react";
import { BOOKSTORE_APIS } from "../../../adapters";

const BookCard = (props) => {
  const { title, author, key } = props;
  const bookAuthor =
    author.split(" ")[0].charAt(0).toUpperCase() +
    author.split(" ")[1]?.charAt(0).toUpperCase();

  return (
    <div key={key} className={styles.bookList__card}>
      <span className={styles.book__author}>{bookAuthor}</span>
      <span className={styles.book__title}>{`${title.substring(
        0,
        20
      )}...`}</span>
    </div>
  );
};

const NewBookList = () => {
  const [bookList, setBookList] = useState([]);
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
    const bookDate = new Date().toISOString();

    const bookDetails = {
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      pages: +book.pages,
      publish_date: bookDate,
      publisher: book.publisher,
      subTitle: book.subTitle,
      website: book.website,
    };

    setBookList([...bookList, bookDetails]);
    console.log(bookList);

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
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem("userId"),
      collectionOfIsbns: bookList,
    };
    try {
      const response = BOOKSTORE_APIS.createBooks(data);
      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.book__list}>
        {bookList.map((book) => (
          <BookCard title={book.title} author={book.author} key={book.isbn} />
        ))}
      </div>
      <div className={styles.book__form}>
        <form>
          <h3>New Book</h3>
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
              title="Add Book"
              buttonStyles={styles.add__book__button}
              onClick={addBookHandler}
            />
          </div>
          <div className={styles.add__list}>
            {" "}
            <Button
              title="Submit List"
              buttonStyles={styles.add__list__button}
              onClick={onSubmitHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookList;
