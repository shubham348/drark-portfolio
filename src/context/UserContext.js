import React, { useEffect, createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext([]);
const UserContextProvider = UserContext.Provider;

const userData = {
  mediumLink: "https://medium.com/@shubham3480",
};
export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = () => {
    setIsLoading(true);
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shubham3480"
      )
      .then((data) => {
        const items = data?.data?.items || [];
        setData(items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <UserContextProvider
      value={{ articles: data, isLoading, userData }}
    >
      {children}
    </UserContextProvider>
  );
};

// will be needed to access the context via useContext hook
export default UserContext;
