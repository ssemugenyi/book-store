import { useState, useEffect } from "react";
import { BOOKSTORE_APIS } from "../adapters";

const useBook = (isbn) => {
  const [selectedBook, setSelectedBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchBook = async () => {
    setIsLoading(true);
    const response = await BOOKSTORE_APIS.getBook(isbn);
    if (response.status === 200) {
      setSelectedBook(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, []);
  return { selectedBook, isLoading };
};

export default useBook;
