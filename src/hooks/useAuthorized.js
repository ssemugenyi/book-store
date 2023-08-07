import { useEffect, useState } from "react";
import { BOOKSTORE_APIS } from "../adapters";

const useAuthorized = (data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setData] = useState("");

  const fetchAuthorized = async () => {
    setIsLoading(true);
    const response = await BOOKSTORE_APIS.authorized(data);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchAuthorized();
  }, []);
  return { status, isLoading };
};

export default useAuthorized;
