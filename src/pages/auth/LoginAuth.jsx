import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../redux/authSlice";

const LoginAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const json = {
        email: form.email,
        password: form.password,
      };
      const response = await axios.post(
        "https://food-truck-api.onrender.com/api/v1/user/login",
        json,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(login());
        toast(response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (!error.response.data.success) {
        toast(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={changeHandler}
          value={form.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={changeHandler}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginAuth;
