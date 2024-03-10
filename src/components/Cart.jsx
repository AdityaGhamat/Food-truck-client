import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AppContext from "../context/AppContext";
import CartItem from "./CartItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
const Cart = () => {
  const { orderClick, setOrderClick, isLoggedIn } = useContext(AppContext);
  const user = useSelector((store) => store.auth.user);
  const CartItems = useSelector((store) => store.cart.value);
  const totalQty = CartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );
  const totalPrice = CartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <div
      className={`fixed top-0 right-0 w-[25vw] h-full bg-white border border-solid ${
        orderClick ? "translate-x-0" : "translate-x-full"
      } transition-all duration-500 z-50`}
    >
      <div className="flex justify-between items-center m-5 ">
        <span className="text-xl font-bold">Cart</span>
        <IoMdClose
          className="border border-solid border-black cursor-pointer hover:scale-110 transition-all ease-in-out duration-100"
          onClick={() => setOrderClick(false)}
        />
      </div>
      {CartItems.length === 0 && (
        <div className=" flex flex-col justify-center gap-3">
          <h2 className="text-2xl text-center">Your Cart Is Empty</h2>
        </div>
      )}
      <div className="">
        {CartItems.map((item) => (
          <CartItem
            key={item.id}
            cartId={item._id}
            id={item.id}
            img={item.image}
            name={item.name}
            price={item.price}
            qty={item.quantity}
          />
        ))}
      </div>

      <div className="flex flex-col p-3  fixed bottom-0 m-auto">
        <h2>Items :{totalQty}</h2>
        <h2>Total Amount :₹{totalPrice}</h2>
        <button className="text-white border border-solid bg-slate-400 w-[23vw] p-2 mb-2">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
