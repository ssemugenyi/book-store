const requests = (requestor) => ({
  /**
   * registerUser - a function that logs in a user
   * @data forms details
   * @returns response
   */
  registerUser: async (data) => {
    const url = `/Account/v1/User`;
    const response = await requestor({ method: "POST", url, data });

    return response;
  },
  /**
   * loginUser - a function that logs in a user
   * @data forms details
   * @returns response
   */
  loginUser: async (data) => {
    const url = `/Account/v1/GenerateToken`;
    const response = await requestor({ method: "POST", url, data });

    return response;
  },
  /**
   * authorized function
   * @returns response
   */
  authorized: async (data) => {
    const url = `/Account/v1/Authorized`;
    const response = await requestor({
      method: "POST",
      url,
      data,
    });
    return response;
  },

  /**
   * createBooks- it creates a list of books
   * @data - list books
   * @returns response
   */
  createBooks: async (data) => {
    const url = `/BookStore/v1/Books`;
    const response = await requestor({
      method: "POST",
      url,
      data,
    });
    return response;
  },
  /**
   * getBooks - a function that returns all books
   * @returns response
   */
  getBooks: async () => {
    const url = `/BookStore/v1/Books`;
    const response = await requestor({ method: "GET", url });

    return response;
  },
  /**
   * getBook - a function that returns book
   * @returns response
   */
  getBook: async (isbn) => {
    const url = `/BookStore/v1/Book/?ISBN=${isbn}`;
    const response = await requestor({ method: "GET", url });

    return response;
  },
  /**
   * editBook- it creates a list of books
   * @data -  book details
   * @returns response
   */
  editBook: async (data, isbn) => {
    const url = `/BookStore/v1/Books/${isbn}`;
    const response = await requestor({
      method: "PUT",
      url,
      data,
    });
    return response;
  },
  /**
   * deleteBook- it creates a list of books
   * @isbn -  book isbn
   * @returns response
   */
  deleteBook: async (data) => {
    const url = `/BookStore/v1/Book`;
    const response = await requestor({
      method: "DELETE",
      url,
      data,
    });
    return response;
  },
});
export default requests;
