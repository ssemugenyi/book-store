import { useEffect, useState } from "react";
import { BOOKSTORE_APIS } from "../adapters";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    const response = await BOOKSTORE_APIS.getBooks();
    if (response.status === 200) {
      setBooks(response.data.books);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, isLoading };
};

export default useBooks;
