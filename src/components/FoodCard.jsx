import React, { useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import AppContext from "../context/AppContext";

const FoodCard = ({ id, name, desc, price, rating, img, qty }) => {
  const { addcart, setAddCart } = useContext(AppContext);
  const dispatch = useDispatch();
  const shortDesc = desc.split(" ").slice(0, 10).join(" ");
  const user = useSelector((store) => store.auth.user);
  const cart = useSelector((store) => store.cart.value);
  const addToCartApi = async ({ id, name, price, quantity, rating, image }) => {
    try {
      const res = await axios.post(
        `https://food-truck-api.onrender.com/api/v1/cart/add-to-cart/${user._id}`,
        { id, image, name, price, rating, quantity }
      );
      const data = await res.data;
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="text-bold w-[250px] p-5 flex flex-col gap-2 bg-white ">
      <img
        src={img}
        alt="food-item"
        className="w-auto h-[130px] hover:scale-110 transition-all ease-in-out duration-500 cursor-grab "
      />
      <div className="flex justify-between">
        <h2>{name}</h2>
        <span>₹{price}</span>
      </div>
      <p className="text-sm">{shortDesc}...</p>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <FaStar /> {rating}
        </span>
        <button
          onClick={() => {
            !user
              ? toast.error("Sign in your account")
              : addToCartApi({
                  id,
                  name,
                  image: img,
                  rating,
                  quantity: qty,
                  price,
                });
            addcart ? setAddCart(false) : setAddCart(true);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
