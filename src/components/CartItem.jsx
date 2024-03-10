import React from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getCart } from "../utils/helper";
import axios from "axios";
import { setCart } from "../redux/cartSlice";
const CartItem = ({ img, name, price, id, qty, cartId }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const removeItem = async (id) => {
    const response = await axios.delete(
      `https://food-truck-api.onrender.com/api/v1/cart/remove-from-cart/${id}`
    );
    const res = response.data;
    toast.success(res.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };
  const increaseQty = async (id) => {
    const response = await axios.put(
      `https://food-truck-api.onrender.com/api/v1/cart/increment-quantity/${id}`
    );
    const res = response.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };
  const decreaseQty = async (id) => {
    const response = await axios.put(
      `https://food-truck-api.onrender.com/api/v1/cart/decrement-quantity/${id}`
    );
    const res = response.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };
  return (
    <div className="flex gap-2 shadow-md rounded-lg p-3 mb-2">
      <div className="">
        <AiOutlineDelete
          className="absolute right-7 cursor-pointer "
          onClick={() => removeItem(cartId)}
        />
        <img src={img} alt="" className="w-[50px] h-[50]" />
      </div>
      <div className="">
        <h2 className="font-bold text-grey-800 w-full">{name}</h2>
        <div className="flex justify-between">
          <span>₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              className="border-2 border-gray-500 text-grey-600 p-1 text-xl cursor-pointer"
              onClick={() => (qty > 1 ? decreaseQty(cartId) : (qty = 0))}
            />
            <span>{qty}</span>
            <AiOutlinePlus
              className="border-2 border-gray-600 text-grey-600 p-1 text-xl cursor-pointer"
              onClick={() => (qty >= 1 ? increaseQty(cartId) : (qty = 0))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
