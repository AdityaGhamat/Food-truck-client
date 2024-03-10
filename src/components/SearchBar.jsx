import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const SearchBar = () => {
  const { searchText, query, setQuery } = useContext(AppContext);
  const searchHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="flex gap-2 items-center border border-solid border-gray-300 rounded-md p-1 w-[15vw]">
      <input
        value={query}
        onChange={searchHandler}
        className="outline-none border-none flex-1 w-full "
        placeholder="Search..."
      />
      {searchText ? <IoIosClose className="cursor-pointer text-xl" /> : ""}
    </div>
  );
};

export default SearchBar;
