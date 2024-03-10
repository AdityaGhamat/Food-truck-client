import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import AppContext from "../context/AppContext";
import { getCart } from "../utils/helper";
import { setCart } from "../redux/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setOrderClick } = useContext(AppContext);
  const cartItems = useSelector((store) => store.cart.value);
  const user = useSelector((store) => store.auth.user);
  if (user) {
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  }
  const logoutHandler = async () => {
    try {
      const token = Cookies.get("token");
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <div className="flex justify-around items-center p-10 ">
        <div>
          <h1 className="text-3xl hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer">
            <Link to="/">HopIn</Link>
          </h1>
        </div>
        <ul className="flex gap-5">
          <Link to="/">
            <li className="hover:scale-110 transition-all ease-in-out">Home</li>
          </Link>
          {user && user.role == "admin" ? (
            <Link to="/users">
              <li className="hover:scale-110 transition-all ease-in-out">
                Users
              </li>
            </Link>
          ) : (
            ""
          )}
          <Link to="/inventory">Inventory</Link>
        </ul>
        <SearchBar />
        <div className="flex gap-4 pr-3 items-center">
          {user ? (
            <Link onClick={logoutHandler}>
              <h3>Log Out</h3>
            </Link>
          ) : (
            <Link to={"/register"}>
              <h3>Sign Up</h3>
            </Link>
          )}
          <span className="flex" onClick={() => setOrderClick(true)}>
            <FaShoppingCart className="hover:scale-110 transition-all ease-in-out cursor-pointer" />
            <p className="text-sm cursor-pointer">{cartItems.length}</p>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
