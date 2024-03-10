import React, { useContext, useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import AppContext from "../context/AppContext";
import axios from "axios";
import { login, setUser } from "../redux/authSlice";
import { setCart } from "../redux/cartSlice";

const Body = () => {
  const { orderClick, query } = useContext(AppContext);
  const [filterSearch, setFilterSearch] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    const res = await axios.get(
      "https://food-truck-api.onrender.com/api/v1/user/get-user",
      {
        withCredentials: true,
      }
    );
    const data = await res.data;
    dispatch(setUser(data.user));
    dispatch(login());
  };
  useEffect(() => {
    getUser();
  }, []);
  const getMenuItem = async () => {
    const res = await axios.get(
      `https://food-truck-api.onrender.com/api/v1/product/search?q=${query}`
    );
    console.log(res);
    const json = await res.data;
    setFilterSearch(json);
  };

  useEffect(() => {
    getMenuItem();
  }, [query]);
  return (
    <div className="bg-grey-300  grid grid-cols-5 gap-2">
      {filterSearch.menuItems && filterSearch.menuItems.length > 0 ? (
        filterSearch.menuItems.map((item) => (
          <FoodCard
            key={item._id}
            id={item._id}
            name={item.itemName}
            desc={item.description}
            price={item.price}
            rating={item.ratings}
            img={item.imageUrl}
            qty={item.quantity}
          />
        ))
      ) : (
        <p>No items found</p>
      )}

      {orderClick ? <Cart /> : ""}
    </div>
  );
};

export default Body;
