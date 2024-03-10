import AppContext from "./AppContext";
import React, { useEffect, useState } from "react";

const AppContextProvider = ({ children }) => {
  const [authResponse, setAuthResponse] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [orderClick, setOrderClick] = useState(false);
  const [addcart, setAddCart] = useState(false);
  const [removecart, setRemoveCart] = useState(false);
  const [query, setQuery] = useState("");
  //final values for export
  const value = {
    searchText,
    setSearchText,
    orderClick,
    setOrderClick,
    removecart,
    setRemoveCart,
    authResponse,
    setAuthResponse,
    addcart,
    setAddCart,
    query,
    setQuery,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
