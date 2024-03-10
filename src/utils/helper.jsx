import axios from "axios";

export const getCart = async (user) => {
  try {
    const res = await axios.get(
      `https://food-truck-api.onrender.com/api/v1/cart/cartItems/${user?._id}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
