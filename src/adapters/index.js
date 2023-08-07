import axios from "axios";
import requests from "./requests";

const BASE_URL = "https://bookstore.toolsqa.com";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Basic c2hhbml0YTpTaGFuaXRhQDIwMjMh",
};

const requestor = async (config) => {
  try {
    const { url, data } = config;

    const response = await axios(`${BASE_URL}${url}`, {
      method: "GET",
      headers: headers,
      body: data ? JSON.stringify(data) : null,
      ...config,
    });

    return response;
  } catch (error) {
    return error;
  }
};

const BOOKSTORE_APIS = requests(requestor);

export { BOOKSTORE_APIS };
